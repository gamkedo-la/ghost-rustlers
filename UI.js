function drawUI() {
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")", 8, 14);
    canvasContext.fillText("Character Position: (" + Math.floor(characterX) + ", " + Math.floor(characterY) + ")", 8, 24);
    canvasContext.fillText("Distance: (" + DistanceBetweenPoints(mousePos.x, mousePos.y, characterX, characterY) + ")", 8, 34);
    canvasContext.fillText("Tile: " + getBrickIndexAtPixelCoord(mousePos.x, mousePos.y), 8, 44);
    canvasContext.fillText("Destination: " + movementDestinationIndex, 8, 54);
}