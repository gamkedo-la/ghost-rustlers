//Bone class
const SELECTOR_RADIUS = 5;

function boneClass(){
	this.initialPosition = {
		x:0,
		y:0
	}
	this.startPosition = {
		x:0,
		y:0
	}
	this.endPosition = {
		x:0,
		y:0
	}
	this.imagePosition = {
		x:0,
		y:0
	}
	this.locationOnParentSprite = {
		x:0,
		y:0
	}
	this.resetButtonPosition = {
		x:0,
		y:0
	}
	this.setParentButtonPosition = {
		x:0,
		y:0
	}
	this.setRootButtonPosition = {
		x:0,
		y:0
	}
	
	this.limbLength;
	
	this.isRoot = false;
	this.childOfOtherBone = false; //For example if the upperarm moves then so does the lower arm. 
	this.parentBone;
	
	this.limbAngle = 0;
	this.combinedLimbAngle = 0;
	this.parentBoneLimbAngle = 0;
	this.imageAngle = 0;
	
	this.positionAlongParentBone = 1; //A value from 0 to 1 that tracks the percentage of the parent limb length. 
	this.distanceAlongParentBone = 0;
	this.relativeDistanceToParent = 0;
	this.relativeAngleToParent = 0;
	
	this.limbImage; //Image of Actual game object to be animated
	//this.boneImageOverlay;	//Overlay image of a "bone" that designer can manipulate to move limb. Invisible during game.
	
	this.boneStartPositionSet = false;
	this.boneEndPositionSet = false;
	this.selected = false;
	this.boneSet = false;	
	this.parentSet = false;
	this.parentToBeSet = false;
	
	this.childBone = null;
	this.parentBone = null;
	
	this.boneStartSelector = {
		x:0,
		y:0
	}
	
	this.boneEndSelector = {}
	
	this.boneSelectorLocation = {
		x:0,
		y:0
	}
	this.boneSelectorColor = 'green';
	
	
	//draw image at correct orientation
	//"start" convenstion is innermost part of the limb (shoulder begins the upper arm, elbow begins the forearm etc.). 
	this.drawBone = function(){			
			
		
		//drawImageCenteredAtLocationWithRotation(this.limbImage, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
			
		if(this.childOfOtherBone == false){			
			this.endPosition.x = (this.limbLength * Math.cos(this.limbAngle) + this.startPosition.x);
			this.endPosition.y = (this.limbLength * Math.sin(this.limbAngle) + this.startPosition.y);					

			if(animationSet == false || this.isRoot == true){
				this.imagePosition.x = this.startPosition.x + ((this.endPosition.x - this.startPosition.x)/2);
				this.imagePosition.y = this.startPosition.y + ((this.endPosition.y - this.startPosition.y)/2);
			}		
						
			drawImageCenteredAtLocationWithRotation(this.limbImage, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
		}
		else{
			this.distanceAlongParentBone = (this.limbLength - (this.positionAlongParentBone * this.limbLength));
			
			//TODO: Complete position along parent bone logic
			this.startPosition.x = this.parentBone.endPosition.x - (this.relativeDistanceToParent * Math.sin((this.relativeAngleToParent - this.parentBone.limbAngle)));
			this.startPosition.y = this.parentBone.endPosition.y - (this.relativeDistanceToParent * Math.cos((this.relativeAngleToParent - this.parentBone.limbAngle)));	
			
			//this.combinedLimbAngle =  this.parentBoneLimbAngle +  this.limbAngle;	
							
			this.combinedLimbAngle = this.parentBone.limbAngle + this.limbAngle;
			this.endPosition.x = (this.limbLength * Math.cos(this.combinedLimbAngle) + this.startPosition.x);
			this.endPosition.y = (this.limbLength * Math.sin(this.combinedLimbAngle) + this.startPosition.y);				
			
			if(animationSet == false && this.isRoot == false){
				this.imagePosition.x = this.startPosition.x + ((this.endPosition.x - this.startPosition.x)/2);
				this.imagePosition.y = this.startPosition.y + ((this.endPosition.y - this.startPosition.y)/2);
			}									
					
			drawImageCenteredAtLocationWithRotation(this.limbImage, this.imagePosition.x, this.imagePosition.y, this.combinedLimbAngle);
			//drawImageCenteredAtLocationWithRotation(this.boneImageOverlay, this.imagePosition.x, this.imagePosition.y, this.combinedLimbAngle);
		}
		//Draw inital bone selector
		if(hideIcons == false){
			if(this.boneSet == false){
				if(this.selected == true){				
						drawImageCenteredAtLocationWithRotation(boneSelectorSelected, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
					}else{				
						drawImageCenteredAtLocationWithRotation(boneSelector, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
					}
			}
			//Draw change position selector
			if(this.boneStartPositionSet == true && this.childOfOtherBone == false){			
				if(this.selected == true){
					if(this.boneSet == false){
						drawImageCenteredAtLocationWithRotation(boneMoveSelectorSelected, this.boneStartSelector.x, this.boneStartSelector.y, this.limbAngle);
					}else{	
						drawImageCenteredAtLocationWithRotation(boneMoveSelectorSelected, this.startPosition.x, this.startPosition.y, this.limbAngle);
					}
				}else{				
					drawImageCenteredAtLocationWithRotation(boneMoveSelectorNotSelected, this.startPosition.x, this.startPosition.y, this.limbAngle);
				}			
			}
			//Draw change angle selector	
			if(this.boneEndPositionSet == true){			
				if(this.selected == true){				
					drawImageCenteredAtLocationWithRotation(boneChangeAngleSelectorSelected, this.endPosition.x, this.endPosition.y, this.limbAngle);
				}else{				
					drawImageCenteredAtLocationWithRotation(boneChangeAngleSelectorNotSelected, this.endPosition.x, this.endPosition.y, this.limbAngle);
				}	
			}	
		}	
	}
	
	this.moveBone = function(){
		
		this.startPosition.x = mousePos.x;
		this.startPosition.y = mousePos.y;
				
	}
	
	this.setBoneStartPosition = function(){
		console.log("setBoneStartPosition called");
		if((this.selected == true) && (this.boneSet == false)){			
			this.boneStartSelector.x = mousePos.x;
			this.boneStartSelector.y = mousePos.y;
			
			//this.startPosition.x = this.boneStartSelector.x;
			//this.startPosition.y = this.boneStartSelector.y;
			//this.startPosition.x = mousePos.x;
			//this.startPosition.y = mousePos.y;
		}
		this.boneStartPositionSet = true;
	}
	
	this.setBoneEndPosition = function(){
		console.log("setBoneEndPosition called");
		if((this.selected == true) && (this.boneSet == false)){
			colorCircle(mousePos.x, mousePos.y, 2*SELECTOR_RADIUS, "blue");
		}
		this.boneEndSelector.x = mousePos.x;
		this.boneEndSelector.y = mousePos.y;
		
		this.startPosition.x = this.boneStartSelector.x;
		this.startPosition.y = this.boneStartSelector.y;
		this.endPosition.x = this.boneEndSelector.x;
		this.endPosition.y = this.boneEndSelector.y; 
		
		this.boneEndPositionSet = true;
		this.boneSet = true;
		this.selected = false;
		
		//Set Limb Length to the distance between start and end positions
		this.limbLength = (Math.sqrt((Math.pow(this.startPosition.x - this.endPosition.x,2)) + (Math.pow(this.startPosition.y - this.endPosition.y,2))))
		this.limbAngle =  Math.atan2(this.endPosition.y - this.startPosition.y, this.endPosition.x - this.startPosition.x);	
	}
	
	this.changeBoneAngle = function(){
		var targetLimbAngle = 0;		
		targetLimbAngle = Math.atan2(mousePos.y - this.startPosition.y, mousePos.x - this.startPosition.x);		
		this.limbAngle = targetLimbAngle;		
	}
	
	this.setBoneAngle = function(savedLimbAngle){
		console.log(savedLimbAngle);
		this.limbAngle = savedLimbAngle;
	}
	
	this.SetBonePositionsFromSavedFrames = function(imageX, imageY, angle){
		this.imagePosition.x = imageX;
		this.imagePosition.y = imageY;
		this.limbAngle = angle;
	}
	
	this.ResetBone = function(){
		this.boneSet = false;
		this.boneStartPositionSet = false;
		this.boneEndPositionSet = false;
		this.childOfOtherBone = false;
		this.selected = false;
		
	}
	
	this.SetParentBone = function(parentBoneSelected){
		console.log("Set Parent Called");
		this.childOfOtherBone = true;
		this.positionAlongParentBone = 1;	
		this.parentBone = new boneClass();
		this.parentBone = parentBoneSelected;
		console.log("parent bone is: " + bones.indexOf(this.parentBone));	
		this.relativeDistanceToParent = (Math.sqrt((Math.pow(this.locationOnParentSprite.x - this.parentBone.endPosition.x,2)) + (Math.pow(this.locationOnParentSprite.y - this.parentBone.endPosition.y,2))))
		this.relativeAngleToParent =  Math.atan2(this.parentBone.endPosition.x - this.locationOnParentSprite.x, this.parentBone.endPosition.y - this.locationOnParentSprite.y);		
		console.log("relative angle to parent is = " + this.relativeAngleToParent);
		console.log("relative distance to parent is = " + this.relativeDistanceToParent);
		
	}
}