//This file serves as the base for the User to import images for use in their animation.
//It will be a place to put in the image paths. 

//Image files

var newCharacterhead = document.createElement("img");
var newCharacterheadLoaded = false;
var newCharacterUpperArm = document.createElement("img");
var newCharacterUpperArmLoaded = false;
var newCharacterForeArm = document.createElement("img");
var newCharacterForeArmLoaded = false;
var newCharacterTorso = document.createElement("img");
var newCharacterTorsoLoaded = false;


function loadCharacterImages(){	

	newCharacterhead.onload = function(){
		newCharacterheadLoaded = true;
	}
	newCharacterhead.src = "images/stickhead.png"; //image file path here
	
	newCharacterTorso.onload = function(){
		newCharacterTorsoLoaded = true;
	}
	newCharacterTorso.src = "images/cowboyTorso.png"; //image file path here
	
	newCharacterUpperArm.onload = function(){
		newCharacterUpperArmLoaded = true;
	}
	newCharacterUpperArm.src = "images/cowboyUpperArm.png"; //image file path here	
	
	newCharacterForeArm.onload = function(){
		newCharacterForeArmLoaded = true;
	}
	newCharacterForeArm.src = "images/cowboyForeArm.png"; //image file path here
}

