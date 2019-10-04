var canvas, canvasContext;

//Game States
const STATE_GAME = 0;
const STATE_TITLE_SCREEN = 1;
const STATE_PAUSED = 2;
const STATE_DEBUGMODE = 3;
const STATE_WIN_SCREEN = 4;
const STATE_LOSE_SCREEN = 5;
var gameState = STATE_TITLE_SCREEN;

var isPaused = false;
var debugMode = false;
var allCharacters = [];
var allPlayerCharacters = [];
var allEnemyCharacters = [];
var allObjects = [];
var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
var enemy1 = new enemyClass('ENEMY_TEAM', 'white');
//var boulder1 = new destructableObjectClass(50, 50);
var turnCount = 1;
var playersTurn = true;
var aiMousePosX = 500;
var aiMousePosY = 500;

var background = new BackgroundClass();

function initRenderLoop() {
  var framesPerSecond = 60;
  setInterval(function () {

    if (hold_1_Key) {
      for (i = 0; i < allPlayerCharacters.length; i++) {
        if (i == 0) {
          allPlayerCharacters[i].activateCharacter();
        } else {
          allPlayerCharacters[i].deactivateCharacter();
        }
      }
    }

    if (hold_2_Key) {
      for (i = 0; i < allPlayerCharacters.length; i++) {
        if (i == 1) {
          allPlayerCharacters[i].activateCharacter();
        } else {
          allPlayerCharacters[i].deactivateCharacter();
        }
      }
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

  character1.objectSpawn(canvas.width / 2 - 100, canvas.height / 2);
  character2.objectSpawn(canvas.width / 2 + 300, canvas.height / 2);
  enemy1.objectSpawn(500, 500);

  character1.activateCharacter();
  character2.deactivateCharacter();
}

function updateState(newState) {
  console.log(newState);
  gameState = newState;
}

function moveEverything() {
  if (gameState == STATE_TITLE_SCREEN) {
    return;
  } else {
    if (playersTurn) {
      for (i = 0; i < allPlayerCharacters.length; i++) {
        allPlayerCharacters[i].characterMove();
      }
    }

    for (i = 0; i < allEnemyCharacters.length; i++) {
      allEnemyCharacters[i].enemyMove();
    }

    moveCamera();
    wobbleAimer();
    removeDeadUnits();
  }
}

function drawEverything() {
  if (gameState == STATE_TITLE_SCREEN) {
    drawTitleScreen();
  } else if (gameState == STATE_GAME) {

    background.draw(-camPanX / 4, -camPanY / 8);

    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);

    drawGroundBlocks();

    for (i = 0; i < allCharacters.length; i++) {
      allCharacters[i].drawCharacter();
    }

    //TODO: This should be moved somewhere else.
    for (i = 0; i < allPlayerCharacters.length; i++) {
      allPlayerCharacters[i].characterAction();
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
  enemy1.activateCharacter();
  //enemyAim();

}

function endEnemyTurn() {
  console.log('end enemy turn');
  enemy1.movementDetermined = false;
  enemy1.hasFired = false;
  enemy1.deactivateCharacter();
  character1.activateCharacter();
  playersTurn = true;
}

function resetGame() {
  character1.characterReset();
  character2.characterReset();
  turnCount = 1;
  gameOver = false;
}

function removeDeadUnitsFromList(fromArray)	{
  for(var	i=fromArray.length-1;	i>=0;	i--)	{
      if(fromArray[i].isDead)	{
          fromArray.splice(i,1);
      }
  }
}
function removeDeadUnits()	{
  removeDeadUnitsFromList(allCharacters);
  removeDeadUnitsFromList(allEnemyCharacters);
  removeDeadUnitsFromList(allPlayerCharacters);
  removeDeadUnitsFromList(allObjects);
}