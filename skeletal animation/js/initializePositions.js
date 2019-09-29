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

var hideIcons = false;
var hideIconsButtonPosition = {
	x:700,
	y:10
}


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

function drawBoneMenu(){
	for(i = 0; i < bones.length; i++){
		bones[i].resetButtonPosition.x = bones[i].initialPosition.x;
		bones[i].resetButtonPosition.y = bones[i].initialPosition.y + 50;
		drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, bones[i].resetButtonPosition.x, bones[i].resetButtonPosition.y, 0);
		canvasContext.strokeText("Reset Bone", bones[i].resetButtonPosition.x + 10, bones[i].resetButtonPosition.y+3);

		bones[i].setParentButtonPosition.x = bones[i].initialPosition.x;
		bones[i].setParentButtonPosition.y = bones[i].initialPosition.y + 70;
		drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, bones[i].setParentButtonPosition.x, bones[i].setParentButtonPosition.y, 0);
		canvasContext.strokeText("Set Parent", bones[i].setParentButtonPosition.x + 10, bones[i].setParentButtonPosition.y+3);			
	}
	
	canvasContext.strokeText("1. Select white square on image to begin mapping bone to sprite.", 100, 60);
	canvasContext.strokeText("2. Click desired beginning of bone.", 100, 80);
	canvasContext.strokeText("3. Click desired end of bone", 100, 100);
	canvasContext.strokeText("4. Once bone is created Blue icon to move sprite and Red icon to change angle", 100, 120);
	
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, hideIconsButtonPosition.x,hideIconsButtonPosition.y, 0);
	canvasContext.strokeText("Hide Icons" , hideIconsButtonPosition.x + 10, hideIconsButtonPosition.y +3);

}


	








