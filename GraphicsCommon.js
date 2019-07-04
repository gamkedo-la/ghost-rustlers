function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
    
function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawBackground(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}
    
function drawBricks() {
    for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
        for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
        
            if( isBrickAtTileCoord(eachCol, eachRow) ) {
                var brickLeftEdgeX = eachCol * BRICK_W;
                var brickTopEdgeY = eachRow * BRICK_H;
                colorRect(brickLeftEdgeX, brickTopEdgeY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
            } // end of isBrickAtTileCoord()

        } // end of for eachRow
    } // end of for eachCol
} // end of drawBricks()

function drawUI(){
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")",8,14);
    canvasContext.fillText("Character Position: (" + Math.floor(characterX) + ", " + Math.floor(characterY) + ")",8,24);
    canvasContext.fillText("Distance: (" + DistanceBetweenPoints(mousePos.x, mousePos.y, characterX, characterY) + ")",8,34);
}

function DistanceBetweenPoints(x1, y1, x2, y2){
    distance = Math.floor(Math.hypot(Math.floor(x1)-Math.floor(x2), Math.floor(y1)-Math.floor(y2)))
    return distance;
}