const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_Q = 81;
const KEY_W = 87;
const KEY_E = 69;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
var holdLeft = false;
var holdRight = false;
var hold_Space_Key = false;
var hold_E_Key = false;
var hold_Q_Key = false;
var hold_W_Key = false;
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
  if (thisKey == KEY_Q) {
    hold_Q_Key = setTo;
  }
  if (thisKey == KEY_W) {
    hold_W_Key = setTo;
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
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {

  if (evt.keyCode == KEY_SPACE) {
    endTurn();
  } else if (evt.keyCode == KEY_E) {
    character1.setCharacterDestination();
    character2.setCharacterDestination();
  } else {
    setKeyHoldState(evt.keyCode, false);
  }

}