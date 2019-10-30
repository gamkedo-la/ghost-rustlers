enemyClass.prototype = new characterClass('ENEMY_TEAM', 'white');

function enemyClass(enemyTeam, enemyColor) {

    this.x = 100;
    this.y = 75;
    this.height = 136;
    this.width = 64;
    this.isOnGround;
    this.hasFired = false;
    this.movementDetermined = false;
    this.wanderDir = 1;
    this.target = null;
    this.shoulderOffset = 10;
    this.reachedDest = false;

    this.enemyMove = function () {
        if (this.health <= 0) {
            return;
        }

        if (!playersTurn) {
            this.AI_Movement();
        }
        this.characterMove();
    }

    this.handleClick = function () {
        //Empty
    }

    this.checkLineOfSight = function () {
        let currentRow = rowAtYCoord(this.y),
            p1Row = rowAtYCoord(character1.y),
            p2Row = rowAtYCoord(character2.y);

        if (this.wanderDir > 0) {
            if (currentRow === p1Row && character1.x > this.x) {
                this.target = character1;
            } else if (currentRow === p2Row && character2.x > this.x) {
                this.target = character2;
            } else {
                //this.target = null;
            }
        } else if (this.wanderDir < 0) {
            if (currentRow === p1Row && character1.x < this.x) {
                this.target = character1;
            } else if (currentRow === p2Row && character2.x < this.x) {
                this.target = character2;
            } else {
                //this.target = null;
            }
        }
    }

    this.AI_Movement = function () {
        //if (this.actionsRemaining > 0) {
        if (this.actionsRemaining > 0) {
            //if (this.movementDetermined) {
            this.checkLineOfSight();
            this.target = character1;
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
            //this.actionsRemaining--;
            this.movementDetermined = true;
            //}

            this.reachedDest = (this.x === this.destinationXCoord && Math.abs(this.y - this.destinationYCoord) <= 20)
            if (this.reachedDest) {
                
               aiAimTimer++;
                if (aiAimTimer > 300) {
                    this.actionsRemaining--;
                    this.AI_FireWeapon();
                } else {
                    this.AI_AimWeapon();
                }

            }
        } else if (projectileAlive == false) {
            endEnemyTurn();
        }
    }

    this.AI_AimWeapon = function () {
        //this.target = character1; //testing
        if (this.target != null) {

            isInAimMode = true;
            var smoothK = 0.85;
            aiMousePosX = smoothK * aiMousePosX + (1.0 - smoothK) * this.target.x;
            aiMousePosY = smoothK * aiMousePosY + (1.0 - smoothK) * this.target.y;

        } else {
            this.wanderDir *= -1;
            if (this.hasFired && !projectileAlive) {
                endEnemyTurn();
            }
        }
    }

    this.AI_FireWeapon = function () {
        //Console.log("Shot at " + this.target.team + " " + this.target.color);
        this.fireWeapon();
        aiAimTimer = 0;
    }
}