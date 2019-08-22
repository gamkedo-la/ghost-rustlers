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
var maxRicochets = 1;
var ricochetCount = 0;

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

    //Here's another method that might look better than the tinted sprite approach.
    //To test this, uncomment this and the last line, and set the inActiveColor and usedColor to #00000000 in the Assets.js.
    /*
    if(this.actionsRemaining <= 0)
    {
    	canvasContext.globalCompositeOperation  = "darken";
    }
    else if(!this.isActive)
    {
    	canvasContext.globalCompositeOperation = "overlay";
    }
    */

    if (characterBodyRightPicLoaded && characterBodyLeftPicLoaded) {
      if (aimerX < this.characterX - (CHARACTER_WIDTH / 2)) {
        canvasContext.drawImage((this.actionsRemaining <= 0 ? characterBodyLeftPic_used : (this.isActive ? characterBodyLeftPic : characterBodyLeftPic_inActive)), this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2));
      } else {
        canvasContext.drawImage((this.actionsRemaining <= 0 ? characterBodyRightPic_used : (this.isActive ? characterBodyRightPic : characterBodyRightPic_inActive)), this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2));
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

    drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? characterUpperArmPic_used : (this.isActive ? characterUpperArmPic : characterUpperArmPic_inActive)), this.upperArm.x, this.upperArm.y, this.shoulderAngle)

    //draws lower arm
    this.handAngle = this.shoulderAngle + this.elbowAngle;
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

    this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
    this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);

    drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? characterLowerArmPic_used : (this.isActive ? characterLowerArmPic : characterLowerArmPic_inActive)), this.lowerArm.x, this.lowerArm.y, this.handAngle)

    if (this.bulletT < MAX_BULLET_T) {
      this.hasFired = true;
    } else {
      this.hasFired = false;
    }

    if (isAiming && this.isActive || this.hasFired) {
      this.drawProjectileTrajectory();
    }

    if (this.hasFired) {
      this.drawProjectile();
    }

    //canvasContext.globalCompositeOperation  = "source-over";
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

  //Testing - WIP
  //var allWallEdges = new List([]);
  var wallLine1 = {
    x1: 700,
    y1: 100,
    x2: 700,
    y2: 500
  }

  var trajectoryLine1 = {
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 1
  }

  var trajectoryLine2 = {
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 1
  }

  this.drawProjectileTrajectory = function () {
    if (this.hasFired) {
      var lineLength = DistanceBetweenPoints(aimFromX, aimFromY, aimToX, aimToY);
      this.bulletT += 3 / lineLength;
    } else {
      aimToX = aimerX;
      aimToY = aimerY;
    }

    if (this.isActive && !this.hasFired) {
      aimFromX = Math.floor(this.rightHand.x);
      aimFromY = Math.floor(this.rightHand.y);
      aimColor = 'red';

      trajectoryLine1.x1 = aimFromX;
      trajectoryLine1.y1 = aimFromY;
      trajectoryLine1.x2 = aimToX;
      trajectoryLine1.y2 = aimToY;

      var intersectionData = getLineIntersection(trajectoryLine1, wallLine1);
      var ricochetAngle;

      if (intersectionData.linesIntersect) {
        trajectoryLine1.x2 = intersectionData.x;
        trajectoryLine1.y2 = intersectionData.y;

        trajectoryLine2.x1 = intersectionData.x;
        trajectoryLine2.y1 = intersectionData.y;

        //TODO: Fix ricochet angle
        if ((Math.PI - this.handAngle - this.shoulderAngle) > Math.PI){
          ricochetAngle = 2 * (this.handAngle - this.shoulderAngle);
        } else {
          ricochetAngle = 2 * (this.handAngle - this.shoulderAngle);
        }

        trajectoryLine2.x2 = 1000 * Math.cos(ricochetAngle) + trajectoryLine2.x1;
        trajectoryLine2.y2 = 1000 * Math.sin(ricochetAngle) + trajectoryLine2.y1;

      }

      colorLine(trajectoryLine1.x1, trajectoryLine1.y1, trajectoryLine1.x2, trajectoryLine1.y2, aimColor);
      colorLine(trajectoryLine2.x1, trajectoryLine2.y1, trajectoryLine2.x2, trajectoryLine2.y2, aimColor);
      colorLine(wallLine1.x1, wallLine1.y1, wallLine1.x2, wallLine1.y2); //for testing collisions and ricochets

      var intersectionData = getLineIntersection(trajectoryLine1, wallLine1);

    }

  }

  this.fireWeapon = function () {
    this.hasFired = true;
    this.bulletT = 0.0;

  }

  this.handleClick = function () {
    if (this.isActive && this.actionsRemaining > 0 && !this.hasFired) {
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
  var ricochetCount = 0;

  if (isBrickAtPixelCoord(positionNowX, positionNowY) == 1) {
    //ricochetCount++;
  }

  if (ricochetCount > maxRicochets) {
    character1.bulletT = MAX_BULLET_T;
    character2.bulletT = MAX_BULLET_T;
  } else {
    colorCircle(positionNowX, positionNowY, 5, 'white');
  }

}