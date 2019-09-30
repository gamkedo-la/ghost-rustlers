characterClass.prototype = new destructableObjectClass();
characterClass.prototype.constructor = characterClass;

const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const RUN_SPEED = 4.0;
const JUMP_SPEED = 1.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;
var isInAimMode = false;
var projectileAlive = true;
var damageAvailable = true;

function characterClass(character_team, character_color) {

  this.actionsRemaining = ACTIONS_PER_TURN;
  this.team = character_team;
  this.color = character_color;
  this.speedX = 0;
  this.speedY = 0;
  this.path = [];
  this.destinationXCoord;
  this.destinationYCoord;
  this.shoulderOffset = -CHARACTER_HEIGHT / 4;
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

  this.drawCharacter = function () {

    //Here's another method that might look better than the tinted sprite approach.
    //To test this, uncomment this and the last line, and set the inActiveColor and usedColor to #00000000 in the Assets.js.

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

    if (this.actionsRemaining <= 0) {
      canvasContext.globalCompositeOperation = "darken";
    } else if (!this.isActive) {
      canvasContext.globalCompositeOperation = "overlay";
    }

    if (aimerX < this.x - (CHARACTER_WIDTH / 2)) {
      canvasContext.drawImage((this.actionsRemaining <= 0 ? this.bodyLeftPicUsed : (this.isActive ? this.bodyLeftPic : this.bodyLeftPicInactive)), this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
    } else {
      canvasContext.drawImage((this.actionsRemaining <= 0 ? this.bodyRightPicUsed : (this.isActive ? this.bodyRightPic : this.bodyRightPicInactive)), this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
    }

    //Draw stylish cowboy hat
    if (this.team == 'PLAYER_TEAM'){
      drawImageCenteredAtLocationWithRotation(cowboyHatPic, this.x, this.y - CHARACTER_HEIGHT / 3, 1.9 * Math.PI);
    }

    drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.upperArmPicUsed : (this.isActive ? this.upperArmPic : this.upperArmPicInactive)), this.upperArm.x, this.upperArm.y, this.shoulderAngle)
    drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? this.lowerArmPicUsed : (this.isActive ? this.lowerArmPic : this.lowerArmPicInactive)), this.lowerArm.x, this.lowerArm.y, this.handAngle)

    if (this.isActive){
      if (isInAimMode || this.hasFired) {
        drawProjectileTrajectory(this);
      } else {
        projectileAlive = false;
      }
    }
    /*
    if ((isInAimMode && this.isActive) || this.hasFired) {
      drawProjectileTrajectory(this);
    } else if (this.isActive) {
      projectileAlive = false;
    }
*/
    if (this.hasFired) {

      if (ricochetCount <= MAX_RICOCHETS) {
        drawProjectile(trajectoryPaths[ricochetCount].x1, trajectoryPaths[ricochetCount].y1, trajectoryPaths[ricochetCount].x2, trajectoryPaths[ricochetCount].y2);
      } else {
        this.hasFired = false;
        bulletT = MAX_BULLET_T;
      }
    }

    canvasContext.globalCompositeOperation = "source-over";
  }

  this.characterMove = function () {

    this.x += this.speedX; // move the character based on its current horizontal speed 
    this.y += this.speedY; // same as above, but for vertical

    if (this.isOnGround || this.isClimbing) {
      this.speedX *= GROUND_FRICTION;
    } else {
      this.speedX *= AIR_RESISTANCE;
      this.speedY += GRAVITY;
      if (this.speedY > CHARACTER_HEIGHT) { // cheap test to ensure can't fall through floor
        this.speedY = CHARACTER_HEIGHT;
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
    } else if (this.isClimbing && this.destinationYCoord - BRICK_H / 2 > this.y && Math.abs(this.x - this.destinationXCoord) <= BRICK_H / 2) {
      this.speedY = RUN_SPEED;
    } else if (this.isClimbing) {
      this.speedY = 0;
    }

    //Solid tile above
    if (!this.isClimbing && this.speedY < 0 && isSolidTileAtPixelCoord(this.x, this.y - (CHARACTER_HEIGHT / 2))) {
      this.y = (Math.floor(this.y / BRICK_H)) * BRICK_H + (CHARACTER_HEIGHT / 2);
      this.speedY = 0.0;
    }

    //Solid tile below
    if (!this.isClimbing && this.speedY > 0 && isSolidTileAtPixelCoord(this.x, this.y + (CHARACTER_HEIGHT / 2))) {
      this.y = (1 + Math.floor(this.y / BRICK_H)) * BRICK_H - (CHARACTER_HEIGHT / 2);
      this.isOnGround = true;
      this.speedY = 0;
    } else if (!isSolidTileAtPixelCoord(this.x, this.y + (CHARACTER_HEIGHT / 2) + 2)) {
      this.isOnGround = false;
    }

    //Solid tile left
    if (this.speedX < 0 && isSolidTileAtPixelCoord(this.x - (CHARACTER_WIDTH / 2), this.y)) {
      this.x = (Math.floor(this.x / BRICK_W)) * BRICK_W + (CHARACTER_WIDTH / 2);
    }
    //Solid tile right
    if (this.speedX > 0 && isSolidTileAtPixelCoord(this.x + (CHARACTER_WIDTH / 2), this.y)) {
      this.x = (1 + Math.floor(this.x / BRICK_W)) * BRICK_W - (CHARACTER_WIDTH / 2);
    }

    this.moveArms();
    this.animateArmAiming();
  }

  this.moveArms = function () {
    //sets location of shoulder joints
    this.rightShoulderJoint.x = this.x;
    this.rightShoulderJoint.y = this.y + this.shoulderOffset;

    //Positions upper arm
    this.rightElbow.x = ARM_SEGMENT_LENGTH * Math.cos(this.shoulderAngle) + this.rightShoulderJoint.x;
    this.rightElbow.y = ARM_SEGMENT_LENGTH * Math.sin(this.shoulderAngle) + this.rightShoulderJoint.y;

    this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x) / 2);
    this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y) / 2);

    //Positions lower arm
    this.handAngle = this.shoulderAngle + this.elbowAngle;
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

    this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
    this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);
  }

  this.nextPathNode = function () {
    if (this.path.length > 0) {
      this.destinationXCoord = xCoordAtCenterOfCol(this.path[0].x);
      this.destinationYCoord = yCoordAtCenterOfRow(this.path[0].y);
      this.path.shift();
      this.moveAutoPan();
    }
  }

  this.moveAutoPan = function () {
    let panDeltaX = this.destinationXCoord - canvas.width / 2 - camPanX,
      panDeltaY = this.destinationYCoord - canvas.height / 2 - camPanY;

    if (Math.abs(panDeltaX) > DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      panDeltaX += panDeltaX > 0 ? -DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X : DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X;
      beginAutoPanTo(camPanX + panDeltaX, null)
    }
    if (Math.abs(panDeltaY) > DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      panDeltaY += panDeltaY > 0 ? -DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y : DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y;
      beginAutoPanTo(null, camPanY + panDeltaY);
    }
  }

  this.animateArmAiming = function () {
    var targetShoulderAngle = 0;
    var targetElbowAngle = 0;
    var jointSmoothingRate = 0.65;

    //sets angles of arm segments
    if (isInAimMode && this.isActive) {
      if (aimerX < this.x - (CHARACTER_WIDTH / 2)) {
        targetShoulderAngle = Math.atan2(aimerY - this.rightShoulderJoint.y, aimerX - this.rightShoulderJoint.x);
        targetElbowAngle = Math.PI / 6;
      }
      else {
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

}