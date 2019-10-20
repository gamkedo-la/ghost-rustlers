//character1 Animations are listed here. 


  //Sprites Array
character1Head = document.createElement("img");
character1HeadLoaded = false;
character1UpperArm = document.createElement("img");
character1UpperArmLoaded = false;
character1ForeArm = document.createElement("img");
character1ForeArmLoaded = false;
character1Torso = document.createElement("img");
character1TorsoLoaded = false;


loadCharacterImages = function(){	

	character1Head.onload = function(){
		character1HeadLoaded = true;
	}
	character1Head.src = "images/cowboyHatRight.png"; //image file path here
	
	character1Torso.onload = function(){
		character1TorsoLoaded = true;
	}
	character1Torso.src = "images/characterBodyPlaceHolderRight.png"; //image file path here
	
	character1UpperArm.onload = function(){
		character1UpperArmLoaded = true;
	}
	character1UpperArm.src = "images/characterUpperArmPlaceHolder.png"; //image file path here	
	
	character1ForeArm.onload = function(){
		character1ForeArmLoaded = true;
	}
	character1ForeArm.src = "images/characterLowerArmPlaceHolder.png"; //image file path here
}
  //Postions and angles arrays
	torsoSprite = character1Torso;
	headSprite = character1Head;
	upperArmSprite = character1UpperArm;
	lowerArmSprite = character1ForeArm;
	spriteArray = new Array(torsoSprite, upperArmSprite, lowerArmSprite, headSprite); //same order here as bones array in Skeletal Animation System  
	

//Animation test
  function drawFromAnimationData(characterClass, animationState){
	  for(i=0; i < characterClass.spriteArray.length; i++){
			//Sprites drawn relavtive to character center
			//TODO Get location and relative distances from specific character.  
			
			if(animationState == "idle"){
					positionsX = new Array ([389.5,-12.334998092074102,-39.19778369209928,2],[389.5,-17.6664036114567,-40.12229966823247,2],[389.5,-19.242158903144627,-42.61366139095975,3.4217289612493005],[389.5,-17.777514585095105,-45.412278334393875,1.946605563810408]);
					positionsY = new Array([410,5.1304433649737575,9.941610039203908,46.5],[410,12.287998358428808,27.79571602568791,46.5],[410,24.607331983155632,49.33138782478426,57.06028235632431],[410,12.536700913860727,25.672088494881393,44]);
					limbAngles = new Array([0,0.8537845069879517,-1.6652155997563742,-0.04270905576500415],[0,0.4266274931268761,-1.6652155997563742,-0.04270905576500415],[0,-0.17219081452293902,-1.0225510836340417,-0.22494126505117096],[0,0.4136892132788633,-1.3851392906188422,0]);
			}
			
			drawImageCenteredAtLocationWithRotation(character1.spriteArray[i], ((character1.x - (torsoSprite.width / 2)) - (positionsX[animationIndex] [i])), (character1.y - (torsoSprite.height / 2)) - (positionsY[animationIndex] [i]), limbAngles[animationIndex] [i])
			
		}
  }
