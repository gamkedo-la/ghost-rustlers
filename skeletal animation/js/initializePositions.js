//This script takes the character images and initiliazes their positions on screen. 

const ARM_SEGMENT_LENGTH = 50;
const LEG_SEGMENT_LENGTH = 35;
const TORSO_LENGTH = 75;


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
var positions = new Array();
var positionsIndex = 0;
var animationIndex = 0;



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
	
}

function initializeBoneAngles(){
	torso.limbAngle = -Math.PI/2;
	head.limbAngle = -Math.PI/2
	rightUpperArm.limbAngle = 0;
	leftUpperArm.limbAngle = Math.PI*0.9;	
}

function boneImages(){
	torso.limbImage = newCharacterTorso;
	rightUpperArm.limbImage = newCharacterUpperArm;
	rightForeArm.limbImage = newCharacterForeArm;
	leftUpperArm.limbImage = newCharacterUpperArm;
	leftForeArm.limbImage = newCharacterForeArm;	
	head.limbImage = newCharacterhead;	
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

function StorePositions(){
	//positions[positionsIndex] = new Array(leftForeArmLimbAngle, leftUpperArmLimbAngle);
	var limbAngles = new Array();
	
	for(i=0; i < bones.length; i++){
		limbAngles.push(bones[i].limbAngle);
	}
	
	positions[positionsIndex] = limbAngles;	
		
	console.log(positions);
	
	positionsIndex +=1;
		
	console.log("positionsIndex is " + positionsIndex);	
}

function SetStickFigureToStoredPositions(){	
			for(i = 0; i < bones.length; i++){
			bones[i].setBoneAngle(positions[animationIndex] [i]);
			}	
}
	








