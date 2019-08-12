var canvas, canvasContext;
var mousePos = {x:0,y:0};
var isAiming = false;
var debugMode = false;
var bulletT = 1.0; //might migrate to character
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;
var allCharacters = [];
var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
character1.activateCharacter();
character2.deactivateCharacter();
var turnCount = 1;

function initMouse() {
    canvas.addEventListener('mousemove', function (evt) {
        mousePos = calculateMousePos(evt);
      });
}

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
  initMouse();
  initRenderLoop();

  character1.characterSpawn();
  character2.characterSpawn();

}

function moveEverything() {
  character1.characterMove();
  character2.characterMove();
}

function drawEverything() {
  drawBackground();
  drawGroundBlocks();
  character1.drawCharacter();
  character2.drawCharacter();
  drawUI();

  if (bulletT <= 1.0){
    var lineLength = DistanceBetweenPoints(aimFromX, aimFromY, aimToX, aimToY);
    bulletT += 30/lineLength;
  } else {

  //draw lines to active character for debugging
  aimToX = mousePos.x;
  aimToY = mousePos.y;
  }
  var aimColor = 'yellow';

  if (character1.isActive) {
    aimFromX = Math.floor(character1.rightHand.x);
    aimFromY = Math.floor(character1.rightHand.y);
    aimColor = 'red';
  }
  if (character2.isActive) {
    aimFromX = Math.floor(character2.rightHand.x);
    aimFromY = Math.floor(character2.rightHand.y);
    aimColor = 'green';
  }
  //colorLine(aimFromX, aimFromY, aimToX, aimToY, aimColor);
  if (bulletT < 1) {
    drawBulletOnLine(aimFromX, aimFromY, aimToX, aimToY, bulletT);
  }
}

function drawBulletOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;

  colorCircle(positionNowX, positionNowY, 5, 'white')
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

function endEnemyTurn(){
  character1.activateCharacter();
}