var buttonList = [
    {text:"Level 1", action: function() { startLevel(allLevels[0]); } },
    {text:"Level 2", action: function() { startLevel(allLevels[1]); } },
    {text:"Level 3", action: function() { startLevel(allLevels[2]); } },
    {text:"Random", action: function() { startLevel(generateRandomLevel()); } },
    {text:"Credits", action: function() { showCredits=true; } }
];

var showCredits = false;

function startLevel(whichLevel) {
    levelTileGrid = whichLevel; // which level data to use?
    updateState(STATE_GAME); // start playing!
    hauntedHoedownSound.loopSong("hauntedHoedown"); // start music
}

function drawTitleScreen(){
    background.draw(Math.sin(performance.now()/5000)*100-150,0);
	colorText("GHOST RUSTLERS", (canvas.width/2-300), (canvas.height/2-100), 'white', "64px Arial Black");

    if(showCredits) {
        drawCredits();
        return;
    }

    var bx = canvas.width/2-25;
    var by = canvas.height/2+5;

    for(var i=0;i<buttonList.length;i++) {
        canvasContext.drawImage(buttonPic,(canvas.width/2-50), (canvas.height/2-25)+60*i, 100, 50);
        colorText(buttonList[i].text, bx-4, by+60*i, 'white');
    }
}

function titleScreenMouseClick(mousePosX, mousePosY){

    if(showCredits) {
        showCredits = false;
        return;
    }
    
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

// code below is adapted from JS game credits as I'd implemented them for another club game, Little Racers -cdeleon
function drawCredits() {
    canvasContext.globalAlpha = 0.7;
    colorRect(0,0, canvas.width, canvas.height, 'black');
    canvasContext.globalAlpha = 1.0;
    var creditsFontSize = "14px Arial";
    canvasContext.font = creditsFontSize; // reminder: must set before measureText!
    var creditsWidth = canvasContext.measureText(creditsText[0]).width; // assumption: top/first line of text is full-ish
    var creditLineHeightApprox = 12;
    var creditsHeight = creditLineHeightApprox * creditsText.length;
    var textLeftX = canvas.width/2-creditsWidth/2;
    var textTopY = canvas.height/2-creditsHeight/2;
    var lineSkip = 15;
    for(var i=0;i<creditsText.length;i++) {
        colorText(creditsText[i],textLeftX,textTopY+lineSkip*i,"white", creditsFontSize); 
    }
}

var creditsText =
[
"Brian J. Boucher - Project lead, core gameplay prototype, aim calculations, character switching feature, health bar, projectile and ricochet logic, camera pan improvements, debug visualization features, enemy support, destroyable object code, exploding barrels, additional asset integration and assorted bug fixing",
"Brian Nielsen - Skeletal animation system which includes the custom animation format, internal/team-use editor, and in-game integration",
"Christer \"McFunkypants\" Kaitila - Sunset background, glare/rays effects, parallax background support, sky improvements, cursor idle bobbing, tumbleweeds, editor saving improvement, mouse cursors, decorative sprite support, html cleanup, initialization race condition fix, fullscreen HD canvas support, level random generation and level switch support",
"Andrew Mushel - Path finding, ledge hopping, ladder climbing, nav debug support, stylish cowboy hat, AI follow behavior, health and name tags, input refactor, movement cursor logic, aimer improvements, camera pan support, new platform collisions, tumbleweed improvement, cacti tweak, assorted bug fixes",
"Vaan Hope Khani - Ghost diamonds, actions remaining interface, UI updates, boulder, sounds (whoosh, multiple shots, menu, explosion), 2 cowboy images, body parts, gun art, UI sprites, character sprite, text fixes for UI",
"Vince McKeown - Color text support, attack colliders, turn end detection, turn limits, ghost transparency, audio integration, game states, start button art, early AI implementation",
"Bilal A. Cheema - Selectable character tint indicators, camera tracking, cactus art, limb bug fix, realignment for UI and parallax background",
"Jose Contreras - Bullet extrapolation, weapon integration during aim mode",
"Jaime Rivas - Low intensity music",
"Stebs - Cowboy hat",
"Gonzalo Delgado - Ghost enemy art",
"Simon J Hoffiz - Pause button hookup",
"Ricardo Velez - Mirroring character arm when aiming left",
" ",
"                       Game made in HomeTeam GameDev, find out more or apply to join at HomeTeamGameDev.com",
" ",
"                                                                    -- CLICK ANYWHERE TO RETURN --"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
    var newCut = [];
    var maxLineChar = 119;
    var findEnd;
    for(var i=0;i<creditsText.length;i++) {
        while(creditsText[i].length > 0) {
            findEnd = maxLineChar;
            if(creditsText[i].length > maxLineChar) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditsText[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditsText[i].substring(0, findEnd));
            creditsText[i] = creditsText[i].substring(findEnd, creditsText[i].length);
        }
    }   
    creditsText = newCut;
}
lineWrapCredits(); // note: calling immediately as part of init
