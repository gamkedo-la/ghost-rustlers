var canvas, canvasContext;

// experimental
const FULLSCREEN_CANVAS = true; // resize canvas to fill entire browser?

//Game States
const STATE_GAME = 0;
const STATE_TITLE_SCREEN = 1;
const STATE_PAUSED = 2;
const STATE_DEBUGMODE = 3;
const STATE_WIN_SCREEN = 4;
const STATE_LOSE_SCREEN = 5;
var gameState = STATE_TITLE_SCREEN;

var currentLevel = 1;
var isPaused = false;
var debugMode = false;
var allCharacters = [];
var allPlayerCharacters = [];
var allEnemyCharacters = [];
var allObjects = [];
var crates = [];
var barrels = [];
//var character1;
//var character2;
//var enemy1;
//var crate1;
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

    if (gameState == STATE_TITLE_SCREEN) {
      drawTitleScreen();
    } else if (gameState == STATE_WIN_SCREEN) {
      drawWinScreen();
    } else if (gameState == STATE_LOSE_SCREEN) {
      drawLoseScreen();
    } else if (gameState == STATE_GAME) {

      moveEverything();
      drawEverything();
    }

  }, 1000 / framesPerSecond);
}

function resize_canvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log("canvas size: " + canvas.width + "x" + canvas.height);
}

window.onload = function () {

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  if (FULLSCREEN_CANVAS) {
    resize_canvas();
    window.addEventListener('resize', resize_canvas);
  }

  initArt();
  initInput();
  initNavGraph();

  loadLevel(currentLevel);

  character1.activateCharacter();
  character2.deactivateCharacter();
}

function loadLevel(levelToLoad) {
  if (levelToLoad == 1) {
    currentLevel = 1

    allCharacters = [];
    allPlayerCharacters = [];
    allEnemyCharacters = [];
    allObjects = [];

    character1 = new characterClass('PLAYER_TEAM', 'red');
    character2 = new characterClass('PLAYER_TEAM', 'green');
    enemy1 = new enemyClass('ENEMY_TEAM', 'white');
    //crate1 = new destructableObjectClass('CRATE');

    character1.objectSpawn(5, 6);
    character2.objectSpawn(7, 6);
    enemy1.objectSpawn(15, 6);
    //crate1.objectSpawn(11, 3);
	
	for(i = 0; i < allCharacters.length; i++){
		allCharacters[i].setCharacterSprites();
	}

    character1.activateCharacter();

    //TODO: snap camera back to starting position.
  }
}

function updateState(newState) {
  gameState = newState;
  resetGame();
}

function moveEverything() {

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
  checkForEndGame();
}

function drawEverything() {

  background.draw(-camPanX / 4, -camPanY / 8);

  canvasContext.save();
  canvasContext.translate(-camPanX, -camPanY);

  drawGroundBlocks();
  spawnCrates();
  spawnBarrels();

  for (i = 0; i < allPlayerCharacters.length; i++) {
    allPlayerCharacters[i].drawCharacter();
  }
  for (i = 0; i < allEnemyCharacters.length; i++) {
    allEnemyCharacters[i].drawCharacter();
  }
  for (i = 0; i < allObjects.length; i++) {
    allObjects[i].drawObject();
  }

  //crate1.drawObject();

  if (debugMode) {
    console.log(enemy1.x + " " + enemy1.y);
    console.log(enemy1.bodyRightPic.width + " " + enemy1.bodyRightPic.height);
  }

  //TODO: This should be moved somewhere else.
  if (playersTurn) {
    for (i = 0; i < allPlayerCharacters.length; i++) {
      allPlayerCharacters[i].characterAction();
    }
  } else {
    for (i = 0; i < allEnemyCharacters.length; i++) {
      allEnemyCharacters[i].characterAction();
    }
  }

  drawAimer();

  canvasContext.restore(); // undoes the .translate() used for cam scroll

  drawUI();
}

function endPlayerTurn() {
  turnCount++;
  playersTurn = false;

  for (i = 0; i < allPlayerCharacters.length; i++) {
    allPlayerCharacters[i].characterReset();
  }

  enemyTurn();
}

function enemyTurn() {

  for (i = 0; i < allEnemyCharacters.length; i++) {
    allEnemyCharacters[i].characterReset();
  }

  enemy1.activateCharacter();
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
  allCharacters = [];
  loadLevel(currentLevel);
  playersTurn = true;
  turnCount = 1;
  gameOver = false;
}

function checkForEndGame() {
  if (allPlayerCharacters.length <= 0) {
    updateState(STATE_LOSE_SCREEN);
  } else if (allEnemyCharacters.length <= 0) {
    updateState(STATE_WIN_SCREEN);
  }
}

function removeDeadUnitsFromList(fromArray) {
  for (var i = fromArray.length - 1; i >= 0; i--) {
    if (fromArray[i].isDead) {
      fromArray.splice(i, 1);
    }
  }
}

function removeDeadUnits() {
  removeDeadUnitsFromList(allCharacters);
  removeDeadUnitsFromList(allEnemyCharacters);
  removeDeadUnitsFromList(allPlayerCharacters);
  removeDeadUnitsFromList(allObjects);
  removeDeadUnitsFromList(crates);
}