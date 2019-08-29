const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_E = 69;
const KEY_F = 70
const KEY_P = 80;
const KEY_S = 83;
const KEY_TILDE = 192;
var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;
var hold_Space_Key = false;
var hold_E_Key = false;
var hold_1_Key = false;
var hold_2_Key = false;
var hold_3_Key = false;
var hold_4_Key = false;


var dragging = false;

var highestIndex;
var draggingIndex;



function initInput(){
		//document.addEventListener('mouseup', mouseReleased, false);
		canvas.addEventListener('mousedown', onMouseDown, false);	
		initKeys();
}

function initKeys(){
	document.addEventListener("keydown", keyPressed);
	//document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt){
	if(evt.keyCode == KEY_S){
		console.log("S Pressed");
		StorePositions();
	}
	
	if(evt.keyCode == KEY_F){
		console.log("animation Index is " + animationIndex);
	}
	
	if(evt.keyCode == KEY_UP_ARROW){
		
		if(animationIndex <= positionsIndex){
		SetStickFigureToStoredPositions();
		}		
		if(animationIndex < positionsIndex){	
				
		animationIndex +=1;
		}else {
			animationIndex = 0;
		}
		console.log(animationIndex);
	}
	if(evt.keyCode == KEY_DOWN_ARROW){
		
		if(animationIndex <= positionsIndex){
		SetStickFigureToStoredPositions();
		}
		if(animationIndex > 0){
		animationIndex -=1;
		}else{
			animationIndex = positionsIndex;
		}
		console.log(animationIndex);
	}
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect(),
		root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x: mouseX,
			y: mouseY		
		};	
}

function onMouseDown(evt){
	console.log("mouse Pressed");
	//find which bone was clicked
	for(i=0; i < bones.length; i++){
		if(hitTest(bones[i].endPosition, mousePos.x, mousePos.y)){
			console.log("hit test worked");
			
		dragging = true;
		bones[i].boneSelectorColor = 'red';
		draggingIndex = i;
		console.log("dragging index is " + draggingIndex);
			/*if(i > highestIndex){
				highestIndex = i;
				draggingIndex = i;
				
			}*/
		}
	}
			
	if(dragging){
		window.addEventListener('mousemove', mouseMoveListener, false);
	}
		canvas.removeEventListener('mousedown', onMouseDown, false);
		window.addEventListener('mouseup', mouseUpListener, false);	
}		


function mouseMoveListener(evt){	
	bones[draggingIndex].moveBone();	
}

function mouseUpListener(evt){
	console.log("mouse released");
		canvas.addEventListener('mousedown', onMouseDown, false);
		window.removeEventListener('mouseup', mouseUpListener, false);
		if(dragging){
			dragging = false;
			bones[draggingIndex].boneSelectorColor = 'green';
			window.removeEventListener('mousemove', mouseMoveListener, false);
		}
}

function hitTest(BoneSelector, mouseX, mouseY){
	var distanceX;
	var distanceY;
		distanceX = mouseX - BoneSelector.x;
		distanceY = mouseY - BoneSelector.y;
		
		//a "hit" will be registered if the distance away from the center is less than the radius of the circular object		
		return (distanceX * distanceX + distanceY * distanceY < SELECTOR_RADIUS * SELECTOR_RADIUS);
} 