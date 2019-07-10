const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_E = 69;
var holdLeft = false;
var holdRight = false;
var hold_E_Key = false;

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
}

function setKeyHoldState(thisKey, setTo) {
  if (thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if (thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
  }
  if (thisKey == KEY_E) {
    hold_E_Key = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}