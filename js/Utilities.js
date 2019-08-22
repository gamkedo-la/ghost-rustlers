function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + BRICK_COLS * tileRow);
}

function colAtXCoord(pixelX) {
    return Math.floor(pixelX / BRICK_W);
}

function rowAtYCoord(pixelY) {
    return Math.floor(pixelY / BRICK_H);
}

function colCenterCoord(tileCol) {
    return ((tileCol * BRICK_W) + BRICK_W / 2)
}

function getBrickIndexAtPixelCoord(pixelX, pixelY) {
    var brickCol = pixelX / BRICK_W;
    var brickRow = pixelY / BRICK_H;

    //	we'll use Math.floor to round down to the nearest whole number
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