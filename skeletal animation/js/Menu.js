//Menu Script
//TODO: Relocate UI items to separate file
var hideIcons = false;
var hideIconsButtonPosition = {
	x:700,
	y:10
}

var saveKeyFrameButtonPosition = {
	x:100,
	y:350
}
var downloadAnimationButtonPosition = {
	x:100,
	y:375
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