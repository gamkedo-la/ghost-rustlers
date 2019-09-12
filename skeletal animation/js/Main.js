var canvas, canvasContext;
var mousePos = {x:0, y:0};

function initMouse() {
	canvas.addEventListener('mousemove', function(evt) {
		mousePos = calculateMousePos(evt);
	})
}

function initRenderLoop() {
	var framesPerSecond = 60;
	setInterval(function() {
	
	moveEverything();
	drawEverything();
		
	}, 1000/framesPerSecond)
}

window.onload = function() {

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');	
	
	//loadStickSprites();
	loadCharacterImages()
	initMouse();
	initRenderLoop();
	initInput();	
	
	initializeBoneAngles();
	
}

function moveEverything() {
	//character movement will go here

}

function drawMousePos(){
	//console.log(mousePos.x + " " + mousePos.y);
	canvasContext.strokeText(mousePos.x.toString() + "," + mousePos.y.toString(), mousePos.x, mousePos.y);
}

function drawEverything() {
	drawBackground();	
	
	canvasContext.save();
	
	drawMousePos();
	//initializeBonePositions();
	drawBones();
	//drawStickManRelativeToBottomOfTorso();
	
	//moveElbow();

}