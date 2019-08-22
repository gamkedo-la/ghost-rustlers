const DISTANCE_PER_ACTION = 200;

var aimerX = 0,
    aimerY = 0,
    outOfRangeY = 0;

function moveAimer() {
    aimerX = mousePos.x;
    aimerY = mousePos.y;
    if (isAiming) {
        return;
    }

    //If character1 is active set to character 1, else set to character 2
    let activeChar = character1.isActive ? character1 : character2,
    xDelta = activeChar.characterX - aimerX;
    if (Math.abs(xDelta) > DISTANCE_PER_ACTION) {
        outOfRangeY = findGround(mousePos.x, mousePos.y);
         //Set aimerX to max distance in the correct direction
        aimerX = xDelta > 0 ? activeChar.characterX - DISTANCE_PER_ACTION : activeChar.characterX + DISTANCE_PER_ACTION;
    }

    aimerY = findGround(aimerX, aimerY);
}

function drawAimer() {
    if (isAiming) {
        canvasContext.drawImage(targetAimerPic, aimerX - targetAimerPic.width / 2, aimerY - targetAimerPic.height / 2);
    } else {
        if (aimerX != mousePos.x) {
            colorRect(mousePos.x - moveAimerPic.width / 4, outOfRangeY - targetAimerPic.height, moveAimerPic.width/2, moveAimerPic.height, 'red')
            canvasContext.drawImage(moveAimerPic, mousePos.x - moveAimerPic.width / 2, outOfRangeY - targetAimerPic.height);
        }

        canvasContext.drawImage(moveAimerPic, aimerX - moveAimerPic.width / 2, aimerY - targetAimerPic.height);
    }  
}

function findGround(x, y) {
    let groundY = y;
        checkCol = colAtXCoord(x),
        startRow = rowAtYCoord(y),
        checkIndex = levelTileIndexAtColRowCoord(checkCol, startRow);

    //If the cursor is already inside of a wall
    if (levelTileGrid[checkIndex] > 0) {
        //Find nearest empty tile above the cursor
        for (let i = startRow; i >= 0; i--) {
            checkIndex = levelTileIndexAtColRowCoord(checkCol, i);
            if (levelTileGrid[checkIndex] < 1) {
                groundY = (i + 1) * BRICK_H;
                break;
            }
        }
            //Otherwise mouse is already in an empty tile
    } else {
        //Find nearest solid tile beneath the cursor.
        for (let i = startRow; i < BRICK_ROWS; i++) {
            checkIndex = levelTileIndexAtColRowCoord(checkCol, i);
            if (levelTileGrid[checkIndex] > 0) {
                groundY = i * BRICK_H;
                break;
            }
        }
    }

    return groundY;
}