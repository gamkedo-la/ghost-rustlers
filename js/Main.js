var canvas, canvasContext;

//Game States
const STATE_GAME = 0;
const STATE_TITLE_SCREEN = 1;
const STATE_PAUSED = 2;
const STATE_DEBUGMODE = 3;
var gameState = STATE_TITLE_SCREEN;

var isPaused = false;
var debugMode = false;
var allObjects = [];
var allCharacters = [];
var allEnemies = [];
var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('ENEMY_TEAM', 'green');
var enemy1 = new enemyClass('ENEMY_TEAM', 'white');
//var boulder1 = new destructableObjectClass(50, 50);
var turnCount = 1;
var playersTurn = true;

var background = new BackgroundClass();

function initRenderLoop() {
  var framesPerSecond = 60;
  setInterval(function () {

    if (hold_1_Key) {
      character1.activateCharacter();
      character2.deactivateCharacter();
    }

    if (hold_2_Key) {
      character1.deactivateCharacter();
      character2.activateCharacter();
    }

    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
}

window.onload = function () {

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  initArt();
  initInput();
  initNavGraph();

  character1.objectSpawn(canvas.width / 2, canvas.height / 2);
  character2.objectSpawn(canvas.width / 2 + 100, canvas.height / 2);
  enemy1.objectSpawn(500, 500);
  //boulder1.objectSpawn(50, 50);

  character1.activateCharacter();
  character2.deactivateCharacter();
}

function updateState(newState) {
	console.log (newState);
	gameState = newState;
}

function moveEverything() {
	if(gameState == STATE_TITLE_SCREEN){
		return;
    } else {
		if(playersTurn){
			character1.characterMove();
			character2.characterMove();
    } 
  
		enemy1.enemyMove();

    moveCamera();
		wobbleAimer();
	}
}

function drawEverything() {
	if(gameState == STATE_TITLE_SCREEN){
		drawTitleScreen();
	} else if (gameState == STATE_GAME){
        
        background.draw(-camPanX/4,-camPanY/8);

		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY);

		drawGroundBlocks();
		character1.drawCharacter();
		character2.drawCharacter();
    enemy1.drawCharacter();
    //boulder1.drawObject();
		drawAimer();

		canvasContext.restore(); // undoes the .translate() used for cam scroll
		drawUI();
	}
}

function endPlayerTurn() {
  turnCount++;
  playersTurn = false;
  character1.characterReset();
  character2.characterReset();
	
  enemyTurn();
}

function enemyTurn() {

  //enemyAim();

}

function endEnemyTurn() {
  console.log('end enemy turn');
  enemy1.movementDetermined = false;
  enemy1.hasFired = false;
  character1.activateCharacter();
  playersTurn = true;
}

function resetGame() {
  character1.characterReset();
  character2.characterReset();
  turnCount = 1;
  gameOver = false;
}
