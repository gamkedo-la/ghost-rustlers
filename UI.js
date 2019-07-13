function drawUI() {
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")", 8, 14);
    canvasContext.fillText("Character Position: (" + Math.floor(character1.characterX) + ", " + Math.floor(character1.characterY) + ")", 8, 24);
    canvasContext.fillText("Distance: (" + DistanceBetweenPoints(mousePos.x, mousePos.y, character1.characterX, character1.characterY) + ")", 8, 34);
    canvasContext.fillText("Tile: " + getBrickIndexAtPixelCoord(mousePos.x, mousePos.y), 8, 44);
    canvasContext.fillText("Character1 Active: " + character1.isActive, 8, 54);
    canvasContext.fillText("Character2 Active: " + character2.isActive, 8, 64);
    canvasContext.fillText("Angle: (" + AngleOfLine(mousePos.x, mousePos.y, character1.characterX, character1.characterY) + ")", 8, 74);
}