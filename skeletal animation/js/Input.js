var dragging = false;

var highestIndex;
var draggingIndex;



function initInput(){
		//document.addEventListener('mouseup', mouseReleased, false);
		canvas.addEventListener('mousedown', onMouseDown, false);	
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