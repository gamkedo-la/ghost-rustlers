const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const GRAVITY = 0.6;
const JUMP_SPEED = 1.6;
const ACTIONS_PER_TURN = 2;
const ARM_SEGMENT_LENGTH = 50;
const MAX_BULLET_T = 1.0;
const MAX_RICOCHETS = 2;
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;
var isInAimMode = false;
var ricochetCount = 0;
var projectileAlive = true;
var damageAvailable = true;
var trajectoryPaths = [];

function characterClass(character_team, character_color) {

  this.x = 75;
  this.y = 75;
  this.health = 8;
  this.maxHealth = 8;
  this.actionsRemaining = ACTIONS_PER_TURN;
  this.team = character_team;
  this.color = character_color;
  this.speedX = 0;
  this.speedY = 0;
  this.path = [];
  this.destinationCol;
  this.destinationRow;
  this.destinationXCoord;
  this.destinationYCoord;
  this.shoulderAngle = 0;
  this.elbowAngle = 0;
  this.handAngle = 0;
  this.bulletT = MAX_BULLET_T;
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

  this.distShoulderToHand;

  this.drawCharacter = function () {

    //Here's another method that might look better than the tinted sprite approach.
    //To test this, uncomment this and the last line, and set the inActiveColor and usedColor to #00000000 in the Assets.js.

    if (this.actionsRemaining <= 0) {
      canvasContext.globalCompositeOperation = "darken";
    } else if (!this.isActive) {
      canvasContext.globalCompositeOperation = "overlay";
    }

    if (characterBodyRightPicLoaded && characterBodyLeftPicLoaded) {
      if (aimerX < this.x - (CHARACTER_WIDTH / 2)) {
        canvasContext.drawImage((this.actionsRemaining <= 0 ? characterBodyLeftPic_used : (this.isActive ? characterBodyLeftPic : characterBodyLeftPic_inActive)), this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
      } else {
        canvasContext.drawImage((this.actionsRemaining <= 0 ? characterBodyRightPic_used : (this.isActive ? characterBodyRightPic : characterBodyRightPic_inActive)), this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
      }
    }
    //Draw stylish cowboy hat
    drawImageCenteredAtLocationWithRotation(cowboyHatPic, this.x, this.y - CHARACTER_HEIGHT/3, 1.9 * Math.PI);

    //sets location of shoulder joints
    this.rightShoulderJoint.x = this.x;
    this.rightShoulderJoint.y = this.y - (CHARACTER_HEIGHT / 4);

    //draws upper arm
    this.rightElbow.x = ARM_SEGMENT_LENGTH * Math.cos(this.shoulderAngle) + this.rightShoulderJoint.x;
    this.rightElbow.y = ARM_SEGMENT_LENGTH * Math.sin(this.shoulderAngle) + this.rightShoulderJoint.y;

    this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x) / 2);
    this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y) / 2);

    if (characterUpperArmPicLoaded) {
      drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? characterUpperArmPic_used : (this.isActive ? characterUpperArmPic : characterUpperArmPic_inActive)), this.upperArm.x, this.upperArm.y, this.shoulderAngle)
    }

    //draws lower arm
    this.handAngle = this.shoulderAngle + this.elbowAngle;
    this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
    this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

    this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
    this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);

    if (characterLowerArmPicLoaded) {
      drawImageCenteredAtLocationWithRotation((this.actionsRemaining <= 0 ? characterLowerArmPic_used : (this.isActive ? characterLowerArmPic : characterLowerArmPic_inActive)), this.lowerArm.x, this.lowerArm.y, this.handAngle)
    }

    //if (this.bulletT < MAX_BULLET_T) {
    //this.hasFired = true;
    //} else {
    //this.hasFired = false;
    //}

    if (isInAimMode && this.isActive || this.hasFired) {
      this.drawProjectileTrajectory();
    }

    if (this.hasFired) {

      if (ricochetCount <= MAX_RICOCHETS) {
        this.drawProjectile(trajectoryPaths[ricochetCount].x1, trajectoryPaths[ricochetCount].y1, trajectoryPaths[ricochetCount].x2, trajectoryPaths[ricochetCount].y2);
      } else {
        this.hasFired = false;
        this.bulletT = MAX_BULLET_T;
      }

    }

    canvasContext.globalCompositeOperation = "source-over";
  }

  this.drawProjectile = function (fromX, fromY, toX, toY) {
    if (projectileAlive) {
      drawBulletOnLine(fromX, fromY, toX, toY, this.bulletT);
      if (this.bulletT >= MAX_BULLET_T) {
        this.bulletT = 0;
        ricochetCount++;
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
    if (this.x === this.destinationXCoord && Math.abs(this.y - this.destinationYCoord) <= BRICK_H/2) {
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
    } else if (this.isClimbing && this.destinationYCoord - BRICK_H/2 > this.y && Math.abs(this.x - this.destinationXCoord) <= BRICK_H/2) {
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

    this.animateArmAiming();
  }

  this.nextPathNode = function() {
    if (this.path.length > 0) {
      this.destinationCol = this.path[0].x;
      this.destinationRow = this.path[0].y;
      this.destinationXCoord = xCoordAtCenterOfCol(this.destinationCol);
      this.destinationYCoord = yCoordAtCenterOfRow(this.destinationRow);      
      this.path.shift();
      this.moveAutoPan();
    }
  }

  this.moveAutoPan = function() {
    let panDeltaX = this.destinationXCoord - canvas.width/2 - camPanX,
        panDeltaY = this.destinationYCoord - canvas.height/2 - camPanY;

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
    if (this.hasFired) {
      var lineLength = DistanceBetweenTwoPixelCoords(aimFromX, aimFromY, aimToX, aimToY);
      this.bulletT += MAX_BULLET_T / lineLength;
    } else {
      aimToX = aimerX;
      aimToY = aimerY;
    }

    if (this.isActive && !this.hasFired) {
      aimFromX = Math.floor(this.rightHand.x);
      aimFromY = Math.floor(this.rightHand.y);
      aimColor = 'red';

      var intersectionData;
      var ricochetAngle;

      //calculate each ricochet point and trajectory line 
      for (i = 0; i <= MAX_RICOCHETS; i++) {

        var prevIndex = i - 1;
        var intersectingEdge;

        if (trajectoryPaths[i] === undefined) {
          trajectoryPaths.push({
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1,
            angle: 0
          });
        }

        if (i === 0) {
          trajectoryPaths[i].x1 = aimFromX;
          trajectoryPaths[i].y1 = aimFromY;
          trajectoryPaths[i].x2 = aimToX;
          trajectoryPaths[i].y2 = aimToY;
        } else {
          trajectoryPaths[i].x1 = trajectoryPaths[prevIndex].x2;
          trajectoryPaths[i].y1 = trajectoryPaths[prevIndex].y2;
          trajectoryPaths[i].x2 = 1000 * Math.cos(ricochetAngle) + trajectoryPaths[i].x1;
          trajectoryPaths[i].y2 = 1000 * Math.sin(ricochetAngle) + trajectoryPaths[i].y1;
        }

        trajectoryPaths[i].angle = angleFromLine(trajectoryPaths[i]);

        intersectingEdge = undefined;

        //find a wall edge that intersects the trajectory line.
        //TODO: find only the closest wall edge if more than one intersect the trajectory line.
        wallEdges.forEach(function (wallEdge) {
          intersectionData = getLineIntersection(trajectoryPaths[i], wallEdge);
          if (intersectionData.linesIntersect) {
            intersectingEdge = wallEdge;
            if (intersectingEdge != undefined) {
              trajectoryPaths[i].x2 = intersectionData.x;
              trajectoryPaths[i].y2 = intersectionData.y;
              ricochetAngle = angleOfReflection(trajectoryPaths[i], intersectingEdge);
            }
          }
        })

      }
    }

    //draw each trajectory path.
    for (i = 0; i < trajectoryPaths.length; i++) {
      colorLine(trajectoryPaths[i].x1, trajectoryPaths[i].y1, trajectoryPaths[i].x2, trajectoryPaths[i].y2, aimColor);
    }

  }

  this.fireWeapon = function () {
    this.hasFired = true;
    this.bulletT = 0.0;
    ricochetCount = 0;
    damageAvailable = true;
  }

  this.handleClick = function () {
    if (this.isActive && this.actionsRemaining > 0 && !this.hasFired) {
      if (isInAimMode) {
        this.fireWeapon();
      } else {
        this.path = currentPath;
        this.nextPathNode();
      }
      if (!debugMode){
        this.actionsRemaining--;
      }
    }
  }

  this.characterSpawn = function () {
    // center character on screen
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    allCharacters.push(this);

    //this.leftShoulderJoint = {x: x, y: y}
    //this.rightShoulderJoint = {x: x, y: y}
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

function drawBulletOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;
  //var ricochetCount = 0;

  if (isWallTileAtPixelCoord(positionNowX, positionNowY) == 1) {
    //ricochetCount++;
  }

  if (ricochetCount > MAX_RICOCHETS) {
    character1.bulletT = MAX_BULLET_T;
    character2.bulletT = MAX_BULLET_T;
  } else {

    colorCircle(positionNowX, positionNowY, 5, 'white');
    checkForCollisionAgainstEnemy(positionNowX, positionNowY);
  }
}

//this function will adjust in the feature when enemy lists and bullet classes are created
function checkForCollisionAgainstEnemy(positionNowX, positionNowY) {
  if (positionNowX > enemy1.x && //check left side
    positionNowX < enemy1.x + enemy1.width && // check right side
    positionNowY > enemy1.y && // check top side
    positionNowY < enemy1.y + enemy1.height) { // check bottom side
    if (damageAvailable) {
      enemy1.health--;
      damageAvailable = false;
      console.log("Hit! Enemy1's Health: " + enemy1.health);
    }
  }
}