function drawLoseScreen(){
    background.draw(Math.sin(performance.now()/5000)*100-150,0);
	canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25), 100, 50);
	colorText("YOU LOST!", (canvas.width/2-300), (canvas.height/2-100), 'white', "64px Arial Black");
	colorText("MENU", (canvas.width/2-25), (canvas.height/2+5), 'white');
}

function loseScreenMouseClick(mousePosX, mousePosY){
	//start button
	if(	mousePosX > (canvas.width/2-50) && // left side
		mousePosX < (canvas.width/2-50) + 100 && //right side
		mousePosY > (canvas.height/2-25) && //top side
		mousePosY < (canvas.height/2-25) + 50) //bottom side
	{		
		updateState(STATE_TITLE_SCREEN);
		hauntedHoedownSound.loopSong("HauntedHoedown");		
	}
}