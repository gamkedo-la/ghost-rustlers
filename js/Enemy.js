enemyClass.prototype = new characterClass('ENEMY_TEAM', 'white');

function enemyClass(enemyTeam, enemyColor) {
    this.x = 100;
    this.y = 75;
    this.height = 136;
    this.width = 64;
    this.health = 8;
    this.isOnGround;
	this.hasFired = false;
    this.movementDetermined = false;
    this.wanderDir = 1;
    this.target = null;
    this.shoulderOffset = 10;


    this.drawCharacter = function() {
        if (this.health <= 0) {
            return;
        }
        
        if (enemyBodyRightPicLoaded && enemyBodyLeftPicLoaded) {
            if (this.wanderDir < 0) {
                canvasContext.drawImage(enemyBodyLeftPic, this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
            } else {
                canvasContext.drawImage(enemyBodyRightPic, this.x - (CHARACTER_WIDTH / 2), this.y - (CHARACTER_HEIGHT / 2));
            }
        }

        if (enemyUpperArmPicLoaded) {
            drawImageCenteredAtLocationWithRotation(enemyUpperArmPic, this.upperArm.x, this.upperArm.y, this.shoulderAngle)
        }

        if (enemyLowerArmPicLoaded) {
            drawImageCenteredAtLocationWithRotation(enemyLowerArmPic, this.lowerArm.x, this.lowerArm.y, this.handAngle)
        }

        if (this.bulletT >= MAX_BULLET_T) {
            this.hasFired = false;
        }

        if (isInAimMode && this.isActive || this.hasFired) {
            this.drawProjectileTrajectory();
        }

        if (this.hasFired) {
            drawProjectile();
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
        if (this.health <= 0) {
            return;
        }

        if (!playersTurn) {
            this.AI_Movement();
        }
        this.characterMove();
    }

    this.handleClick = function() {

    }

    this.checkLineOfSight = function() {
        let currentRow = rowAtYCoord(this.y),
            p1Row = rowAtYCoord(character1.y),
            p2Row = rowAtYCoord(character2.y);

        if (this.wanderDir > 0) {
            if (currentRow === p1Row && character1.x > this.x) {
                this.target = character1;
            } else if (currentRow === p2Row && character2.x > this.x) {
                this.target = character2;
            } else {
                this.target = null;
            }
        } else if (this.wanderDir < 0) {
            if (currentRow === p1Row && character1.x < this.x) {
                this.target = character1;
            } else if (currentRow === p2Row && character2.x < this.x) {
                this.target = character2;
            } else {
                this.target = null;
            }
        }
    }

    this.AI_Movement = function() {
		if(!this.movementDetermined) {
            this.checkLineOfSight();
            if (this.target === null) {
                let AI_Destination = this.x + BRICK_W * DISTANCE_PER_ACTION * this.wanderDir;
                this.path = getPathfor(this, AI_Destination, this.y, playerNavGraph);
            } else {
                this.path = getPathfor(this, this.target.x, this.target.y, playerNavGraph);
                this.wanderDir = this.target.x > this.x ? 1 : -1;
                if (this.path.length > DISTANCE_PER_ACTION) {
                    this.path.length = DISTANCE_PER_ACTION;
                }
            }

            this.nextPathNode();
			this.movementDetermined = true;
        }
        
        if (this.x === this.destinationXCoord && Math.abs(this.y - this.destinationYCoord) <= 20 && !this.hasFired) {
            if (this.target != null) {
                this.handleClick(); //shot 
                this.fireWeapon();
                console.log("Shot at "+this.target.team+" "+this.target.color);
            } else {
                this.wanderDir *= -1;
            }
            endEnemyTurn();
        }
    }
}