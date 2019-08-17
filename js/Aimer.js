const DISTANCE_PER_ACTION = 200;

var aimerX = 0,
    aimerY = 0;

function moveAimer() {
    aimerX = mousePos.x;
    aimerY = mousePos.y;
    if (isAiming) {
        return;
    }
    
    checkCol = colAtXCoord(aimerX),
    startRow = rowAtYCoord(aimerY),
    checkIndex = brickTileToIndex(checkCol, startRow);
    //If the cursor is already inside of a wall
    if (brickGrid[checkIndex] > 0) {
        //Find nearest empty tile above the cursor
        for (let i = startRow; i >= 0; i--) {
            checkIndex = brickTileToIndex(checkCol, i);
            if (brickGrid[checkIndex] < 1) {
                aimerY = (i + 1) * BRICK_H;
                break;
            }
        }
            //Otherwise mouse is already in an empty tile
    } else {
        //Find nearest solid tile beneath the cursor.
        for (let i = startRow; i < BRICK_ROWS; i++) {
            checkIndex = brickTileToIndex(checkCol, i);
            if (brickGrid[checkIndex] > 0) {
                aimerY = i * BRICK_H;
                break;
            }
        }
    }
}

function drawAimer() {
    if (isAiming) {
        canvasContext.drawImage(targetAimerPic, aimerX - targetAimerPic.width / 2, aimerY - targetAimerPic.height / 2);
    } else {
        canvasContext.drawImage(moveAimerPic, aimerX - moveAimerPic.width / 2, aimerY - targetAimerPic.height);
    }  
}