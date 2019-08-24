//Stick figure 

const ARM_SEGMENT_LENGTH = 50;
const LEG_SEGMENT_LENGTH = 35;
const TORSO_LENGTH = 75;
/*
var bottomOfTorso = {
  x: 0,
  y: 0
};
var topOfTorso = {
  x: 0,
  y: 0
};
var armsConnectionToTorso = {
  x: 0,
  y: 0
};
var rightElbow = {
  x: 0,
  y: 0
};
var leftElbow = {
  x: 0,
  y: 0
};
var leftHand = {
  x: 0,
  y: 0
};
var rightHand = {
  x: 0,
  y: 0
};
var leftKnee = {
  x: 0,
  y: 0
};
var leftFoot = {
  x: 0,
  y: 0
};
var rightKnee = {
  x: 0,
  y: 0
};
var rightFoot = {
  x: 0,
  y: 0
};

var centerOfHead = {
	x:0,
	y:0
}

var rightUpperArm = {
	x:0,
	y:0
}

var lowerArm = {
	x:0,
	y:0
}

var shoulderAngle = 0;
var elbowAngle = 0.7;
var combinedArmAngle = 0;

var lineWidth;
*/


//Image files
var stickManFullImage = document.createElement("img");
var stickManFullImageLoaded = false;

var stickhead = document.createElement("img");
var stickheadLoaded = false;
var stickUpperArm = document.createElement("img");
var stickUpperArmLoaded = false;
var stickForeArm = document.createElement("img");
var stickForeArmLoaded = false;
var stickTorso = document.createElement("img");
var stickTorsoLoaded = false;

var torso = new boneClass();
var rightUpperArm = new boneClass();
var rightForeArm = new boneClass();
var leftUpperArm = new boneClass();
var leftForeArm = new boneClass();
var head = new boneClass();
var leftUpperLeg = new boneClass();
var leftLowerLeg = new boneClass();
var rightUpperLeg = new boneClass();
var rightLowerLeg = new boneClass();



var bones = new Array(torso, rightUpperArm, rightForeArm, head,
						leftUpperArm, leftForeArm,
						leftUpperLeg, leftLowerLeg, rightUpperLeg, rightLowerLeg);


//Experimenting with stick man relative distances

function boneChildren(){
	leftForeArm.childOfOtherBone = true;
	//leftForeArm.parentBone = leftUpperArm;
	
}

function initializeBonePositions(){
	torso.startPosition.x = 200;
	torso.startPosition.y = 200;
	torso.limbAngle = -Math.PI/2;
	torso.limbLength = 50;
	
	head.startPosition.x = torso.endPosition.x;
	head.startPosition.y = torso.endPosition.y - 5;
	head.limbAngle = -Math.PI/2
	head.limbLength = 10;
	
	rightUpperArm.startPosition.x = torso.startPosition.x;
	rightUpperArm.startPosition.y = torso.startPosition.y -35;
	rightUpperArm.limbLength = 50;
	rightUpperArm.limbAngle = 0;
	
	rightForeArm.startPosition.x = rightUpperArm.endPosition.x;
	rightForeArm.startPosition.y = rightUpperArm.endPosition.y;
	rightForeArm.limbLength = 50;
	
	leftUpperArm.startPosition.x = torso.startPosition.x;
	leftUpperArm.startPosition.y = torso.startPosition.y -35;
	leftUpperArm.limbLength = 50;
	leftUpperArm.limbAngle = Math.PI*0.9;
	
	
	leftForeArm.startPosition.x = leftUpperArm.endPosition.x;
	leftForeArm.startPosition.y = leftUpperArm.endPosition.y;
	leftForeArm.limbLength = 50;
	leftForeArm.limbAngle = Math.PI*0.1;
	leftForeArm.parentBoneLimbAngle = leftUpperArm.limbAngle;
	
	leftUpperLeg.startPosition.x = torso.startPosition.x;
	leftUpperLeg.startPosition.y = torso.startPosition.y;
	leftUpperLeg.limbLength = 50;
	leftUpperLeg.limbAngle = Math.PI * 0.7;
	
	leftLowerLeg.startPosition.x = leftUpperLeg.endPosition.x;
	leftLowerLeg.startPosition.y = leftUpperLeg.endPosition.y;
	leftLowerLeg.limbLength = 50;
	leftLowerLeg.limbAngle = Math.PI/2;
	
	rightUpperLeg.startPosition.x = torso.startPosition.x;
	rightUpperLeg.startPosition.y = torso.startPosition.y;
	rightUpperLeg.limbLength = 50;
	rightUpperLeg.limbAngle = Math.PI * 0.3;
	
	rightLowerLeg.startPosition.x = rightUpperLeg.endPosition.x;
	rightLowerLeg.startPosition.y = rightUpperLeg.endPosition.y;
	rightLowerLeg.limbLength = 50;
	rightLowerLeg.limbAngle = Math.PI/2;
}

