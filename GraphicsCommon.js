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
    canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);
}