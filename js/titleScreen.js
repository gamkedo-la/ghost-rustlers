var buttonList = [
    {text:"Level 1", action: function() { startLevel(allLevels[0]); } },
    {text:"Level 2", action: function() { startLevel(allLevels[1]); } },
    {text:"Level 3", action: function() { startLevel(allLevels[2]); } },
    {text:"Random", action: function() { startLevel(generateRandomLevel()); } }
];

function startLevel(whichLevel) {
    levelTileGrid = whichLevel; // which level data to use?
    updateState(STATE_GAME); // start playing!
    hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
}

function drawTitleScreen(){
    background.draw(Math.sin(performance.now()/5000)*100-150,0);
	colorText("GHOST RUSTLERS", (canvas.width/2-300), (canvas.height/2-100), 'white', "64px Arial Black");

    var bx = canvas.width/2-25;
    var by = canvas.height/2+5;

    for(var i=0;i<buttonList.length;i++) {
        canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25)+60*i, 100, 50);
        colorText(buttonList[i].text, bx-4, by+60*i, 'white');
    }
}

function titleScreenMouseClick(mousePosX, mousePosY){
    
    var w = 100;
    var h = 50;
    var x = canvas.width/2-50;
    var y = canvas.height/2-25;

    for(var i=0;i<buttonList.length;i++) {
        if( (mousePosX > x) && // left side
            (mousePosX < x + w) && //right side
            (mousePosY > y + 60*i) && //top side
            (mousePosY < y + 60*i + h)) //bottom side
        {
            buttonList[i].action();       
        }
    }
}