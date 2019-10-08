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
	
	for(i = 0; i < bones.length; i++){
		
		bones[i].initialPosition.x = 100*(i+1);
		bones[i].initialPosition.y = 200;
		bones[i].startPosition.x = bones[i].initialPosition.x;
		bones[i].startPosition.y = bones[i].initialPosition.y;
	}	
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
	boneImages();
	for(i = 0; i < bones.length; i++){
		if(bones[i].limbLength == null){
			bones[i].limbLength = 0;
		}
		bones[i].drawBone();
	}
}




	








