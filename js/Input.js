const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_E = 69;
const KEY_TILDE = 192;
var holdLeft = false;
var holdRight = false;
var hold_Space_Key = false;
var hold_E_Key = false;
var hold_1_Key = false;
var hold_2_Key = false;
var hold_3_Key = false;
var hold_4_Key = false;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(),
    root = document.documentElement;
  //	account	for	the	margins,	canvas	position	on	page,	scroll	amount,	etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  document.addEventListener('mouseup', mouseReleased);
}

function setKeyHoldState(thisKey, setTo) {
  if (thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if (thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
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
      isAiming = !isAiming;
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

  if (evt.keyCode == KEY_SPACE) {
    endTurn();
  } else {
    setKeyHoldState(evt.keyCode, false);
  }

}

function mouseReleased(evt) {

  character1.handleClick();
  character2.handleClick();
}