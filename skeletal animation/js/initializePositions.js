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

var bones = new Array(torso, rightUpperArm, rightForeArm, head,
						leftUpperArm, leftForeArm);

//TODO: Expand and relocate to where this should execute.
var positions = new Array();
var positionsIndex = 0;
var animationIndex = 0;


function boneChildren(){
	leftForeArm.childOfOtherBone = false;
	rightForeArm.childOfOtherBone = false;
	head.childOfOtherBone = false;	
	leftUpperArm.childOfOtherBone = false;
	rightUpperArm.childOfOtherBone = false;
	
	//leftForeArm.parentBone = leftUpperArm;
	
}

function initializeBonePositions(){
	//TODO  Change equation for upper arms and upper leg positions relative to torso.  Currently if the torso changes angle the arms detach. 
	//Follow the relative postion of the torso endposition and angle 
	torso.startPosition.x = 100;	
	torso.startPosition.y = 100;
	
	
	head.startPosition.x = 200;
	head.startPosition.y = 100;
	
	
	rightUpperArm.startPosition.x = 300;
	rightUpperArm.startPosition.y = 100;
	
	
	rightForeArm.startPosition.x = 400;
	rightForeArm.startPosition.y = 100;
	
	
	leftUpperArm.startPosition.x = 500;
	leftUpperArm.startPosition.y = 100;
	
	leftForeArm.startPosition.x = 600;
	leftForeArm.startPosition.y = 100;
		
	
}

function initializeBoneAngles(){
	torso.limbAngle = 0;
	head.limbAngle = 0;
	rightUpperArm.limbAngle = 0;
	leftUpperArm.limbAngle = 0;	
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
	//boneChildren();
	//initializeBonePositions();
	boneImages();
	for(i = 0; i < bones.length; i++){
		if(bones[i].limbLength == null){
			bones[i].limbLength = 0;
		}
		bones[i].drawBone();
	}
	//if button pressed add positions to array;
	//console.log(leftForeArm.parentBoneLimbAngle);	
	//console.log(leftForeArm.combinedLimbAngle);
}

function drawBoneMenu(){
	for(i = 0; i < bones.length; i++){
		//canvasContext.strokeText(bones.indexOf(bones[i]), 100, (100 +(20*i)));
		
	}
	
	//canvasContext.strokeText(mousePos.x.toString() + "," + mousePos.y.toString(), mousePos.x, mousePos.y);
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
	








