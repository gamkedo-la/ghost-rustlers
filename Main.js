var canvas, canvasContext;
var mousePos;

var character1 = new characterClass();
var character2 = new characterClass();
character1.activateCharacter();
character2.deactivateCharacter();

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
}

function moveEverything() {
  character1.characterMove();
  character2.characterMove();
}

function drawEverything() {
  drawBackground();
  drawBricks();
  character1.drawCharacter();
  character2.drawCharacter();
  drawUI();
  colorLine(mousePos.x, mousePos.y, Math.floor(character1.characterX), Math.floor(character1.characterY), 'red');
  colorLine(mousePos.x, mousePos.y, Math.floor(character2.characterX), Math.floor(character2.characterY), 'green');
}