function drawTitleScreen(){
	colorRect(0, 0, canvas.width, canvas.height, 'gray');
	colorRect((canvas.width/2-50), (canvas.height/2-25), 100, 50, 'blue');
	colorText("START", (canvas.width/2-25), (canvas.height/2+5), 'black');
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