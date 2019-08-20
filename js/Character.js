const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const GRAVITY = 0.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;
const MAX_BULLET_T = 3.0;
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;
isAiming = false;

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
  this.bulletT = MAX_BULLET_T;
  this.hasFired = false;
  this.isAiming

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

    if (characterBodyRightPicLoaded && characterBodyLeftPicLoaded) {
      if (aimerX < this.characterX - (CHARACTER_WIDTH / 2)) {
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

    this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x) / 2);
    this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y) / 2);

    drawImageCenteredAtLocationWithRotation(characterUpperArmPic, this.upperArm.x, this.upperArm.y, this.shoulderAngle)

    //draws lower arm
    this.handAngle = this.shoulderAngle + this.elbowAngle;
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

    this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
    this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);

    drawImageCenteredAtLocationWithRotation(characterLowerArmPic, this.lowerArm.x, this.lowerArm.y, this.handAngle)

    if (this.bulletT < MAX_BULLET_T) {
      this.hasFired = true;
    } else {
      this.hasFired = false;
    }

    if (isAiming) {
      this.drawProjectileTrajectory();
    }

    if (this.hasFired) {
      this.drawProjectile();
    }
  }

  this.drawProjectile = function () {
    drawBulletOnLine(aimFromX, aimFromY, aimToX, aimToY, this.bulletT);
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
      targetShoulderAngle = Math.atan2(aimerY - this.rightShoulderJoint.y, aimerX - this.rightShoulderJoint.x);
      targetElbowAngle = -Math.PI / 6;
    } else {
      targetShoulderAngle = Math.PI * 0;
      targetElbowAngle = -Math.PI * 0.7;
    }

    targetShoulderAngle -= this.elbowAngle / 2;
    this.shoulderAngle = targetShoulderAngle * (1.0 - jointSmoothingRate) + this.shoulderAngle * jointSmoothingRate;
    this.elbowAngle = targetElbowAngle * (1.0 - jointSmoothingRate) + this.elbowAngle * jointSmoothingRate;

  }

  this.drawProjectileTrajectory = function () {
    if (this.bulletT <= MAX_BULLET_T) {
      var lineLength = DistanceBetweenPoints(aimFromX, aimFromY, aimToX, aimToY);
      this.bulletT += 15 / lineLength;
    } else {
      aimToX = aimerX;
      aimToY = aimerY;
    }

    if (character1.isActive) {
      aimFromX = Math.floor(character1.rightHand.x);
      aimFromY = Math.floor(character1.rightHand.y);
      aimColor = 'red';
    }
    if (character2.isActive) {
      aimFromX = Math.floor(character2.rightHand.x);
      aimFromY = Math.floor(character2.rightHand.y);
      aimColor = 'green';
    }

    colorLine(aimFromX, aimFromY, aimToX, aimToY, aimColor);

  }

  this.fireWeapon = function () {
    this.hasFired = true;
    this.bulletT = 0.0;
    console.log(this.hasFired);
  }

  this.handleClick = function () {
    if (this.isActive && this.actionsRemaining > 0) {
      if (isAiming) {
        this.fireWeapon();
      } else {
        this.destinationCol = colAtXCoord(aimerX);
        this.destinationRow = rowAtYCoord(aimerY);
      }
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

function drawBulletOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;
  var maxRicochets = 0;
  var ricochetCount = 0;

  if (isBrickAtPixelCoord(positionNowX, positionNowY) == 1) {
    ricochetCount++;
  }

  if (ricochetCount > maxRicochets) {
    character1.bulletT = 3.0;
    character2.bulletT = 3.0;
  } else {
    colorCircle(positionNowX, positionNowY, 5, 'white');
  }

}