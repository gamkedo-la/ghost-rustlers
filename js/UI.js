function drawUI() {
    if (debugMode) {
        canvasContext.fillStyle = 'white';
        canvasContext.font = "10px Verdana";
        canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")", 50, 180);
        canvasContext.fillText("Character Position: (" + Math.floor(character1.characterX) + ", " + Math.floor(character1.characterY) + ")", 50, 100);
        canvasContext.fillText("Distance: (" + character1.distShoulderToHand + ")", 50, 110);
        canvasContext.fillText("Tile: " + getBrickIndexAtPixelCoord(mousePos.x, mousePos.y), 50, 120);
        canvasContext.fillText("Character1 Team: " + character1.team, 50, 130);
        canvasContext.fillText("Character2 Team: " + character2.team, 50, 140);
        canvasContext.fillText("Turn: " + turnCount, 50, 150);
        canvasContext.fillText("C1 Actions: " + character1.actionsRemaining, 50, 160);
        canvasContext.fillText("C2 Actions: " + character2.actionsRemaining, 50, 170);
    }

    drawCharacterInfo();

    canvasContext.fillStyle = 'white';
    canvasContext.font = "10px Verdana";
    canvasContext.fillText("Press E to toggle Aim.", 50, 60);
    canvasContext.fillText("Press 1 & 2 to select Character.", 50, 70);
    canvasContext.fillText("Left Mouse Click to Move when not Aiming or Shoot when Aiming.", 50, 80);
    canvasContext.fillText("Press Arrow Keys to Pan Camera", 50, 90);
    if (character1.actionsRemaining == 0 && character2.actionsRemaining == 0) {
        canvasContext.fillStyle = 'white';
        canvasContext.font = "30px Verdana";
        canvasContext.fillText("Press Space to End Turn", 225, 200);
    }
}

function drawCharacterInfo() {        
    canvasContext.fillStyle = 'red';
    canvasContext.font = "20px Verdana";
    canvasContext.fillText("Character 1", 150, 20);
    canvasContext.fillText("Actions Remaining: " + character1.actionsRemaining, 150, 40);
    /*
     if (character1.isActive) {
        canvasContext.strokeStyle = "red";
        canvasContext.rect(145, 0, 225, 50);
        canvasContext.stroke();
    }
    */
    
    canvasContext.fillStyle = 'green';
    canvasContext.fillText("Character 2", 500, 20);
    canvasContext.fillText("Actions Remaining: " + character2.actionsRemaining, 500, 40);

    /*
    if (character2.isActive) {
        //convasContext.begin();
        canvasContext.strokeStyle = "green";
        canvasContext.rect(495, 0, 225, 50);
        canvasContext.stroke();
    }
    */

   drawHealthBar(character1);
   drawHealthBar(character2);
} //End of drawCharacterInfo

function drawHealthBar(char) {
    var pipSize = 10,
        pipGap = Math.round(pipSize/5);
        pipPositionX = char.characterX - ((pipSize * char.health) + (char.health + pipGap)) / 2 ;
        pipPositionY = char.characterY - (CHARACTER_HEIGHT / 2) - pipSize * 2;
    
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    canvasContext.fillStyle = char.color;
    canvasContext.font = "12px Verdana";
    canvasContext.textAlign = 'center';
    canvasContext.fillText(char.team + ' ' + char.color, char.characterX, pipPositionY - (pipSize + pipGap))

    colorRect(pipPositionX - pipGap, pipPositionY - pipGap, (pipSize + pipGap) * char.health + pipGap, pipSize + pipGap * 2, 'black');
    for (var i = 0; i < char.health; i++) {
        var healthQuotient = i/char.maxHealth;
        var pipColor = 'rgb(' + (255 * (1 - healthQuotient)) + ', ' + (255 * healthQuotient) + ', 0)';
        //draw health pips
        colorRect(pipPositionX, pipPositionY, pipSize, pipSize, pipColor);
        pipPositionX += pipSize + pipGap;
    }
    canvasContext.restore();
}