const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_E = 69;
const KEY_P = 80;
const KEY_TILDE = 192;
var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;
var hold_Space_Key = false;
var hold_E_Key = false;
var hold_1_Key = false;
var hold_2_Key = false;
var hold_3_Key = false;
var hold_4_Key = false;

var mousePos = {
  x: 0,
  y: 0
};

function initInput() {
  initMouse();
  initKeys();
}

function initMouse() {
  document.addEventListener('mouseup', mouseReleased);
  canvas.addEventListener('mousemove', function (evt) {
    mousePos = calculateMousePos(evt);
  });
}

function initKeys() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(),
      root = document.documentElement;
  //	account	for	the	margins,	canvas	position	on	page,	scroll	amount,	etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  moveAimer();
  
  return {
    x: mouseX,
    y: mouseY
  };
}

function setKeyHoldState(thisKey, setTo) {
  if (thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if (thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
  }
  if(thisKey == KEY_UP_ARROW) {
    holdUp = setTo;
  }
  if(thisKey == KEY_DOWN_ARROW) {
    holdDown = setTo;
  }
  if (thisKey == KEY_1) {
    hold_1_Key = setTo;
  }
  if (thisKey == KEY_2) {
    hold_2_Key = setTo;
  }
  if (thisKey == KEY_3) {
    hold_3_Key = setTo;
  }
  if (thisKey == KEY_4) {
    hold_4_Key = setTo;
  }
  if (thisKey == KEY_E) {
    if (setTo){
      isInAimMode = !isInAimMode;
    }
  }
  if (thisKey == KEY_P) {
      if (setTo) {
        isPaused = !isPaused;
       console.log ("P pressed");
      }
  }
  if (thisKey == KEY_TILDE) {
    if (setTo){
      debugMode = !debugMode;
    }
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {

  if (evt.keyCode == KEY_SPACE && character1.actionsRemaining == 0 && character2.actionsRemaining == 0) {
    endPlayerTurn();
	if(evt.keyCode == KEY_SPACE && gameOver){
		resetGame()
	}
  } else {
    setKeyHoldState(evt.keyCode, false);
  }

}

function mouseReleased(evt) {
  if(gameState == STATE_GAME){
	character1.handleClick();
	character2.handleClick();
  }
  else if(gameState == STATE_TITLE_SCREEN) {
    titleScreenMouseClick(mousePos.x, mousePos.y);
  }
}