var canvas, canvasContext;
var mousePos;

var character1 = new characterClass('PLAYER_TEAM', 'red');
var character2 = new characterClass('PLAYER_TEAM', 'green');
var enemy1 = new characterClass('PLAYER_ENEMY', 'white');
character1.activateCharacter();
character2.deactivateCharacter();

var turnCount = 1;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  initInput();

  canvas.addEventListener('mousemove', function (evt) {
    mousePos = calculateMousePos(evt);
  });

  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 60;
  setInterval(function () {
    
    if (hold_Q_Key) {
      character1.activateCharacter();
      character2.deactivateCharacter();
    }
    
    if (hold_W_Key) {
      character1.deactivateCharacter();
      character2.activateCharacter();
    }

    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  character1.characterReset();
  character2.characterReset();
  enemy1.characterReset();
}

function moveEverything() {
  character1.characterMove();
  character2.characterMove();
  enemy1.characterMove();
}

function drawEverything() {
  drawBackground();
  drawBricks();
  character1.drawCharacter();
  character2.drawCharacter();
  enemy1.drawCharacter();
  drawUI();

  if (character1.isActive){
    colorLine(mousePos.x, mousePos.y, Math.floor(character1.characterX), Math.floor(character1.characterY), 'red');
  }
  if (character2.isActive){
    colorLine(mousePos.x, mousePos.y, Math.floor(character2.characterX), Math.floor(character2.characterY), 'green');
  }

}

function endTurn(){
  turnCount++
  character1.actionsRemaining = ACTIONS_PER_TURN;
  character2.actionsRemaining = ACTIONS_PER_TURN;
  enemy1.actionsRemaining = ACTIONS_PER_TURN;
  character1.deactivateCharacter();
  character2.deactivateCharacter();
  enemy1.activateCharacter();
  enemy1.setCharacterDestination();
}