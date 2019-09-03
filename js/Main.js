var canvas, canvasContext;

//Game States
const STATE_GAME = 0;
const STATE_TITLE_SCREEN = 1;
const STATE_PAUSED = 2;
const STATE_DEBUGMODE = 3;
var gameState = STATE_TITLE_SCREEN;


var isPaused = false;
var debugMode = false;
var allCharacters = [];
var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
var enemy1 = new enemyClass('ENEMY_TEAM', 'white');
var turnCount = 1;
var playersTurn = true;

//Camera Pan Variables
var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

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
  initRenderLoop();

  background = new BackgroundClass();

  character1.characterSpawn();
  character2.characterSpawn();

  character1.activateCharacter();
  character2.deactivateCharacter();
}

function updateState(newState) {
	console.log (newState);
	gameState = newState;
}

function moveCamera() {

  if (holdRight || mousePos.x >= canvas.width - BRICK_W) {
    camPanX += RUN_SPEED;
  }
  if (holdLeft || mousePos.x <= BRICK_W) {
    camPanX -= RUN_SPEED;
  }
  if (holdUp || mousePos.y <= BRICK_H) {
    camPanY -= RUN_SPEED;
  }
  if (holdDown || mousePos.y >= canvas.height - BRICK_H) {
    camPanY += RUN_SPEED;
  }

  //keeps camera in bounds
  if (camPanX < 0) {
    camPanX = 0;
  }
  if (camPanY < 0) {
    camPanY = 0;
  }
  var maxPanRight = BRICK_COLS * BRICK_W - canvas.width;
  var maxPanTop = BRICK_ROWS * BRICK_H - canvas.height;
  if (camPanX > maxPanRight) {
    camPanX = maxPanRight;
  }
  if (camPanY > maxPanTop) {
    camPanY = maxPanTop;
  }
}

function moveEverything() {
	if(gameState == STATE_TITLE_SCREEN){
		return;
    } else {
		if(playersTurn){
			character1.characterMove();
			character2.characterMove();
		} else {
			if(enemy1.health > 0){
			enemy1.enemyMove();
			}
		}
		if (!enemy1.isOnGround){ //prevent enemy from stopping in mid air, although, it is a ghost.
			enemy1.enemyMove();
		}

		moveCamera();
		moveAimer();
	}
}

function drawEverything() {
	if(gameState == STATE_TITLE_SCREEN){
		drawTitleScreen();
	} else if (gameState == STATE_GAME){
		background.draw();

		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY);

		drawGroundBlocks();
		character1.drawCharacter();
		character2.drawCharacter();
			if(enemy1.health > 0){
				enemy1.drawCharacter();
			}
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

  //Enemy Actions

}

function endEnemyTurn() {
  playersTurn = true;
  enemy1.movementDetermined = false;
  enemy1.hasFired = false;
  character1.activateCharacter();
}

function resetGame() {
  character1.characterReset();
  character2.characterReset();
  turnCount = 1;
  gameOver = false;
}
