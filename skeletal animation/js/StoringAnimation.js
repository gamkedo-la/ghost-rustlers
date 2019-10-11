var positions = new Array();
var positionsX = new Array();
var positionsY = new Array();
var positionsAngle = new Array();
var positionsIndex = 0;
var animationIndex = 0;
var animationSet = false;

var rootPosition = {
	x:0,
	y:0
}

function StorePositions(){
	
	animationSet = false;
	
	//var limbAngles = new Array();
	
	for(i=0; i < bones.length; i++){
		limbAngles.push(bones[i].limbAngle);
	}
	
	positions[positionsIndex] = limbAngles;	
		
	console.log(positions);
	
	positionsIndex +=1;
		
	console.log("positionsIndex is " + positionsIndex);	
}

function StorePositionsForExport(){
	animationSet = false;
	//TODO Push bone image positions into positional array
	var imagePositionsX = new Array();
	var imagePositionsY = new Array();
	var limbAngles = new Array();
	
	for(i=0; i < bones.length; i++){
		//Find Root Bone 
		for(j=0; j < bones.length; j++){
			if(bones[j].isRoot){
			rootPosition.x = bones[j].imagePosition.x;
			rootPosition.y = bones[j].imagePosition.y;
			}
		}
		if(bones[i].isRoot == true){
			imagePositionsX.push((rootPosition.x));
			imagePositionsY.push((rootPosition.y));
		}else{
			//imagePositionsX.push((rootPosition.x -(rootPosition.x - bones[i].imagePosition.x)));
			//imagePositionsY.push((rootPosition.y -(rootPosition.y - bones[i].imagePosition.y)));
			imagePositionsX.push((rootPosition.x - bones[i].imagePosition.x));
			imagePositionsY.push((rootPosition.y - bones[i].imagePosition.y));
		}
		limbAngles.push(bones[i].limbAngle);
		
		
		positionsX[positionsIndex] = imagePositionsX;
		positionsY[positionsIndex] = imagePositionsY;
		positionsAngle[positionsIndex] = limbAngles;
	}
	
	positionsIndex +=1;
		
	console.log("positionsIndex is " + positionsIndex);	
	
}

function SetFigureToStoredPositions(){	
			animationSet = true;
			for(i = 0; i < bones.length; i++){
			//bones[i].setBoneAngle(positions[animationIndex] [i]);
				if(bones[i].isRoot == false){
				bones[i].SetBonePositionsFromSavedFrames((bones[0].imagePosition.x - (positionsX[animationIndex] [i])), (bones[0].imagePosition.y - (positionsY[animationIndex] [i])), (positionsAngle[animationIndex] [i]));	
				}
			}
			
}