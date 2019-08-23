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

//var inActiveColor = "#88880088";
//var usedColor = "#000000AA";

var inActiveColor = "#00000000";
var usedColor = "#00000000";

var characterBodyRightPic_inActive;
var characterBodyLeftPic_inActive;
var characterUpperArmPic_inActive;
var characterLowerArmPic_inActive;

var characterBodyRightPic_used;
var characterBodyLeftPic_used;
var characterUpperArmPic_used;
var characterLowerArmPic_used;

function initArt() {

  characterBodyRightPic.onload = function () {
	  characterBodyRightPicLoaded = true;
	  characterBodyRightPic_inActive = createTintedSprite (characterBodyRightPic, inActiveColor);
	  characterBodyRightPic_used = createTintedSprite (characterBodyRightPic, usedColor);
	}
  characterBodyRightPic.src = "images/characterBodyPlaceHolderRight.png";
    
  characterBodyLeftPic.onload = function () {
	  characterBodyLeftPicLoaded = true;
	  characterBodyLeftPic_inActive = createTintedSprite (characterBodyLeftPic, inActiveColor);
	  characterBodyLeftPic_used = createTintedSprite (characterBodyLeftPic, usedColor);
	}
  characterBodyLeftPic.src = "images/characterBodyPlaceHolderLeft.png";
   
  characterUpperArmPic.onload = function () {
	  characterUpperArmPicLoaded = true;
	  characterUpperArmPic_inActive = createTintedSprite (characterUpperArmPic, inActiveColor);
	  characterUpperArmPic_used = createTintedSprite (characterUpperArmPic, usedColor);
	}
  characterUpperArmPic.src = "images/characterUpperArmPlaceHolder.png";
    
  characterLowerArmPic.onload = function () {
	  characterLowerArmPicLoaded = true;
	  characterLowerArmPic_inActive = createTintedSprite (characterLowerArmPic, inActiveColor);
	  characterLowerArmPic_used = createTintedSprite (characterLowerArmPic, usedColor);
	}
  characterLowerArmPic.src = "images/characterLowerArmPlaceHolder.png";

  wallPic.onload = function () {
	  wallPicLoaded = true;
	}
  wallPic.src = "images/wall.png";

  targetAimerPic.onload = function () {
	  targetAimerPicLoaded = true;
	}
  targetAimerPic.src = "images/targetAimer.png";

  moveAimerPic.onload = function () {
	  moveAimerPicLoaded = true;
	}
  moveAimerPic.src = "images/moveAimer.png";


}

