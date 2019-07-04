function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + BRICK_COLS*tileRow);
}
  
function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] == 1);
}
    
function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
    var tileCol = hitPixelX / BRICK_W;
    var tileRow = hitPixelY / BRICK_H;
      
    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );
  
    // first check whether the character is within any part of the brick wall
    if(tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS) {
        return false;
    }      
      
    var brickIndex = brickTileToIndex(tileCol, tileRow);
    return (brickGrid[brickIndex] == 1);
}

function DistanceBetweenPoints(x1, y1, x2, y2){
    distance = Math.floor(Math.hypot(Math.floor(x1)-Math.floor(x2), Math.floor(y1)-Math.floor(y2)))
    return distance;
}