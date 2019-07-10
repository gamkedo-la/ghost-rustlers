function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + BRICK_COLS * tileRow);
}

function getBrickIndexAtPixelCoord(pixelX, pixelY) {
    var brickCol = pixelX / BRICK_W;
    var brickRow = pixelY / BRICK_H;

    //	we'll	use	Math.floor	to	round	down	to	the	nearest	whole	number
    brickCol = Math.floor(brickCol);
    brickRow = Math.floor(brickRow);

    var brickIndex = brickTileToIndex(brickCol, brickRow);
    if (brickGrid[brickIndex] == 1) {
        return brickIndex;
    } else {
        return 0;
    }
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] == 1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
    var tileCol = hitPixelX / BRICK_W;
    var tileRow = hitPixelY / BRICK_H;

    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // first check whether the character is within any part of the brick wall
    if (tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS) {
        return false;
    }

    var brickIndex = brickTileToIndex(tileCol, tileRow);
    return (brickGrid[brickIndex] == 1);
}

function DistanceBetweenPoints(x1, y1, x2, y2) {
    distance = Math.floor(Math.hypot(Math.floor(x1) - Math.floor(x2), Math.floor(y1) - Math.floor(y2)))
    return distance;
}

function BrickBelowMouse() {
    if (isBrickAtPixelCoord(mousePos.x, mousePos.y)) {
        return true;
    }
}

function DistanceBetweenPoints(x1, y1, x2, y2) {
    distance = Math.floor(Math.hypot(Math.floor(x1) - Math.floor(x2), Math.floor(y1) - Math.floor(y2)))
    return distance;
}

function AngleOfLine(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
}