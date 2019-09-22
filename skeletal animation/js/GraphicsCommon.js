var boneMoveSelectorSelected = document.createElement("img");
var boneMoveSelectorNotSelected = document.createElement("img");
var boneChangeAngleSelectorSelected = document.createElement("img");
var boneChangeAngleSelectorNotSelected = document.createElement("img");


function loadAnimatorIcons(){
	boneMoveSelectorSelected.onload = function(){
		boneMoveSelectorSelectedLoaded = true;
	}
	boneMoveSelectorSelected.src = "images/BoneMoveSelector_selected.png"; //image file path here
	
	boneMoveSelectorNotSelected.onload = function(){
		boneMoveSelectorNotSelectedLoaded = true;
	}
	boneMoveSelectorNotSelected.src = "images/BoneMoveSelector.png";
	
	boneChangeAngleSelectorSelected.onload = function(){
		boneChangeAngleSelectorSelectedLoaded = true;
	}
	boneChangeAngleSelectorSelected.src = "images/BoneRotateSelector_selected.png";
	
	boneChangeAngleSelectorNotSelected.onload = function(){
		boneChangeAngleSelectorNotSelectedLoaded = true;
	}
	boneChangeAngleSelectorNotSelected.src = "images/BoneRotateSelector.png";
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorLine(x1, y1, x2, y2, lineWidth, color){
	canvasContext.beginPath();
	canvasContext.strokeStyle = color;
	canvasContext.moveTo(x1, y1);
	canvasContext.lineTo(x2, y2);
	canvasContext.lineWidth = lineWidth;
	canvasContext.stroke();
}

function drawImageCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAngle);
	canvasContext.drawImage(graphic,-graphic.width/2, -graphic.height/2);
	canvasContext.restore();
}

function drawBackground(){
	colorRect(0,0, canvas.width, canvas.height, 'SkyBlue');
}

