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


//TODO: Create multidimensional array.  The main array with hold arrays of positions.  This will allow us to loop through 
//positions to create animation. 

//TODO: Expand and relocate to where this should execute.
var animation = new Array(
new Array(torso.endPosition, head.endPosition),
);

function boneChildren(){
	leftForeArm.childOfOtherBone = true;
	rightForeArm.childOfOtherBone = true;
	head.childOfOtherBone = true;
	leftLowerLeg.childOfOtherBone = true;
	rightLowerLeg.childOfOtherBone = true;
	leftUpperArm.childOfOtherBone = true;
	rightUpperArm.childOfOtherBone = true;
	
	//leftForeArm.parentBone = leftUpperArm;
	
}

function initializeBonePositions(){
	//TODO  Change equation for upper arms and upper leg positions relative to torso.  Currently if the torso changes angle the arms detach. 
	//Follow the relative postion of the torso endposition and angle 
	torso.startPosition.x = 200;	
	torso.startPosition.y = 350;
	torso.limbLength = 50;	
	
	head.startPosition.x = torso.endPosition.x;
	head.startPosition.y = torso.endPosition.y - 5;	
	head.limbLength = 10;
	head.parentBoneLimbAngle = torso.limbAngle;
	
	rightUpperArm.startPosition.x = torso.endPosition.x;
	rightUpperArm.startPosition.y = torso.endPosition.y;
	rightUpperArm.limbLength = 50;	
	rightUpperArm.positionAlongParentBone = 1;
	rightUpperArm.parentBoneLimbAngle = torso.limbAngle;
	
	rightForeArm.startPosition.x = rightUpperArm.endPosition.x;
	rightForeArm.startPosition.y = rightUpperArm.endPosition.y;
	rightForeArm.limbLength = 50;
	rightForeArm.parentBoneLimbAngle = rightUpperArm.limbAngle;
	
	leftUpperArm.startPosition.x = torso.endPosition.x;
	leftUpperArm.startPosition.y = torso.endPosition.y;
	leftUpperArm.limbLength = 50;	
	leftUpperArm.positionAlongParentBone = 1;
	leftUpperArm.parentBoneLimbAngle = torso.limbAngle;
	
	leftForeArm.startPosition.x = leftUpperArm.endPosition.x;
	leftForeArm.startPosition.y = leftUpperArm.endPosition.y;
	leftForeArm.limbLength = 50;	
	leftForeArm.parentBoneLimbAngle = leftUpperArm.limbAngle;	
	
	leftUpperLeg.startPosition.x = torso.startPosition.x;
	leftUpperLeg.startPosition.y = torso.startPosition.y;
	leftUpperLeg.limbLength = 50;	
	
	leftLowerLeg.startPosition.x = leftUpperLeg.endPosition.x;
	leftLowerLeg.startPosition.y = leftUpperLeg.endPosition.y;
	leftLowerLeg.limbLength = 50;
	leftLowerLeg.parentBoneLimbAngle = leftUpperLeg.limbAngle;
	
	rightUpperLeg.startPosition.x = torso.startPosition.x;
	rightUpperLeg.startPosition.y = torso.startPosition.y;
	rightUpperLeg.limbLength = 50;	
	
	rightLowerLeg.startPosition.x = rightUpperLeg.endPosition.x;
	rightLowerLeg.startPosition.y = rightUpperLeg.endPosition.y;
	rightLowerLeg.limbLength = 50;
	rightLowerLeg.parentBoneLimbAngle = rightUpperLeg.limbAngle;
}

function initializeBoneAngles(){
	torso.limbAngle = -Math.PI/2;
	head.limbAngle = -Math.PI/2
	rightUpperArm.limbAngle = 0;
	leftUpperArm.limbAngle = Math.PI*0.9;
	leftUpperLeg.limbAngle = Math.PI * 0.7;
	rightUpperLeg.limbAngle = Math.PI * 0.3;
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
	//if button pressed add positions to array;
	//console.log(leftForeArm.parentBoneLimbAngle);	
	//console.log(leftForeArm.combinedLimbAngle);
}
	








