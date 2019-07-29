const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;

function characterClass(character_team, character_color) {

  this.team = character_team;
  this.color = character_color;
  this.characterY = 75;
  this.characterX = 75;
  this.characterSpeedX = 0;
  this.characterSpeedY = 0;
  this.characterOnGround = false;
  this.destinationCol;
  this.destinationRow;
  this.destinationXCoord;
  this.destinationYCoord;
  this.isActive = false;
  this.actionsRemaining = ACTIONS_PER_TURN;
  this.shoulderAngle = Math.PI;
  this.elbowAngle = -Math.PI/3;

  this.leftShoulderJoint = {x: 0, y: 0}
  this.rightShoulderJoint = {x: 0, y: 0}
  this.leftElbow = {x: 0 , y: 0};
  this.rightElbow = {x: 0 , y: 0};
  this.leftHand = {x: 0 , y: 0};
  this.rightHand = {x: 0 , y: 0};

  this.distShoulderToHand;

  this.drawCharacter = function () {
    colorRect(this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2), CHARACTER_WIDTH, CHARACTER_HEIGHT, character_color);
    
    var bicepLength = ARM_SEGMENT_LENGTH;
    var forarmLength = ARM_SEGMENT_LENGTH;
    
    var jointX = this.characterX;
    var jointY = this.characterY;
    var limbAng = 0;
    limbAng += this.shoulderAngle;
    var limbX = bicepLength*Math.cos(limbAng);
    var limbY = bicepLength*Math.sin(limbAng);


    colorLine( jointX, jointY, jointX + limbX, jointY + limbY, 'yellow');

    jointX += limbX;
    jointY += limbY;
    limbAng += this.elbowAngle
    limbX = bicepLength*Math.cos(limbAng);
    limbY = bicepLength*Math.sin(limbAng);

    colorLine( jointX, jointY, jointX + limbX, jointY + limbY, 'cyan');
  }

  this.characterMove = function () {

    /*
    this.distShoulderToHand = DistanceBetweenPoints(mousePos.x, mousePos.y, character1.characterX, character1.characterY);
    if (this.distShoulderToHand > (ARM_SEGMENT_LENGTH*2)){
      this.distShoulderToHand = ARM_SEGMENT_LENGTH*2;
    }
    */
   this.characterX += this.characterSpeedX; // move the character based on its current horizontal speed 
   this.characterY += this.characterSpeedY; // same as above, but for vertical

    if (this.characterOnGround) {
      this.characterSpeedX *= GROUND_FRICTION;
    } else {
      this.characterSpeedX *= AIR_RESISTANCE;
      this.characterSpeedY += GRAVITY;
      if (this.characterSpeedY > CHARACTER_HEIGHT) { // cheap test to ensure can't fall through floor
        this.characterSpeedY = CHARACTER_HEIGHT;
      }
    }

    this.destinationXCoord = colCenterCoord(this.destinationCol);

    if (this.characterX > this.destinationXCoord) {
      if ((this.characterX - RUN_SPEED) < this.destinationXCoord) {
        this.characterX = this.destinationXCoord;
        this.characterSpeedX = 0;
      } else {
        this.characterSpeedX = -RUN_SPEED
      }
    }

    if (this.characterX < this.destinationXCoord) {
      if ((this.characterX + RUN_SPEED) > this.destinationXCoord) {
        this.characterX = this.destinationXCoord;
        this.characterSpeedX = 0;
      } else {
        this.characterSpeedX = RUN_SPEED;
      }
    }

    if (this.characterSpeedY < 0 && isBrickAtPixelCoord(this.characterX, this.characterY - (CHARACTER_HEIGHT / 2)) == 1) {
      this.characterY = (Math.floor(this.characterY / BRICK_H)) * BRICK_H + (CHARACTER_HEIGHT / 2);
      this.characterSpeedY = 0.0;
    }

    if (this.characterSpeedY > 0 && isBrickAtPixelCoord(this.characterX, this.characterY + (CHARACTER_HEIGHT / 2)) == 1) {
      this.characterY = (1 + Math.floor(this.characterY / BRICK_H)) * BRICK_H - (CHARACTER_HEIGHT / 2);
      this.characterOnGround = true;
      this.characterSpeedY = 0;
    } else if (isBrickAtPixelCoord(this.characterX, this.characterY + (CHARACTER_HEIGHT / 2) + 2) == 0) {
      this.characterOnGround = false;
    }

    if (this.characterSpeedX < 0 && isBrickAtPixelCoord(this.characterX - (CHARACTER_WIDTH / 2), this.characterY) == 1) {
      this.characterX = (Math.floor(this.characterX / BRICK_W)) * BRICK_W + (CHARACTER_WIDTH / 2);
    }
    if (this.characterSpeedX > 0 && isBrickAtPixelCoord(this.characterX + (CHARACTER_WIDTH / 2), this.characterY) == 1) {
      this.characterX = (1 + Math.floor(this.characterX / BRICK_W)) * BRICK_W - (CHARACTER_WIDTH / 2);
    }

    var targetShoulderAngle = 0;
    var targetElbowAngle = 0;
    var jointSmoothingRate = 0.85;

    if (isAiming && this.isActive){
      targetShoulderAngle = Math.atan2(mousePos.y - this.characterY, mousePos.x - this.characterX);
      targetElbowAngle = -Math.PI/3;
      targetShoulderAngle -= this.elbowAngle/2;
    } else {
      targetShoulderAngle = Math.PI*0;
      targetElbowAngle = -Math.PI*0.7;
      targetShoulderAngle -= this.elbowAngle/2;
    }

    this.shoulderAngle = targetShoulderAngle* (1.0 - jointSmoothingRate) + this.shoulderAngle * jointSmoothingRate;
    this.elbowAngle = targetElbowAngle* (1.0 - jointSmoothingRate) + this.elbowAngle * jointSmoothingRate;

  }

  this.setCharacterDestination = function () {
    if (this.isActive && this.actionsRemaining > 0) {
      this.destinationCol = colAtXCoord(mousePos.x);
      this.destinationRow = rowAtYCoord(mousePos.y);
      this.actionsRemaining--;
    }
  }

  this.characterSpawn = function () {
    // center character on screen
    this.characterX = canvas.width / 2;
    this.characterY = canvas.height / 2;
    allCharacters.push(this);

    //this.leftShoulderJoint = {x: characterX, y: characterY}
    //this.rightShoulderJoint = {x: characterX, y: characterY}
    this.leftElbow = {x: 0 , y: 0};
    this.rightElbow = {x: 0 , y: 0};
    this.leftHand = {x: 0 , y: 0};
    this.rightHand = {x: 0 , y: 0};
  }

  this.characterReset = function () {
    this.actionsRemaining = ACTIONS_PER_TURN;
    this.deactivateCharacter();
  }

  this.activateCharacter = function(){
    this.isActive = true;
  }

  this.deactivateCharacter = function(){
    this.isActive = false;
  }
}