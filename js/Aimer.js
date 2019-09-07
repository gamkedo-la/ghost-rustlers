const DISTANCE_PER_ACTION = 200;

var aimerX = 0,
    aimerY = 0,
    outOfRangeY = 0,
    outOfRangeX = 0;

function moveAimer() {
    aimerX = mousePos.x + camPanX;
    aimerY = mousePos.y + camPanY;

    if (isInAimMode) {
        return;
    }

    outOfRangeX = aimerX;
    outOfRangeY = aimerY;

    //If character1 is active set to character 1, else set to character 2
    let activeChar = character1.isActive ? character1 : character2,
        xDelta = activeChar.x - aimerX;

    if (Math.abs(xDelta) > DISTANCE_PER_ACTION) {
        outOfRangeX = mousePos.x + camPanX;
        outOfRangeY = findGround(outOfRangeX, mousePos.y + camPanY);

        let index = getNearestNode(outOfRangeX, outOfRangeY, playerNavGraph),
            coords = playerNavGraph[index];

        outOfRangeX = BRICK_W/2 + coords.x * BRICK_W; 
        outOfRangeY = BRICK_H/2 + coords.y * BRICK_H;

         //Set aimerX to max distance in the correct direction
        aimerX = xDelta > 0 ? activeChar.x - DISTANCE_PER_ACTION : activeChar.x + DISTANCE_PER_ACTION;
    }

    aimerY = findGround(aimerX, aimerY);
    
    let index = getNearestNode(aimerX, aimerY, playerNavGraph),
        coords = playerNavGraph[index];

    aimerX = BRICK_W/2 + coords.x * BRICK_W, 
    aimerY = BRICK_H/2 + coords.y * BRICK_H;


    if (activeChar.path.length === 0) {
        currentPath = getPathfor(activeChar, aimerX, aimerY, playerNavGraph);
    }
}

function drawAimer() {
    if (isInAimMode) {
        canvasContext.drawImage(targetAimerPic, aimerX - targetAimerPic.width / 2, aimerY - targetAimerPic.height / 2);
    } else {
        drawNavGraph(playerNavGraph, 'white');
        drawNavGraph(currentPath, 'green');

        if (outOfRangeX != mousePos.x + camPanX) {
            colorRect(outOfRangeX - moveAimerPic.width / 4, outOfRangeY - targetAimerPic.height, moveAimerPic.width/2, moveAimerPic.height, 'red')
            canvasContext.drawImage(moveAimerPic, outOfRangeX - moveAimerPic.width / 2, outOfRangeY - targetAimerPic.height);
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