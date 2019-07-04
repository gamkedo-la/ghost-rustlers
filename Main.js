const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;

var canvas, canvasContext;
var mousePos;
  
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
    
  initInput();

  canvas.addEventListener('mousemove', function(evt) {
    mousePos = calculateMousePos(evt);
  }	);
 
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
      
  jumperReset();
}

function moveEverything() {
  jumperMove();
}
  
function drawEverything() {
  drawBackground();
  drawBricks();
  drawJumper();
  drawUI();
}