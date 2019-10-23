//Menu Script
//TODO: Relocate UI items to separate file
var hideIcons = false;
var hideIconsButtonPosition = {
	x:700,
	y:10
}
var saveKeyFrameButtonPosition = {
	x:650,
	y:500
}
var downloadAnimationButtonPosition = {
	x:650,
	y:520
}
var instructionTextPos = {
	x:250,
	y:20
}
var howToAnimateButtonPos = {
	x:50,
	y:20
}
var howToMakeBoneButtonPos = {
	x:50,
	y:40
}
var howToSetChildButtonPos = {
	x:50,
	y:60
}
var howToSetRootButtonPos = {
	x:50,
	y:80
}

var howToAnimate = false;
var howToMakeBone = false; 
var howToSetChild = false;
var howToSetRoot = false;


function drawBoneMenu(){
	for(i = 0; i < bones.length; i++){
		bones[i].resetButtonPosition.x = bones[i].initialPosition.x + 70;
		bones[i].resetButtonPosition.y = bones[i].initialPosition.y;
		drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, bones[i].resetButtonPosition.x, bones[i].resetButtonPosition.y, 0);
		canvasContext.strokeText("Reset Bone", bones[i].resetButtonPosition.x + 10, bones[i].resetButtonPosition.y+3);

		bones[i].setParentButtonPosition.x = bones[i].initialPosition.x+ 70;
		bones[i].setParentButtonPosition.y = bones[i].initialPosition.y+20;
		drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, bones[i].setParentButtonPosition.x, bones[i].setParentButtonPosition.y, 0);
		canvasContext.strokeText("Set Parent", bones[i].setParentButtonPosition.x + 10, bones[i].setParentButtonPosition.y+3);		

		bones[i].setRootButtonPosition.x = bones[i].initialPosition.x + 70;
		bones[i].setRootButtonPosition.y = bones[i].initialPosition.y+40;
		drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, bones[i].setRootButtonPosition.x, bones[i].setRootButtonPosition.y, 0);
		canvasContext.strokeText("Set as Root Bone", bones[i].setRootButtonPosition.x + 10, bones[i].setRootButtonPosition.y+3);		
	}
	//Instruction Icons
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, howToAnimateButtonPos.x,howToAnimateButtonPos.y, 0);
	canvasContext.strokeText("Making an animation" , howToAnimateButtonPos.x + 10, howToAnimateButtonPos.y +3);
	
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, howToMakeBoneButtonPos.x,howToMakeBoneButtonPos.y, 0);
	canvasContext.strokeText("Applying a Bone to Image" , howToMakeBoneButtonPos.x + 10, howToMakeBoneButtonPos.y +3);
	
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, howToSetChildButtonPos.x,howToSetChildButtonPos.y, 0);
	canvasContext.strokeText("Setting Bone as Child of another" , howToSetChildButtonPos.x + 10, howToSetChildButtonPos.y +3);
	
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, howToSetRootButtonPos.x,howToSetRootButtonPos.y, 0);
	canvasContext.strokeText("Setting Root Bone" , howToSetRootButtonPos.x + 10, howToSetRootButtonPos.y +3);
	
	if(howToAnimate){		
		canvasContext.strokeText("1. Fit each image with a bone (see Applying Bone to Image).", instructionTextPos.x, instructionTextPos.y +10);
		canvasContext.strokeText("2. Click the 'Set Root' icon next to the desired Root Image. This is usually a torso on a humanoid character.", instructionTextPos.x, instructionTextPos.y +30);
		canvasContext.strokeText("3. Move images to desired position.", instructionTextPos.x, instructionTextPos.y +50);
		canvasContext.strokeText("4. Click on 'Save Frame' or push 'S' key to save position frame", instructionTextPos.x, instructionTextPos.y +70);
		canvasContext.strokeText("5. Repeat steps 2 and 3 until animation is completed", instructionTextPos.x, instructionTextPos.y +90);
		canvasContext.strokeText("-Test animation by pressing up and down arrow keys", instructionTextPos.x, instructionTextPos.y +110);
		canvasContext.strokeText("6. Press 'Download Animation' once complete to use in your game!", instructionTextPos.x, instructionTextPos.y +130);
	}
	if(howToMakeBone){	
		canvasContext.strokeText("1. Select white square on image to begin mapping bone to sprite.", instructionTextPos.x, instructionTextPos.y +10);
		canvasContext.strokeText("2. Click desired beginning of bone.", instructionTextPos.x, instructionTextPos.y +30);
		canvasContext.strokeText("3. Click desired end of bone", instructionTextPos.x, instructionTextPos.y +50);
		canvasContext.strokeText("4. Once bone is created Blue icon to move sprite and Red icon to change angle", instructionTextPos.x, instructionTextPos.y +70);
	}
	if(howToSetChild){
		canvasContext.strokeText("1. Make sure bones are set in child and parent images.", instructionTextPos.x, instructionTextPos.y +10);
		canvasContext.strokeText("2. Click the 'Set Parent' icon on the menu of the child image .", instructionTextPos.x, instructionTextPos.y +30);
		canvasContext.strokeText("3. Click the Blue icon on the parent's bone.", instructionTextPos.x, instructionTextPos.y +50);		
		canvasContext.strokeText("4. Click the desired location relative to the parent image.", instructionTextPos.x, instructionTextPos.y +70);
		canvasContext.strokeText("Child bone should snap to the new location.  If the parent is moved the child will move with it.", instructionTextPos.x, instructionTextPos.y +90);
	}
	if(howToSetRoot){
		canvasContext.strokeText("1. Make sure bones are set in child and parent images.", instructionTextPos.x, instructionTextPos.y +10);
		canvasContext.strokeText("2. Click the 'Set Parent' icon on the menu of the child image .", instructionTextPos.x, instructionTextPos.y +30);
		canvasContext.strokeText("3. Click the Blue icon on the parent's bone.", instructionTextPos.x, instructionTextPos.y +50);		
		canvasContext.strokeText("4. Click the desired location relative to the parent image.", instructionTextPos.x, instructionTextPos.y +70);
		canvasContext.strokeText("Child bone should snap to the new location.  If the parent is moved the child will move with it.", instructionTextPos.x, instructionTextPos.y +90);
	}
	
	//Hide Icons button
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, hideIconsButtonPosition.x,hideIconsButtonPosition.y, 0);
	canvasContext.strokeText("Hide Icons" , hideIconsButtonPosition.x + 10, hideIconsButtonPosition.y +3);
	//Save Key Frame button
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, saveKeyFrameButtonPosition.x,saveKeyFrameButtonPosition.y, 0);
	canvasContext.strokeText("Save Key Frame" , saveKeyFrameButtonPosition.x + 10, saveKeyFrameButtonPosition.y +3);
	//Download animation button
	drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, downloadAnimationButtonPosition.x,downloadAnimationButtonPosition.y, 0);
	canvasContext.strokeText("Download Animation" , downloadAnimationButtonPosition.x + 10, downloadAnimationButtonPosition.y +3);
	
	

}