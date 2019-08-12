// all art assets are loaded here

var characterBodyRightPic = document.createElement("img");
var characterBodyRightPicLoaded = false;
var characterBodyLeftPic = document.createElement("img");
var characterBodyLeftPicLoaded = false;
var characterUpperArmPic = document.createElement("img");
var characterUpperArmPicLoaded = false;
var characterLowerArmPic = document.createElement("img");
var characterLowerArmPicLoaded = false;
var wallPic = document.createElement("img");
var wallPicLoaded = false;
var targetAimerPic = document.createElement("img");
var targetAimerPicLoaded = false;
var moveAimerPic = document.createElement("img");
var moveAimerPicLoaded = false;

function initArt() {

  characterBodyRightPic.onload = function () { characterBodyRightPicLoaded = true; }
  characterBodyRightPic.src = "images/characterBodyPlaceHolderRight.png";
    
  characterBodyLeftPic.onload = function () { characterBodyLeftPicLoaded = true; }
  characterBodyLeftPic.src = "images/characterBodyPlaceHolderLeft.png";
   
  characterUpperArmPic.onload = function () { characterUpperArmPicLoaded = true; }
  characterUpperArmPic.src = "images/characterUpperArmPlaceHolder.png";
    
  characterLowerArmPic.onload = function () { characterLowerArmPicLoaded = true; }
  characterLowerArmPic.src = "images/characterLowerArmPlaceHolder.png";

  wallPic.onload = function () { wallPicLoaded = true; }
  wallPic.src = "images/wall.png";

  targetAimerPic.onload = function () { targetAimerPicLoaded = true; }
  targetAimerPic.src = "images/targetAimer.png";

  moveAimerPic.onload = function () { moveAimerPicLoaded = true; }
  moveAimerPic.src = "images/moveAimer.png";


}

