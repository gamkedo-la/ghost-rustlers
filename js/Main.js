var canvas, canvasContext;
var mousePos;
var isAiming = false;
var debugMode = false;
var characterBodyRightPic = document.createElement("img");
var characterBodyRightPicLoaded = false;
var characterBodyLeftPic = document.createElement("img");
var characterBodyLeftPicLoaded = false;
var characterUpperArmPic = document.createElement("img");
var characterUpperArmPicLoaded = false;
var characterLowerArmPic = document.createElement("img");
var characterLowerArmPicLoaded = false;
var bulletT = 1.0; //might migrate to character
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;

var allCharacters = [];

var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
//var enemy1 = new characterClass('PLAYER_ENEMY', 'white');
character1.activateCharacter();
character2.deactivateCharacter();

var turnCount = 1;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  characterBodyRightPic.onload = function () {
    characterBodyRightPicLoaded = true;
  }
  characterBodyRightPic.src = "characterBodyPlaceHolderRight.png";

  characterBodyLeftPic.onload = function () {
    characterBodyLeftPicLoaded = true;
  }
  characterBodyLeftPic.src = "characterBodyPlaceHolderLeft.png";

  characterUpperArmPic.onload = function () {
    characterUpperArmPicLoaded = true;
  }
  characterUpperArmPic.src = "characterUpperArmPlaceHolder.png";

  characterLowerArmPic.onload = function () {
    characterLowerArmPicLoaded = true;
  }
  characterLowerArmPic.src = "characterLowerArmPlaceHolder.png";


  initInput();

  canvas.addEventListener('mousemove', function (evt) {
    mousePos = calculateMousePos(evt);
  });

  // these next few lines set up our game logic and render to happen 30 times per second
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

  character1.characterSpawn();
  character2.characterSpawn();
  //enemy1.characterSpawn();

}

function moveEverything() {
  character1.characterMove();
  character2.characterMove();
  //enemy1.characterMove();
}

function drawEverything() {
  drawBackground();
  drawBricks();
  character1.drawCharacter();
  character2.drawCharacter();
  //enemy1.drawCharacter();
  drawUI();

  if (bulletT <= 1.0){
    var lineLength = DistanceBetweenPoints(aimFromX, aimFromY, aimToX, aimToY);
    bulletT += 5/lineLength;
  } else {

  //draw lines to active character for debugging
  aimToX = mousePos.x;
  aimToY = mousePos.y;
  }
  var aimColor = 'yellow';

  if (character1.isActive) {
    aimFromX = Math.floor(character1.rightShoulderJoint.x);
    aimFromY = Math.floor(character1.rightShoulderJoint.y);
    aimColor = 'red';
  }
  if (character2.isActive) {
    aimFromX = Math.floor(character2.rightShoulderJoint.x);
    aimFromY = Math.floor(character2.rightShoulderJoint.y);
    aimColor = 'green';
  }
  colorLine(aimFromX, aimFromY, aimToX, aimToY, aimColor);
  if (bulletT < 1) {
    drawBulletOnLine(aimFromX, aimFromY, aimToX, aimToY, bulletT);
  }
}

function drawBulletOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  // for some startX, startY, endX, endY:
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;

  colorCircle(positionNowX, positionNowY, 5, 'white')
}

function endTurn() {
  turnCount++

  character1.characterReset();
  character2.characterReset();
  //enemy1.characterReset();

  enemyTurn();
}

function enemyTurn() {
  //enemy1.activateCharacter();
  //enemy1.setCharacterDestination();
}