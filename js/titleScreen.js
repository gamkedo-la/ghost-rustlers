function drawTitleScreen(){
    background.draw(Math.sin(performance.now()/5000)*100-150,0);
	colorText("GHOST RUSTLERS", (canvas.width/2-300), (canvas.height/2-100), 'white', "64px Arial Black");

    var bx = canvas.width/2-25;
    var by = canvas.height/2+5;

    canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25), 100, 50);
	colorText("Level 1", bx, by, 'white');

    canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25) + 60, 100, 50);
	colorText("Level 2", bx, by + 60, 'white');

    canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25) + 60 + 60, 100, 50);
	colorText("Level 3", bx, by + 60 + 60, 'white');

    canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25) + 60 + 60 + 60, 100, 50);
	colorText("Random", bx-5, by + 60 + 60 + 60, 'white');

}

function titleScreenMouseClick(mousePosX, mousePosY){
    
    var w = 100;
    var h = 50;
    var x = canvas.width/2-50;
    var y = canvas.height/2-25;

    // level 1 clicked
	if(	(mousePosX > x) && // left side
		(mousePosX < x + w) && //right side
		(mousePosY > y) && //top side
		(mousePosY < y + h)) //bottom side
	{		
        levelTileGrid = allLevels[0]; // which level data to use?
        updateState(STATE_GAME); // start playing!
		hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
	}

    // level 2 clicked
	if(	(mousePosX > x) && // left side
		(mousePosX < x + w) && //right side
		(mousePosY > y + 60) && //top side
		(mousePosY < y + 60 + h)) //bottom side
	{		
        levelTileGrid = allLevels[1]; // which level data to use?
        updateState(STATE_GAME); // start playing!
		hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
	}

    // level 3 clicked
	if(	(mousePosX > x) && // left side
		(mousePosX < x + w) && //right side
		(mousePosY > y + 60 + 60) && //top side
		(mousePosY < y + 60 + 60 + h)) //bottom side
	{		
        levelTileGrid = allLevels[2]; // which level data to use?
        updateState(STATE_GAME); // start playing!
		hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
    }
    
    // level 4 clicked
	if(	(mousePosX > x) && // left side
    (mousePosX < x + w) && //right side
    (mousePosY > y + 60 + 60 + 60) && //top side
    (mousePosY < y + 60 + 60 + 60 + h)) //bottom side
{		
    levelTileGrid = generateRandomLevel(); // woo hoo!
    updateState(STATE_GAME); // start playing!
    hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
}

}