function boneImages(){
	torso.limbImage = stickUpperArm;
	rightUpperArm.limbImage = stickUpperArm;
	rightForeArm.limbImage = stickUpperArm;
	leftUpperArm.limbImage = stickUpperArm;
	leftForeArm.limbImage = stickUpperArm;	
	head.limbImage = stickhead;
	leftUpperLeg.limbImage = stickUpperArm;
	leftLowerLeg.limbImage = stickUpperArm;
	rightUpperLeg.limbImage = stickUpperArm;
	rightLowerLeg.limbImage = stickUpperArm;
}

function drawBones(){
	boneChildren();
	initializeBonePositions();
	boneImages();
	for(i = 0; i < bones.length; i++){
		bones[i].drawBone();
	}
	//console.log(leftForeArm.parentBoneLimbAngle);	
	//console.log(leftForeArm.combinedLimbAngle);
}
	

/*function drawStickManRelativeToBottomOfTorso(){
	//I used this to work out the kinks.  Delete once bone class is working. 
	
	armsConnectionToTorso.x = bottomOfTorso.x;
	armsConnectionToTorso.y = bottomOfTorso.y - TORSO_LENGTH*.75;
	
	rightElbow.x = (ARM_SEGMENT_LENGTH * Math.cos(shoulderAngle) + armsConnectionToTorso.x);
	rightElbow.y = (ARM_SEGMENT_LENGTH * Math.sin(shoulderAngle) + armsConnectionToTorso.y);	
		
	rightUpperArm.x = armsConnectionToTorso.x + ((rightElbow.x - armsConnectionToTorso.x)/2);
	rightUpperArm.y = armsConnectionToTorso.y + ((rightElbow.y - armsConnectionToTorso.y)/2);
	
	combinedArmAngle = shoulderAngle + elbowAngle;
	rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(combinedArmAngle) + rightElbow.x;
	rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(combinedArmAngle) + rightElbow.y;
	
	lowerArm.x = rightElbow.x +((rightHand.x - rightElbow.x)/2);
	lowerArm.y = rightElbow.y +((rightHand.y - rightElbow.y)/2);

	topOfTorso.x = bottomOfTorso.x;
	topOfTorso.y = bottomOfTorso.y - TORSO_LENGTH;
	
	centerOfHead.x = bottomOfTorso.x;
	centerOfHead.y = bottomOfTorso.y - TORSO_LENGTH;
	
	
	
	
	drawImageCenteredAtLocationWithRotation(stickTorso, topOfTorso.x, (topOfTorso.y + TORSO_LENGTH/2), 0);
	drawImageCenteredAtLocationWithRotation(stickhead, centerOfHead.x, centerOfHead.y, 0);
	drawImageCenteredAtLocationWithRotation(stickrightUpperArm, rightUpperArm.x, rightUpperArm.y, shoulderAngle);
	drawImageCenteredAtLocationWithRotation(stickrightUpperArm, lowerArm.x, lowerArm.y, combinedArmAngle);
	
	colorCircle(rightElbow.x, rightElbow.y, 5, 'green');
	colorCircle(rightHand.x, rightHand.y, 5, 'green');	
}*/

function moveElbow(){
	var targetShoulderAngle = 0;
	
	targetShoulderAngle = Math.atan2(mousePos.y - armsConnectionToTorso.y, mousePos.x - armsConnectionToTorso.x);
	
	shoulderAngle = targetShoulderAngle;
}

function moveHand(){
	var targetElbowAngle = 0;
	
	targetElbowAngle = targetShoulderAngle = Math.atan2(mousePos.y - rightElbow.y, mousePos.x - rightElbow.x);
	
	elbowAngle = targetShoulderAngle;
}

function drawStickFigureUsingBones(){
	
	
}




