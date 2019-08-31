function drawTitleScreen(){
	canvasContext.drawImage(backgroundPic,0,0,canvas.width,canvas.height);
	canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25), 100, 50);
	colorText("GHOST RUSTLERS", (canvas.width/2-300), (canvas.height/2-100), 'white', "64px Arial Black");
	colorText("START", (canvas.width/2-25), (canvas.height/2+5), 'white');
}

function titleScreenMouseClick(mousePosX, mousePosY){
	//start button
	if(	mousePosX > (canvas.width/2-50) && // left side
		mousePosX < (canvas.width/2-50) + 100 && //right side
		mousePosY > (canvas.height/2-25) && //top side
		mousePosY < (canvas.height/2-25) + 50) //bottom side
	{		
		updateState(STATE_GAME);
		hauntedHoedownSound.loopSong("hauntedHoedown");		
	}
}