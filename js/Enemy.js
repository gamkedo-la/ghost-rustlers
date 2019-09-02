enemyClass.prototype = new characterClass('ENEMY_TEAM', 'white');

function enemyClass(enemyTeam, enemyColor) {
    this.x = 79;
    this.y = 75;
    this.height = 136;
    this.width = 64;
    this.health = 8;
    this.isOnGround;
	this.hasFired = false;
	this.movementDetermined = false;


    this.drawCharacter = function() {
        if (enemyBodyRightPicLoaded && enemyBodyLeftPicLoaded) {
            if (aimerX < this.x - (CHARACTER_WIDTH / 2)) {
                canvasContext.drawImage(enemyBodyLeftPic, this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
            } else {
                canvasContext.drawImage(enemyBodyRightPic, this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
            }
        }

        //sets location of shoulder joints
        this.rightShoulderJoint.x = this.x;
        this.rightShoulderJoint.y = this.y - (CHARACTER_HEIGHT / 4) + 30;

        //draws upper arm
        this.rightElbow.x = ARM_SEGMENT_LENGTH * Math.cos(this.shoulderAngle) + this.rightShoulderJoint.x;
        this.rightElbow.y = ARM_SEGMENT_LENGTH * Math.sin(this.shoulderAngle) + this.rightShoulderJoint.y;

        this.upperArm.x = this.rightShoulderJoint.x + ((this.rightElbow.x - this.rightShoulderJoint.x) / 2);
        this.upperArm.y = this.rightShoulderJoint.y + ((this.rightElbow.y - this.rightShoulderJoint.y) / 2);

        if (enemyUpperArmPicLoaded) {
            drawImageCenteredAtLocationWithRotation(enemyUpperArmPic, this.upperArm.x, this.upperArm.y, this.shoulderAngle)
        }

        //draws lower arm
        this.handAngle = this.shoulderAngle + this.elbowAngle;
        this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
        this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

        this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
        this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);

        if (enemyLowerArmPicLoaded) {
            drawImageCenteredAtLocationWithRotation(enemyLowerArmPic, this.lowerArm.x, this.lowerArm.y, this.handAngle)
        }

        if (this.bulletT < MAX_BULLET_T) {
            this.hasFired = true;
        } else {
            this.hasFired = false;
        }

        if (isInAimMode && this.isActive || this.hasFired) {
            this.drawProjectileTrajectory();
        }

        if (this.hasFired) {
            this.drawProjectile();
        }

        this.drawProjectileTrajectory = function() {
            if (this.hasFired) {
                var lineLength = DistanceBetweenTwoPixelCoords(aimFromX, aimFromY, aimToX, aimToY);
                this.bulletT += MAX_BULLET_T / lineLength;
            } else {
                aimToX = aimerX;
                aimToY = aimerY;
            }
        }
    }

    //canvasContext.globalCompositeOperation  = "source-over";

    this.enemyMove = function() {

        this.x += this.speedX; // move the enemy based on its current horizontal speed 
        this.y += this.speedY; // same as above, but for vertical

        if (this.isOnGround) {
            this.speedX *= GROUND_FRICTION;
        } else {
            this.speedX *= AIR_RESISTANCE;
            this.speedY += GRAVITY;
            if (this.speedY > CHARACTER_HEIGHT) { // cheap test to ensure can't fall through floor
                this.speedY = CHARACTER_HEIGHT;
            }
        }

        this.AI_Distination;

        this.AI_Movement();
        this.destinationXCoord = xCoordAtCenterOfCol(this.AI_Distination);

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

        if (this.speedY < 0 && isWallTileAtPixelCoord(this.x, this.y - (CHARACTER_HEIGHT / 2)) == 1) {
            this.y = (Math.floor(this.y / BRICK_H)) * BRICK_H + (CHARACTER_HEIGHT / 2);
            this.speedY = 0.0;
        }

        if (this.speedY > 0 && isWallTileAtPixelCoord(this.x, this.y + (CHARACTER_HEIGHT / 2)) == 1) {
            this.y = (1 + Math.floor(this.y / BRICK_H)) * BRICK_H - (CHARACTER_HEIGHT / 2);
            this.isOnGround = true;
            this.speedY = 0;
        } else if (isWallTileAtPixelCoord(this.x, this.y + (CHARACTER_HEIGHT / 2) + 2) == 0) {
            this.isOnGround = false;
        }

        if (this.speedX < 0 && isWallTileAtPixelCoord(this.x - (CHARACTER_WIDTH / 2), this.y) == 1) {
            this.x = (Math.floor(this.x / BRICK_W)) * BRICK_W + (CHARACTER_WIDTH / 2);
        }
        if (this.speedX > 0 && isWallTileAtPixelCoord(this.x + (CHARACTER_WIDTH / 2), this.y) == 1) {
            this.x = (1 + Math.floor(this.x / BRICK_W)) * BRICK_W - (CHARACTER_WIDTH / 2);
        }

        this.animateArmAiming();

    }

    this.AI_Movement = function() {
		if(!this.movementDetermined){
			this.AI_Distination = Math.floor(Math.random() * 15);
			this.movementDetermined = true;
		}
        if (this.x == this.destinationXCoord && !this.hasFired) { 
            var shotAtWhichPlayer = Math.floor(Math.random() * 2);
            if (shotAtWhichPlayer == 1) {
                this.handleClick(); //shot 
                this.fireWeapon();
				console.log("Shot at Character 1");
				endEnemyTurn();
            } else {
                this.handleClick(); //shot 
                this.fireWeapon();
				console.log("Shot at Character 2");
				endEnemyTurn();
            }

        }

    }
}