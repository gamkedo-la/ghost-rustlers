var canvas, canvasContext;
var isPaused = false;
var debugMode = false;
var allCharacters = [];
var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
var enemy1 = new enemyClass('ENEMY_TEAM', 'white');
character1.activateCharacter();
character2.deactivateCharacter();
var turnCount = 1;

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

  character1.characterSpawn();
  character2.characterSpawn();

}

function moveCamera() {

  if (holdRight) {
    camPanX += RUN_SPEED;
  }
  if (holdLeft) {
    camPanX -= RUN_SPEED;
  }
  if (holdUp) {
    camPanY -= RUN_SPEED;
  }
  if (holdDown) {
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
  character1.characterMove();
  character2.characterMove();
  enemy1.characterMove();
  moveAimer();
  moveCamera();
}

function drawEverything() {

  drawBackground();

  canvasContext.save();
  canvasContext.translate(-camPanX, -camPanY);

  drawGroundBlocks();
  character1.drawCharacter();
  character2.drawCharacter();
  enemy1.drawCharacter();
  drawAimer();

  canvasContext.restore(); // undoes the .translate() used for cam scroll

  drawUI();

}

function endPlayerTurn() {
  turnCount++

  character1.characterReset();
  character2.characterReset();

  enemyTurn();
}

function enemyTurn() {

  //Enemy Actions

  endEnemyTurn()
}

function endEnemyTurn() {
  character1.activateCharacter();
}

function resetGame() {
  character1.characterReset();
  character2.characterReset();
  turnCount = 1;
  gameOver = false;
}
