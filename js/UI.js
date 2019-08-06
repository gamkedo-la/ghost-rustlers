function drawUI() {
    if (debugMode) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")", 8, 14);
        canvasContext.fillText("Character Position: (" + Math.floor(character1.characterX) + ", " + Math.floor(character1.characterY) + ")", 8, 24);
        canvasContext.fillText("Distance: (" + character1.distShoulderToHand + ")", 8, 34);
        canvasContext.fillText("Tile: " + getBrickIndexAtPixelCoord(mousePos.x, mousePos.y), 8, 44);
        canvasContext.fillText("Character1 Team: " + character1.team, 8, 54);
        canvasContext.fillText("Character2 Team: " + character2.team, 8, 64);
        //canvasContext.fillText("Angle: (" + AngleOfLine(character1.characterX, character1.characterY, mousePos.x, mousePos.y) + ")", 8, 74);
        canvasContext.fillText("Turn: " + turnCount, 8, 84);
        canvasContext.fillText("C1 Actions: " + character1.actionsRemaining, 8, 94);
        canvasContext.fillText("C2 Actions: " + character2.actionsRemaining, 8, 104);
        //canvasContext.fillText(allCharacters, 8, 114);
        //canvasContext.fillText(TriOppSideFromTwoSides(ARM_SEGMENT_LENGTH, (DistanceBetweenPoints(mousePos.x, mousePos.y, character1.characterX, character1.characterY))/2), 8, 124);
    }

    drawCharacterInfo();
}

function drawCharacterInfo() {
    for (i = 0; i < character1.health; i++) {
        var healthPipSlot = i;
        var healthPipSize = 5;
        colorRect(character1.characterX - (CHARACTER_WIDTH / 2) + (healthPipSlot * (healthPipSize + 1)), character1.characterY - (CHARACTER_HEIGHT / 2) - 10, healthPipSize, healthPipSize, 'green');
    }
}