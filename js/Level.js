const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 2;
const BRICK_COLS = 30;
const BRICK_ROWS = 20;
var levelTurns = 6; //place holder.
var wallEdges = [];
var wallStartX;
var wallStartY;
var wallEndX;
var wallEndY;
var cameraRightMostCol;
var cameraBottomMostRow;
var brickLeftEdgeX;
var brickTopEdgeY;
var brickRightEdgeX;
var brickBottomEdgeY;


var levelTileGrid = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function drawGroundBlocks() {

    var cameraLeftMostCol = Math.floor(camPanX / BRICK_W);
    var cameraTopMostRow = Math.floor(camPanY / BRICK_H);

    // how many columns and rows of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(canvas.width / BRICK_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height / BRICK_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 and + 2 on each pushes the new tile popping in off visible area
    // +2 for columns since BRICK_W doesn't divide evenly into canvas.width
    cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
    cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    for (var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
        for (var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {

            brickLeftEdgeX = eachCol * BRICK_W;
            brickTopEdgeY = eachRow * BRICK_H;
            brickRightEdgeX = brickLeftEdgeX + BRICK_W;
            brickBottomEdgeY = brickTopEdgeY + BRICK_H;

            if (isWallTileAtLevelTileCoord(eachCol, eachRow)) {
                canvasContext.drawImage(wallPic, brickLeftEdgeX, brickTopEdgeY);
                createVertLeftFacingWallEdges(eachCol, eachRow);
            } else {
                createVertRightFacingWallEdges(eachCol, eachRow);
            } // end of isWallTileAtLevelTileCoord()

        } // end of for eachRow
    } // end of for eachCol

    for (var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
        for (var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
            
            brickLeftEdgeX = eachCol * BRICK_W;
            brickTopEdgeY = eachRow * BRICK_H;
            brickRightEdgeX = brickLeftEdgeX + BRICK_W;
            brickBottomEdgeY = brickTopEdgeY + BRICK_H;

            if (isWallTileAtLevelTileCoord(eachCol, eachRow)) {
                createHorTopFacingWallEdges(eachCol, eachRow);
            } else {
                createHorBottomFacingWallEdges(eachCol, eachRow);
            } // end of isWallTileAtLevelTileCoord()
        }
    }

    for (i = 0; i < wallEdges.length; i++) {
        wallEdges[i].angle = angleFromLine(wallEdges[i]);
        //colorLine(wallEdges[i].x1, wallEdges[i].y1, wallEdges[i].x2, wallEdges[i].y2);
    }

} // end of drawGroundBlocks()

function saveWallEdgeToList() {

    if (wallStartX === wallEndX || wallStartY === wallEndY) {
        wallEdges.push({
            x1: wallStartX,
            y1: wallStartY,
            x2: wallEndX,
            y2: wallEndY,
            angle: 0
        })
    }

    wallStartX = null;
    wallStartY = null;
    wallEndX = null;
    wallEndY = null;
}

function startWallEdge() {
    wallStartX = brickLeftEdgeX;
    wallStartY = brickTopEdgeY;
}

function endWallEdge(x, y) {
    wallEndX = x;
    wallEndY = y;
}

function createVertLeftFacingWallEdges(eachCol, eachRow) {
    if (!isWallTileAtLevelTileCoord(eachCol - 1, eachRow)) {
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachRow >= cameraBottomMostRow || isWallTileAtLevelTileCoord(eachCol, eachRow + 1)) {
            endWallEdge(brickLeftEdgeX, brickBottomEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createVertRightFacingWallEdges(eachCol, eachRow) {
    if (isWallTileAtLevelTileCoord(eachCol - 1, eachRow)) {
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachRow >= cameraBottomMostRow || isWallTileAtLevelTileCoord(eachCol, eachRow + 1)) {
            endWallEdge(brickLeftEdgeX, brickBottomEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createHorTopFacingWallEdges(eachCol, eachRow) {
    if (!isWallTileAtLevelTileCoord(eachCol, eachRow - 1)) {
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachCol >= cameraRightMostCol || isWallTileAtLevelTileCoord(eachCol + 1, eachRow)) {
            endWallEdge(brickRightEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}

function createHorBottomFacingWallEdges(eachCol, eachRow) {
    if (isWallTileAtLevelTileCoord(eachCol, eachRow - 1)) { 
        if (wallStartX == null && wallStartY == null) {
            startWallEdge();
        }
        if (eachCol >= cameraRightMostCol || isWallTileAtLevelTileCoord(eachCol + 1, eachRow)) {
            endWallEdge(brickRightEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    } else {
        if (wallStartX != null && wallStartY != null) {
            endWallEdge(brickLeftEdgeX, brickTopEdgeY);
            saveWallEdgeToList();
        }
    }
}