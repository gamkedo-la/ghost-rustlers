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


var changingAngle = false;
var movingBone = false;

var settingParent = false;
var childBone = null;
var parentBone = null;

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
		animationIndex +=1;
		if(animationIndex < positionsIndex){
		SetFigureToStoredPositions();
				
		}else {
			animationIndex = 0;
			SetFigureToStoredPositions();
		}						
		console.log("animation Index is " + animationIndex);		
	}
	if(evt.keyCode == KEY_DOWN_ARROW){
		animationIndex -=1;
		if(animationIndex < positionsIndex){
		SetFigureToStoredPositions();
				
		}
								
		if(animationIndex > 0){
		SetFigureToStoredPositions();
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
		//console.log((bones.indexOf(bones[i])) +": " + (bones[i].selected));
		//console.log((bones.indexOf(bones[i])) +": " + (bones[i].limbLength));
		if((hitTest(bones[i].imagePosition, mousePos.x, mousePos.y)) && (bones[i].selected == false)){			
			bones[i].selected = true;
			return;
		}
		
		//Setting Bone Initial Position
		if((bones[i].selected == true) && (bones[i].boneStartPositionSet == false)){
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);
			bones[i].setBoneStartPosition();
			return;			
		}
		//Setting Bone End Position
		if((bones[i].selected == true) && (bones[i].boneStartPositionSet == true) && (bones[i].boneEndPositionSet == false)){			
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);
			bones[i].setBoneEndPosition();
			return;
		}
		//Moving Bone for Animations(See MouseMoveListener for function)
		if((hitTest(bones[i].endPosition, mousePos.x, mousePos.y)) && (bones[i].boneEndPositionSet == true)){
			//console.log("Changing bone angle");
			
		changingAngle = true;
		bones[i].selected = true;
		draggingIndex = i;
		//console.log("dragging index is " + draggingIndex);
			
		}
		//Moving bone location (See MouseMoveListener for function)
		if((hitTest(bones[i].startPosition, mousePos.x, mousePos.y)) && (bones[i].boneEndPositionSet == true) && (bones[i].childOfOtherBone == false)){
			//console.log("moving bone");
			
		movingBone = true;
		bones[i].selected = true;
		draggingIndex = i;
		//console.log("dragging index is " + draggingIndex);
		}
		//Reset Bones	
		if(hitTest(bones[i].resetButtonPosition, mousePos.x, mousePos.y)){
			bones[i].ResetBone();
		}
		//Hide Icons
		if(hitTest(hideIconsButtonPosition, mousePos.x, mousePos.y)){
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);
			if(hideIcons == false){
				hideIcons = true;
				return;
			}
			if(hideIcons == true){
				hideIcons = false;
				return;
			}
		}
		//Setting Parent of current bone
		if(bones[i].boneSet && hitTest(bones[i].setParentButtonPosition, mousePos.x, mousePos.y)){
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);
			settingParent = true;
			console.log(settingParent);
			bones[i].parentToBeSet = true;		
		}
		if(bones[i].selected && bones[i].boneSet && settingParent){
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);		
			parentBone = bones[i];
			for(j=0; j < bones.length; j++){
				if(bones[j].parentToBeSet){
					childBone = bones[j];
				}
			}
			if(childBone == null){
				return;
			}			
			return;
			/*childBone.SetParentBone(parentBone); 
			settingParent = false;
			console.log(settingParent);*/			
		}
		if(parentBone != null){
			//Set childlocation on parent sprite
			canvas.removeEventListener('mousedown', onMouseDown, false);
			window.addEventListener('mouseup', mouseUpListener, false);	
			childBone.locationOnParentSprite.x = mousePos.x;
			childBone.locationOnParentSprite.y = mousePos.y;
			childBone.SetParentBone(parentBone);
			parentBone = null;
			childBone = null;
			settingParent = false;
		}
		//Ssving Key Frames
		if(hitTest(saveKeyFrameButtonPosition, mousePos.x, mousePos.y)){
			StorePositions();
		}
		
	}
			
	if(changingAngle || movingBone){
		window.addEventListener('mousemove', mouseMoveListener, false);
	}
	
	//Download Animation
		
		if(hitTest(downloadAnimationButtonPosition, mousePos.x, mousePos.y)){
			var myJSON = JSON.stringify(positions);
			downloadString("var positions = " + myJSON + ";", "text/javascript", "myFilename.js")
		}
	
		canvas.removeEventListener('mousedown', onMouseDown, false);
		window.addEventListener('mouseup', mouseUpListener, false);	
}		


function mouseMoveListener(evt){
	if(changingAngle && movingBone){
		movingBone = false;
	}
	if(changingAngle){
		bones[draggingIndex].changeBoneAngle();
	}
	if(movingBone){
		bones[draggingIndex].moveBone();
	}		
}

function mouseUpListener(evt){
	console.log("mouse released");
		canvas.addEventListener('mousedown', onMouseDown, false);
		window.removeEventListener('mouseup', mouseUpListener, false);
		if(changingAngle || movingBone){
			changingAngle = false;
			movingBone = false;
			bones[draggingIndex].selected = false;	
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