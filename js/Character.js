characterClass.prototype = new destructableObjectClass();
characterClass.prototype.constructor = characterClass;

const RUN_SPEED = 4.0;
const JUMP_SPEED = 1.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;
const GUN_POS = 8;
var isInAimMode = false;
var damageAvailable = true;

//Animation variables
var animationIndex = 0; 

function characterClass(character_team, character_color) {

  this.actionsRemaining = ACTIONS_PER_TURN;
  this.team = character_team;
  this.color = character_color;
  this.speedX = 0;
  this.speedY = 0;
  this.path = [];
  this.destinationXCoord;
  this.destinationYCoord;
  this.shoulderOffset;
  this.shoulderAngle = 0;
  this.elbowAngle = 0;
  this.handAngle = 0;
  this.hasFired = false;
  this.isOnGround = false;
  this.isClimbing = false;
  this.isActive = false;

  this.upperArm = {
    x: 0,
    y: 0
  }
  this.lowerArm = {
    x: 0,
    y: 0
  }
  this.leftShoulderJoint = {
    x: 0,
    y: 0
  }
  this.rightShoulderJoint = {
    x: 0,
    y: 0
  }
  this.leftElbow = {
    x: 0,
    y: 0
  };
  this.rightElbow = {
    x: 0,
    y: 0
  };
  this.leftHand = {
    x: 0,
    y: 0
  };
  this.rightHand = {
    x: 0,
    y: 0
  };
  
  //Test Items from Skeletal Animation System START
  
  //Sprites Array
this.newCharacterhead = document.createElement("img");
this.newCharacterheadLoaded = false;
this.newCharacterUpperArm = document.createElement("img");
this.newCharacterUpperArmLoaded = false;
this.newCharacterForeArm = document.createElement("img");
this.newCharacterForeArmLoaded = false;
this.newCharacterTorso = document.createElement("img");
this.newCharacterTorsoLoaded = false;


this.loadCharacterImages = function(){	

	this.newCharacterhead.onload = function(){
		newCharacterheadLoaded = true;
	}
	this.newCharacterhead.src = "images/cowboyHatRight.png"; //image file path here
	
	this.newCharacterTorso.onload = function(){
		newCharacterTorsoLoaded = true;
	}
	this.newCharacterTorso.src = "images/characterBodyPlaceHolderRight.png"; //image file path here
	
	this.newCharacterUpperArm.onload = function(){
		newCharacterUpperArmLoaded = true;
	}
	this.newCharacterUpperArm.src = "images/characterUpperArmPlaceHolder.png"; //image file path here	
	
	this.newCharacterForeArm.onload = function(){
		newCharacterForeArmLoaded = true;
	}
	this.newCharacterForeArm.src = "images/characterLowerArmPlaceHolder.png"; //image file path here
}
  //Postions and angles arrays
	this.torsoSprite = this.newCharacterTorso;
	this.headSprite = this.newCharacterhead;
	this.upperArmSprite = this.newCharacterUpperArm;
	this.lowerArmSprite = this.newCharacterForeArm;
	this.spriteArray = new Array(this.torsoSprite, this.upperArmSprite, this.lowerArmSprite, this.headSprite); //same order here as bones array in Skeletal Animation System
  
	this.positionsX = new Array ([389.5,-12.334998092074102,-39.19778369209928,2],[389.5,-17.6664036114567,-40.12229966823247,2],[389.5,-19.242158903144627,-42.61366139095975,3.4217289612493005],[389.5,-17.777514585095105,-45.412278334393875,1.946605563810408]);
	this.positionsY = new Array([410,5.1304433649737575,9.941610039203908,46.5],[410,12.287998358428808,27.79571602568791,46.5],[410,24.607331983155632,49.33138782478426,57.06028235632431],[410,12.536700913860727,25.672088494881393,44]);
	this.limbAngles = new Array([0,0.8537845069879517,-1.6652155997563742,-0.04270905576500415],[0,0.4266274931268761,-1.6652155997563742,-0.04270905576500415],[0,-0.17219081452293902,-1.0225510836340417,-0.22494126505117096],[0,0.4136892132788633,-1.3851392906188422,0]);
  	
 //Test Items from Skeletal Animation System END

  this.drawCharacter = function () {

    this.shoulderOffset = -this.torsoSprite.height / 4;

    this.setCharacterSprites();
	  this.loadCharacterImages();

    //Here's another method that might look better than the tinted sprite approach.
    //To test this, uncomment this and the last line, and set the inActiveColor and usedColor to #00000000 in the Assets.js.

    //set darkness or transparency for sprites making up the character
    if (this.actionsRemaining <= 0) {
      canvasContext.globalCompositeOperation = "darken";
    } else if (!this.isActive) {
      canvasContext.globalCompositeOperation = "overlay";
    }
	
	this.drawBody()
    this.drawArms();
	
	if(this.isActive){    
		//this.drawArms();
		if (this.team == 'PLAYER_TEAM') {
		  this.drawHat(this.x, this.y - this.torsoSprite.height / 3, 1.9 * Math.PI);
		}
	}else{
		//idle animation
		//this.drawFromAnimationData();
	}
    if (isInAimMode && this.isActive){
      this.drawWeapon(this.rightHand.x + GUN_POS, this.rightHand.y);
    }

    //ends sprites being drawn with darkness or transparancy
    canvasContext.globalCompositeOperation = "source-over";

  }

  this.characterAction = function () {

    if (this.isActive == false) {		
		
      return
    }

    if (isInAimMode && !this.hasFired) {
      calculateProjectileTrajectory(this);
      drawTrajectoryPath();
    }

    if (this.hasFired) {
      if (ricochetCount <= MAX_RICOCHETS) {
        animateProjectile(trajectoryPaths[ricochetCount].x1, trajectoryPaths[ricochetCount].y1, trajectoryPaths[ricochetCount].x2, trajectoryPaths[ricochetCount].y2);
      } else {
        this.hasFired = false;
        resetProjectile();
        bulletT = MAX_BULLET_T;
      }
    }
  }

  this.characterMove = function () {

    this.x += this.speedX; // move the character based on its current horizontal speed 
    this.y += this.speedY; // same as above, but for vertical

    if (this.isOnGround || this.isClimbing) {
      this.speedX *= GROUND_FRICTION;
    } else {
      this.speedX *= AIR_RESISTANCE;
      this.speedY += GRAVITY;
      if (this.speedY > this.torsoSprite.height) { // cheap test to ensure can't fall through floor
        this.speedY = this.torsoSprite.height;
      }
    }

    if (this.x > this.destinationXCoord) {
      if ((this.x - RUN_SPEED) < this.destinationXCoord) {
        this.x = this.destinationXCoord;
        this.speedX = 0;
      } else {
        this.speedX = -RUN_SPEED
      }
    }

    if (this.x < this.destinationXCoord) {
      if ((this.x + RUN_SPEED) > this.destinationXCoord) {
        this.x = this.destinationXCoord;
        this.speedX = 0;
      } else {
        this.speedX = RUN_SPEED;
      }
    }
    //Update destination on reaching current path node
    if (this.x === this.destinationXCoord && Math.abs(this.y - this.destinationYCoord) <= BRICK_H / 2) {
      this.nextPathNode();
    }

    let xCol = colAtXCoord(this.x),
      yRow = rowAtYCoord(this.y),
      charIndex = BRICK_COLS * yRow + xCol;

    if (levelTileGrid[charIndex] == LADDER_PLATFORM_TILE || levelTileGrid[charIndex] == LADDER_TILE) {
      this.isClimbing = true;
    } else if (levelTileGrid[charIndex + BRICK_COLS] == LADDER_PLATFORM_TILE || levelTileGrid[charIndex + BRICK_COLS] == LADDER_TILE) {
      this.isClimbing = true;
    } else {
      this.isClimbing = false;
    }

    //Jump up ledges and climb ladders
    if (this.destinationYCoord < this.y) {
      if (this.isClimbing) {
        this.speedY = -RUN_SPEED;
      } else {
        this.speedX /= 3;
        this.speedY -= JUMP_SPEED;
      }
    //Hop one tile gaps
    } else if (Math.abs(this.x - this.destinationXCoord) > BRICK_W * 1.75) {
      this.speedY -= JUMP_SPEED;
    }
     else if (this.isClimbing && this.destinationYCoord - BRICK_H / 2 > this.y && Math.abs(this.x - this.destinationXCoord) <= BRICK_H / 2) {
      this.speedY = RUN_SPEED;
    } else if (this.isClimbing) {
      this.speedY = 0;
    }

    //Solid tile above
    if (!this.isClimbing && this.speedY < 0 && isSolidTileAtPixelCoord(this.x, this.y - (this.torsoSprite.height / 2))) {
      this.y = (Math.floor(this.y / BRICK_H)) * BRICK_H + (this.torsoSprite.height / 2);
      this.speedY = 0.0;
    }

    //Solid tile below
    if (!this.isClimbing && this.speedY > 0 && isSolidTileAtPixelCoord(this.x, this.y + (this.torsoSprite.height / 2))) {
      this.y = (1 + Math.floor(this.y / BRICK_H)) * BRICK_H - (this.torsoSprite.height / 2);
      this.isOnGround = true;
      this.speedY = 0;
    } else if (!isSolidTileAtPixelCoord(this.x, this.y + (this.torsoSprite.height / 2) + 2)) {
      this.isOnGround = false;
    }

    //Solid tile left
    if (this.speedX < 0 && isSolidTileAtPixelCoord(this.x - (this.torsoSprite.width / 2), this.y)) {
      this.x = (Math.floor(this.x / BRICK_W)) * BRICK_W + (this.torsoSprite.width / 2);
    }
    //Solid tile right
    if (this.speedX > 0 && isSolidTileAtPixelCoord(this.x + (this.torsoSprite.width / 2), this.y)) {
      this.x = (1 + Math.floor(this.x / BRICK_W)) * BRICK_W - (this.torsoSprite.width / 2);
    }

  }
  
  //Animation test
  this.drawFromAnimationData = function(){
	  for(i=1; i < this.spriteArray.length; i++){
			//Sprites drawn relavtive to character center
			drawImageCenteredAtLocationWithRotation(this.spriteArray[i], ((this.x - (this.torsoSprite.width / 2)) - (this.positionsX[animationIndex] [i])), (this.y - (this.torsoSprite.height / 2)) - (this.positionsY[animationIndex] [i]), this.limbAngles[animationIndex] [i])
			
		}
  }

  this.drawBody = function () {
    if (aimerX < this.x - (this.torsoSprite.width / 2)) { //If facing left...
      canvasContext.drawImage((this.actionsRemaining <= 0 ? this.bodyLeftPicUsed : (this.isActive ? this.bodyLeftPic : this.bodyLeftPicInactive)), this.x - (this.torsoSprite.width / 2), this.y - (this.torsoSprite.height / 2));
    } else { // ...else facing right.
      canvasContext.drawImage((this.actionsRemaining <= 0 ? this.bodyRightPicUsed : (this.isActive ? this.bodyRightPic : this.bodyRightPicInactive)), this.x - (this.torsoSprite.width / 2), this.y - (this.torsoSprite.height / 2));
    }
  }

  this.drawArms = function () {
    this.calculateArmPositions();
	
	if (aimerX < this.x - (this.torsoSprite.width / 2))
	{
		drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.upperArmPicUsed : (this.isActive ? this.upperArmPic : this.upperArmPicInactive)), this.upperArm.x, this.upperArm.y, -this.shoulderAngle);
		drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.lowerArmPicUsed : (this.isActive ? this.lowerArmPic : this.lowerArmPicInactive)), this.lowerArm.x, this.lowerArm.y, this.handAngle - 45);
	}
	else
	{
		drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.upperArmPicUsed : (this.isActive ? this.upperArmPic : this.upperArmPicInactive)), this.upperArm.x, this.upperArm.y, this.shoulderAngle);
		drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.lowerArmPicUsed : (this.isActive ? this.lowerArmPic : this.lowerArmPicInactive)), this.lowerArm.x, this.lowerArm.y, this.handAngle);
	}
  }

  this.calculateArmPositions = function () {

    this.calculateArmJointAngles();
    this.calculateArmJointCoords();
    this.calculateArmSpriteCoords();

  }

  this.calculateArmJointAngles = function () {
    var targetShoulderAngle = 0;
    var targetElbowAngle = 0;
    var jointSmoothingRate = 0.65;

    //sets angles of arm segments
    if (isInAimMode && this.isActive) {
      if (aimerX < this.x - (this.torsoSprite.width / 2)) {
        targetShoulderAngle = Math.atan2(aimerY - this.rightShoulderJoint.y, aimerX - this.rightShoulderJoint.x);
        targetElbowAngle = Math.PI / 6;
      } else {
        targetShoulderAngle = Math.atan2(aimerY - this.rightShoulderJoint.y, aimerX - this.rightShoulderJoint.x);
        targetElbowAngle = -Math.PI / 6;
      }

    } else {
      targetShoulderAngle = Math.PI * 0;
      targetElbowAngle = -Math.PI * 0.7;
    }

    targetShoulderAngle -= this.elbowAngle / 2;
    this.shoulderAngle = targetShoulderAngle * (1.0 - jointSmoothingRate) + this.shoulderAngle * jointSmoothingRate;
    this.elbowAngle = targetElbowAngle * (1.0 - jointSmoothingRate) + this.elbowAngle * jointSmoothingRate;
    this.handAngle = this.shoulderAngle + this.elbowAngle;
  }

  this.calculateArmJointCoords = function () {
    //calculates coordinate of right shoulder joint
    this.rightShoulderJoint.x = this.x;
    this.rightShoulderJoint.y = this.y + this.shoulderOffset;

    //calculates coordinate of right elbow joint
	if (aimerX < this.x - (this.torsoSprite.width / 2))
	{
		this.rightElbow.x = -(ARM_SEGMENT_LENGTH * Math.cos(-this.shoulderAngle)) + this.rightShoulderJoint.x;
		this.rightElbow.y = -(ARM_SEGMENT_LENGTH * Math.sin(-this.shoulderAngle)) + this.rightShoulderJoint.y;
	}
	else
	{
		this.rightElbow.x = ARM_SEGMENT_LENGTH * Math.cos(this.shoulderAngle) + this.rightShoulderJoint.x;
		this.rightElbow.y = ARM_SEGMENT_LENGTH * Math.sin(this.shoulderAngle) + this.rightShoulderJoint.y;
	}

    //calculates coordinate point of right hand
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;
  }

  this.calculateArmSpriteCoords = function () {
	//calculates coordinate of upper arm sprite
	this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x) / 2);
	this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y) / 2);
	
	if (aimerX < this.x - (this.torsoSprite.width / 2))
	{
		//calculates coordinate of lower arm sprite
		this.lowerArm.x = this.rightElbow.x - ((this.rightHand.x - this.rightElbow.x) / 2);
		this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);
	}
	else
	{
		//calculates coordinate of lower arm sprite
		this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
		this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);
	}
  }

  this.drawHat = function (x, y, ang) {
	if (aimerX < this.x - (this.torsoSprite.width / 2))
	{
		drawImageCenteredAtLocationWithRotation(cowboyHatLeftPic, x, y, -ang);
	}
	else
	{
		drawImageCenteredAtLocationWithRotation(cowboyHatRightPic, x, y, ang);
	}
  }

  this.drawWeapon = function (x, y) {
    if (aimerX < this.x - (this.torsoSprite.width / 2))
    {
      drawImageCenteredAtLocationWithRotation(weaponPic, x, y, this.handAngle); //TODO: add rotation angle
    }
    else
    {
      drawImageCenteredAtLocationWithRotation(weaponPic, x, y, this.handAngle); //TODO: add rotation angle
    }
  }

  this.nextPathNode = function () {
    if (this.path.length > 0) {
      this.destinationXCoord = xCoordAtCenterOfCol(this.path[0].x);
      this.destinationYCoord = yCoordAtCenterOfRow(this.path[0].y);
      this.path.shift();
      moveAutoPan(this.destinationXCoord, this.destinationYCoord);
    }
  }

  this.fireWeapon = function () {
    if (!debugMode) {
      this.actionsRemaining--;
    }
    this.hasFired = true;
    projectileAlive = true;
    bulletT = 0.0;
    ricochetCount = 0;
    damageAvailable = true;
  }

  this.handleClick = function () {
    if (this.isActive && this.actionsRemaining > 0 && !this.hasFired) {
      if (isInAimMode) {
        this.fireWeapon();
      } else {
        if (!debugMode) {
          this.actionsRemaining--;
        }
        this.path = currentPath;
        this.nextPathNode();
      }

    }
  }

  this.characterReset = function () {
    this.actionsRemaining = ACTIONS_PER_TURN;
    this.deactivateCharacter();
  }

  this.activateCharacter = function () {
    // camPanX = this.x - canvas.width / 2;
    // camPanY = this.y - canvas.height / 2;

    let panX = this.x - canvas.width / 2,
      panY = this.y - canvas.height / 2;

    beginAutoPanTo(panX, panY);
    this.isActive = true;
  }

  this.deactivateCharacter = function () {
    this.isActive = false;
  }

  this.setCharacterSprites = function () {
    if (this.team === 'PLAYER_TEAM') {
      this.upperArmPic = characterUpperArmPic;
      this.upperArmPicUsed = characterUpperArmPic_used;
      this.upperArmPicInactive = characterUpperArmPic_inActive;
      this.lowerArmPic = characterLowerArmPic;
      this.lowerArmPicUsed = characterLowerArmPic_used;
      this.lowerArmPicInactive = characterLowerArmPic_inActive;
      this.bodyRightPic = characterBodyRightPic;
      this.bodyRightPicUsed = characterBodyRightPic_used;
      this.bodyRightPicInactive = characterBodyRightPic_inActive;
      this.bodyLeftPic = characterBodyLeftPic;
      this.bodyLeftPicUsed = characterBodyLeftPic_used;
      this.bodyLeftPicInactive = characterBodyLeftPic_inActive;
    } else if (this.team === 'ENEMY_TEAM') {
      this.upperArmPic = enemyUpperArmPic;
      this.upperArmPicUsed = enemyUpperArmPic;
      this.upperArmPicInactive = enemyUpperArmPic;
      this.lowerArmPic = enemyLowerArmPic;
      this.lowerArmPicUsed = enemyLowerArmPic;
      this.lowerArmPicInactive = enemyLowerArmPic;
      this.bodyRightPic = enemyBodyRightPic;
      this.bodyRightPicUsed = enemyBodyRightPic;
      this.bodyRightPicInactive = enemyBodyRightPic;
      this.bodyLeftPic = enemyBodyLeftPic;
      this.bodyLeftPicUsed = enemyBodyLeftPic;
      this.bodyLeftPicInactive = enemyBodyLeftPic;
    }
  }

}