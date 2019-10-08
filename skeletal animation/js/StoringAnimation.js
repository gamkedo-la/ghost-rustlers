var positions = new Array();
var positionsIndex = 0;
var animationIndex = 0;



function StorePositions(){
	
	var limbAngles = new Array();
	
	for(i=0; i < bones.length; i++){
		limbAngles.push(bones[i].limbAngle);
	}
	
	positions[positionsIndex] = limbAngles;	
		
	console.log(positions);
	
	positionsIndex +=1;
		
	console.log("positionsIndex is " + positionsIndex);	
}

function SetFigureToStoredPositions(){	
			for(i = 0; i < bones.length; i++){
			bones[i].setBoneAngle(positions[animationIndex] [i]);
			}
			
}