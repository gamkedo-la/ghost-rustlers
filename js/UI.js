var gameOver = false;
let ghosts = 12;
let ghostsLeft;

function drawUI() {
    if (debugMode) {
        canvasContext.fillStyle = 'white';
        canvasContext.font = "10px Verdana";
        canvasContext.fillText("Mouse Position: (" + mousePos.x + ", " + mousePos.y + ")", 50, 180);
        canvasContext.fillText("Character Position: (" + Math.floor(character1.x) + ", " + Math.floor(character1.y) + ")", 50, 100);
        canvasContext.fillText("Distance: (" + character1.distShoulderToHand + ")", 50, 110);
        canvasContext.fillText("Tile: " + levelTileIndexAtPixelCoord(mousePos.x, mousePos.y), 50, 120);
        canvasContext.fillText("Character1 Team: " + character1.team, 50, 130);
        canvasContext.fillText("Character2 Team: " + character2.team, 50, 140);
        canvasContext.fillText("Turn: " + turnCount, 50, 150);
        canvasContext.fillText("C1 Actions: " + allPlayerCharacters[0].actionsRemaining, 50, 160);
        canvasContext.fillText("C2 Actions: " + allPlayerCharacters[1].actionsRemaining, 50, 170);
    }

    drawCharacterInfo();

    canvasContext.fillStyle = 'white';
    canvasContext.font = "10px Verdana";
    canvasContext.fillText("Press E to toggle Aim.", 50, 60);
    canvasContext.fillText("Press 1 & 2 to select Character.", 50, 70);
    canvasContext.fillText("Left Mouse Click to Move when not Aiming or Shoot when Aiming.", 50, 80);
    canvasContext.fillText("Press Arrow Keys to Pan Camera", 50, 90);
	colorText(turnCount + "/" + levelTurns, 390, 40, "white", font = "30px Arial Black");
	
	
    if (character1.actionsRemaining == 0 && character2.actionsRemaining == 0) {
		if(turnCount <= levelTurns){
        canvasContext.fillStyle = 'white';
        canvasContext.font = "30px Verdana";
        canvasContext.fillText("Press Space to End Turn", 225, 200);
		}
	}
    
	if (turnCount > levelTurns){
		colorText("Game Over Man!", 225, 300, "white", font = "14px Arial Black");
		colorText("Press Space to Reset Game", 225, 500, "white", font = "14px Arial Black");
		gameOver = true;
	}
	
}

function drawCharacterInfo() {        
    canvasContext.fillStyle = '#7F87FB';
    canvasContext.font = "14px Verdana";
    //canvasContext.fillText("Character 1", 150, 20);
    canvasContext.fillText("Character A:" , 240, 90);
    canvasContext.fillText("Character B:", 470, 90);
    canvasContext.fillText(character2.actionsRemaining, 570, 90);
    canvasContext.fillText(character1.actionsRemaining, 340, 90);
    canvasContext.fillStyle = 'white';
    canvasContext.font = "20px Verdana";
    canvasContext.fillText("Ghosts", 380, 90);
    /*
     if (character1.isActive) {
        canvasContext.strokeStyle = "red";
        canvasContext.rect(145, 0, 225, 50);
        canvasContext.stroke();
    }
    */
    
    //canvasContext.fillText("Character 2", 500, 20);

    /*
    if (character2.isActive) {
        //convasContext.begin();
        canvasContext.strokeStyle = "green";
        canvasContext.rect(495, 0, 225, 50);
        canvasContext.stroke();
    }
    *///GhostBar
   //for (var i = 1; i < ghosts.length; i++) {
    drawGhost(canvasContext, canvas.width/2+20, 55, 8*i, 10);
//}
   canvasContext.drawImage(circleImg,280, 15, 60, 60);
   canvasContext.drawImage(circleImg,480, 15, 60, 60);
   drawActionsRemaining();

   for (i = 0; i < allCharacters.length; i++){
       drawHealthBar(allCharacters[i]);
   }

} //End of drawCharacterInfo

function drawHealthBar(char) {
    var pipSize = 10,
        pipGap = Math.round(pipSize/5);
        pipPositionX = char.x - ((pipSize * char.health) + (char.health + pipGap)) / 2 ;
        pipPositionY = char.y - (CHARACTER_HEIGHT) - pipSize * 2;
    
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    canvasContext.fillStyle = char.color;
    canvasContext.font = "12px Verdana";
    canvasContext.textAlign = 'center';
    canvasContext.fillText(char.team + ' ' + char.color, char.x, pipPositionY - (pipSize + pipGap))

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

function drawActionsRemaining(x,y,r,sAngle,eAngle,counterclockwise){
    canvasContext.beginPath();
        canvasContext.arc(310,45,25,0*Math.PI,character1.actionsRemaining*Math.PI);
        canvasContext.fillStyle = "#D32D41";
        canvasContext.fill();
    canvasContext.beginPath();
        canvasContext.arc(510,45,25,0*Math.PI,character2.actionsRemaining*Math.PI);
        canvasContext.fillStyle = "#7F8C5D";
        canvasContext.fill();
}


function drawGhost(positionX, positionY, width, height, color){
colorRect(screen - 340, 60, (ghosts / ghostsLeft), 22, 'white');
colorLine(screen - 340, 60, ghosts, 22,"black");
}


