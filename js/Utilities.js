function levelTileIndexAtColRowCoord(tileCol, tileRow) {
    return (tileCol + BRICK_COLS * tileRow);
}

function levelTileIndexAtPixelCoord(pixelX, pixelY) {
    var brickCol = pixelX / BRICK_W;
    var brickRow = pixelY / BRICK_H;

    //	we'll use Math.floor to round down to the nearest whole number
    brickCol = Math.floor(brickCol);
    brickRow = Math.floor(brickRow);

    var levelTileIndex = levelTileIndexAtColRowCoord(brickCol, brickRow);
    if (levelTileGrid[levelTileIndex] == 1) {
        return levelTileIndex;
    } else {
        return 0;
    }
}

function colAtXCoord(pixelX) {
    return Math.floor(pixelX / BRICK_W);
}

function rowAtYCoord(pixelY) {
    return Math.floor(pixelY / BRICK_H);
}

function xCoordAtCenterOfCol(tileCol) {
    return ((tileCol * BRICK_W) + BRICK_W / 2)
}

function yCoordAtCenterOfRow(tileRow) {
    return ((tileRow * BRICK_H) + BRICK_H / 2)
}

function isSolidTileAtLevelTileCoord(levelTileCol, levelTileRow) {
    var levelTileIndex = levelTileIndexAtColRowCoord(levelTileCol, levelTileRow);
    return (levelTileGrid[levelTileIndex] === WALL_TILE ||
            levelTileGrid[levelTileIndex] === LADDER_PLATFORM_TILE ||
            levelTileGrid[levelTileIndex] === PLATFORM_TILE);
}

function isSolidTileAtPixelCoord(pixelX, pixelY) {

    var levelTileCol = colAtXCoord(pixelX);
    var levelTileRow = rowAtYCoord(pixelY);

    if (levelTileCol < 0 || levelTileCol >= BRICK_COLS || levelTileRow < 0 || levelTileRow >= BRICK_ROWS) {
        return false;
    }

    return isSolidTileAtLevelTileCoord(levelTileCol, levelTileRow);
}

function isWallTileAtLevelTileCoord(levelTileCol, levelTileRow) {
    var levelTileIndex = levelTileIndexAtColRowCoord(levelTileCol, levelTileRow);
    return (levelTileGrid[levelTileIndex] == WALL_TILE);
}

function isWallTileAtPixelCoord(pixelX, pixelY) {

    var levelTileCol = colAtXCoord(pixelX);
    var levelTileRow = rowAtYCoord(pixelY);

    if (levelTileCol < 0 || levelTileCol >= BRICK_COLS || levelTileRow < 0 || levelTileRow >= BRICK_ROWS) {
        return false;
    }

    return isWallTileAtLevelTileCoord(levelTileCol, levelTileRow);
}

function DistanceBetweenTwoPixelCoords(x1, y1, x2, y2) {
    distance = Math.floor(Math.hypot(Math.floor(x1) - Math.floor(x2), Math.floor(y1) - Math.floor(y2)))
    return distance;
}

function isBrickAtMousePos() {
    if (isWallTileAtPixelCoord(mousePos.x, mousePos.y)) {
        return true;
    }
}

// Returns whether 2 lines intersect (as a bool) and the x and y points of that intersection.
function getLineIntersection(l1, l2) {
    var det, gamma, lambda, oppositeLambda;
    det = (l1.x2 - l1.x1) * (l2.y2 - l2.y1) - (l2.x2 - l2.x1) * (l1.y2 - l1.y1);
    if (det === 0) {
        return false;
    } else {
        lambda = ((l2.y2 - l2.y1) * (l2.x2 - l1.x1) + (l2.x1 - l2.x2) * (l2.y2 - l1.y1)) / det;
        gamma = ((l1.y1 - l1.y2) * (l2.x2 - l1.x1) + (l1.x2 - l1.x1) * (l2.y2 - l1.y1)) / det;
        oppositeLambda = 1.0 - lambda;
        return {
            linesIntersect: (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1),
            x: l1.x1 * oppositeLambda + l1.x2 * lambda,
            y: l1.y1 * oppositeLambda + l1.y2 * lambda
        }
    }
}

//function angleFromLine(cx, cy, ex, ey) {
function angleFromLine(l1) { // get angle of a given line relative to a line with an angle of 0.
    var dy = l1.y2 - l1.y1;
    var dx = l1.x2 - l1.x1;
    var theta = Math.atan2(dy, dx); // range (-PI, PI)
    return theta;
}

function radiansFromDegrees(degrees) {
    radians = ((degrees * Math.PI) / 180);
    return radians;
}

function degreesFromRadians(radians) {
    degrees = ((radians * 180) / Math.PI)
    return degrees;
}

function angleOfReflection(incomingLine, surfaceLine) {

    //rotate angles to 0 rads before doing calculations.
    var rotatedTrajectoryAngle = angleFromLine(incomingLine) - angleFromLine(surfaceLine);

    //find the rotated exit angle
    var rotatedExitAngle = (2 * Math.PI) - rotatedTrajectoryAngle;

    //rotate the exit angle back to it's actual angle.
    var ricochetAngle = rotatedExitAngle + angleFromLine(surfaceLine);

    //console.log(ricochetAngle);
    return ricochetAngle;
}