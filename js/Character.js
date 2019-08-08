const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const GRAVITY = 0.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;

function characterClass(character_team, character_color) {

  this.health = 8;
  this.maxHealth = 8;
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
  this.shoulderAngle = 0;
  this.elbowAngle = 0;
  this.handAngle = 0;

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

  this.distShoulderToHand;

  this.drawCharacter = function () {
    //colorRect(this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2), CHARACTER_WIDTH, CHARACTER_HEIGHT, character_color);

    if (characterBodyRightPicLoaded && characterBodyLeftPicLoaded) {
      if (mousePos.x < this.characterX - (CHARACTER_WIDTH / 2)) {
        canvasContext.drawImage(characterBodyLeftPic, this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2))
      } else {
        canvasContext.drawImage(characterBodyRightPic, this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2))
      }
    }

    //sets location of shoulder joints
    this.rightShoulderJoint.x = this.characterX;
    this.rightShoulderJoint.y = this.characterY - (CHARACTER_HEIGHT / 4);

    //draws upper arm
    this.rightElbow.x = ARM_SEGMENT_LENGTH * Math.cos(this.shoulderAngle) + this.rightShoulderJoint.x;
    this.rightElbow.y = ARM_SEGMENT_LENGTH * Math.sin(this.shoulderAngle) + this.rightShoulderJoint.y;

    //this.upperArm = (this.rightElbow - this.rightShoulderJoint)/2;

    this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x)/2);
    this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y)/2);

    //console.log(this.upperArm.x);
    //console.log(this.upperArm.y);

    //colorLine(this.rightShoulderJoint.x, this.rightShoulderJoint.y, this.rightElbow.x, this.rightElbow.y, 'yellow'); //draws line between the shoulder and elbow
    drawImageCenteredAtLocationWithRotation(characterUpperArmPic, this.upperArm.x, this.upperArm.y, this.shoulderAngle)

    //draws lower arm
    this.handAngle = this.shoulderAngle + this.elbowAngle;
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

    this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x)/2);
    this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y)/2);

    //colorLine(this.rightElbow.x, this.rightElbow.y, this.rightHand.x, this.rightHand.y, 'cyan'); //draws line between the elbow and hand
    drawImageCenteredAtLocationWithRotation(characterLowerArmPic, this.lowerArm.x, this.lowerArm.y, this.handAngle)
}

  this.characterMove = function () {

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
    var jointSmoothingRate = 0.65;

    //sets angles of arm segments
    if (isAiming && this.isActive) {
      targetShoulderAngle = Math.atan2(mousePos.y - this.rightShoulderJoint.y, mousePos.x - this.rightShoulderJoint.x);
      targetElbowAngle = -Math.PI / 6;
    } else {
      targetShoulderAngle = Math.PI * 0;
      targetElbowAngle = -Math.PI * 0.7;
    }

    targetShoulderAngle -= this.elbowAngle / 2;
    this.shoulderAngle = targetShoulderAngle * (1.0 - jointSmoothingRate) + this.shoulderAngle * jointSmoothingRate;
    this.elbowAngle = targetElbowAngle * (1.0 - jointSmoothingRate) + this.elbowAngle * jointSmoothingRate;

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
  }

  this.characterReset = function () {
    this.actionsRemaining = ACTIONS_PER_TURN;
    this.deactivateCharacter();
  }

  this.activateCharacter = function () {
    this.isActive = true;
  }

  this.deactivateCharacter = function () {
    this.isActive = false;
  }
}