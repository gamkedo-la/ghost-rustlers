function StorePositions(){
	//positions[positionsIndex] = new Array(leftForeArmLimbAngle, leftUpperArmLimbAngle);
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