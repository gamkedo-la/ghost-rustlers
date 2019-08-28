//Bone class
const SELECTOR_RADIUS = 5;

function boneClass(){
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
	this.limbLength;
	this.childOfOtherBone = false; //For example if the upperarm moves then so does the lower arm. 
	this.parentBone;
	this.limbAngle = 0;
	this.combinedLimbAngle = 0;
	this.parentBoneLimbAngle = 0;
	//TODO: Set position along parent bone. 
	//The upper arms, for example, do not begin at the top of the torso so using its endPosition to set them won't work.
	//The upper arms must be rooted at a distance away from the endPosition of the torso.  The user must be able to set this
	//from within the editor. 
	this.positionAlongParentBone = 1; //A value from 0 to 1 that tracks the percentage of the parent limb length. 
	this.distanceAlongParentBone = 0;
	
	this.limbImage; //Image of Actual game object to be animated
	//this.boneImageOverlay;	//Overlay image of a "bone" that designer can manipulate to move limb. Invisible during game.
	this.boneSelectorLocation = {
		x:0,
		y:0
	}
	this.boneSelectorColor = 'green';
	
	//draw image at correct orientation
	//"start" convenstion is innermost part of the limb (shoulder begins the upper arm, elbow begins the forearm etc.). 
	this.drawBone = function(){			
			
		
		//drawImageCenteredAtLocationWithRotation(this.limbImage, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
			
		if(this.childOfOtherBone = false){
			this.endPosition.x = (this.limbLength * Math.cos(this.limbAngle) + this.startPosition.x);
			this.endPosition.y = (this.limbLength * Math.sin(this.limbAngle) + this.startPosition.y);				
			this.imagePosition.x = this.startPosition.x + ((this.endPosition.x - this.startPosition.x)/2);
			this.imagePosition.y = this.startPosition.y + ((this.endPosition.y - this.startPosition.y)/2);	
						
			drawImageCenteredAtLocationWithRotation(this.boneImageOverlay, this.imagePosition.x, this.imagePosition.y, this.limbAngle);
		}
		else{
			this.distanceAlongParentBone = (this.limbLength - (this.positionAlongParentBone * this.limbLength));

			//TODO: Complete position along parent bone logic
			
			this.combinedLimbAngle =  this.parentBoneLimbAngle +  this.limbAngle;	
			//this.combinedLimbAngle =  this.parentBone.limbAngle +  this.limbAngle;	
			this.startPosition.x -= (this.distanceAlongParentBone * Math.cos(this.combinedLimbAngle));
			this.startPosition.y -= (this.distanceAlongParentBone * Math.sin(this.combinedLimbAngle));
			this.endPosition.x = (this.limbLength * Math.cos(this.combinedLimbAngle) + this.startPosition.x);
			this.endPosition.y = (this.limbLength * Math.sin(this.combinedLimbAngle) + this.startPosition.y);				
			this.imagePosition.x = this.startPosition.x + ((this.endPosition.x - this.startPosition.x)/2);
			this.imagePosition.y = this.startPosition.y + ((this.endPosition.y - this.startPosition.y)/2);
			
						
					
			drawImageCenteredAtLocationWithRotation(this.limbImage, this.imagePosition.x, this.imagePosition.y, this.combinedLimbAngle);
			//drawImageCenteredAtLocationWithRotation(this.boneImageOverlay, this.imagePosition.x, this.imagePosition.y, this.combinedLimbAngle);
		}
		colorCircle(this.endPosition.x, this.endPosition.y, SELECTOR_RADIUS, this.boneSelectorColor);
	}
	
	this.moveBone = function(){
		var targetLimbAngle = 0;		
		targetLimbAngle = Math.atan2(mousePos.y - this.startPosition.y, mousePos.x - this.startPosition.x);		
		this.limbAngle = targetLimbAngle;		
	}
	
	this.setBoneAngle = function(savedLimbAngle){
		console.log(savedLimbAngle);
		this.limbAngle = savedLimbAngle;
	}
		
}