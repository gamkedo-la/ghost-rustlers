const WOBBLE_AIMER = true;
const DISTANCE_PER_ACTION = 5;

var aimerX = 0,
    aimerY = 0,
    outOfRangeY = 0,
    outOfRangeX = 0;

function moveAimer() {
    aimerX = mousePos.x + camPanX;
    aimerY = mousePos.y + camPanY;

    // wobbly aimer is actually a trick
    if (WOBBLE_AIMER && isInAimMode) {
        const WOBBLE_SPEEDX = 0.0033333;
        const WOBBLE_SPEEDY = 0.0021331;
        const WOBBLE_SIZEX = 8;
        const WOBBLE_SIZEY = 8;
        aimerX += Math.sin(performance.now()*WOBBLE_SPEEDX)*WOBBLE_SIZEX;
        aimerY += Math.sin(performance.now()*WOBBLE_SPEEDY)*WOBBLE_SIZEY;
    }

    if (isInAimMode) {
        return;
    }

    //If character1 is active set to character 1, else set to character 2
    let activeChar = character1.isActive ? character1 : character2;

    outOfRangeX = mousePos.x + camPanX;
    outOfRangeY = findGround(outOfRangeX, mousePos.y + camPanY);

    let index = getNearestNode(outOfRangeX, outOfRangeY, playerNavGraph),
        coords = playerNavGraph[index];

    outOfRangeX = BRICK_W/2 + coords.x * BRICK_W; 
    outOfRangeY = BRICK_H/2 + coords.y * BRICK_H;

    let newPath = [];
    if (activeChar.path.length === 0) {
        newPath = getPathfor(activeChar, outOfRangeX, outOfRangeY, playerNavGraph);
    }

    if (newPath.length > DISTANCE_PER_ACTION) {
        newPath.length = DISTANCE_PER_ACTION;

        aimerX = BRICK_W/2 + newPath[DISTANCE_PER_ACTION - 1].x * BRICK_W, 
        aimerY = BRICK_H/2 + newPath[DISTANCE_PER_ACTION - 1].y * BRICK_H;
    } else {
        aimerX = outOfRangeX;
        aimerY = outOfRangeY;
    }

    if (newPath.length > 0) {
        currentPath = newPath;
    }
}

function drawAimer() {
    if (isInAimMode) {
        canvasContext.drawImage(targetAimerPic, aimerX - targetAimerPic.width / 2, aimerY - targetAimerPic.height / 2);
    } else {
        let drawEdges = debugMode ? true : false;
        drawNavGraph(playerNavGraph, 'white', drawEdges);
        drawNavGraph(currentPath, 'green');

        if (character1.path.length > 0 || character2.path.length > 0) {
            return;
        }

        if (outOfRangeX != aimerX) {
            colorRect(outOfRangeX - moveAimerPic.width / 4, outOfRangeY - moveAimerPic.height, moveAimerPic.width/2, moveAimerPic.height, 'red')
            canvasContext.drawImage(moveAimerPic, outOfRangeX - moveAimerPic.width / 2, outOfRangeY - moveAimerPic.height);
        }

        canvasContext.drawImage(moveAimerPic, aimerX - moveAimerPic.width / 2, aimerY - moveAimerPic.height);
    }  
}

function findGround(x, y) {
    let groundY = y;
        checkCol = colAtXCoord(x),
        startRow = rowAtYCoord(y),
        checkIndex = levelTileIndexAtColRowCoord(checkCol, startRow);

    //If the cursor is already inside of a wall
    if (isSolidTile(levelTileGrid[checkIndex])) {
        //Find nearest empty tile above the cursor
        for (let i = startRow; i >= 0; i--) {
            checkIndex = levelTileIndexAtColRowCoord(checkCol, i);
            if (isPassableTile(levelTileGrid[checkIndex])) {
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