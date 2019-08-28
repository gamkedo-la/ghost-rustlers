enemyClass.prototype = new characterClass('ENEMY_TEAM', 'white');
function enemyClass(enemyTeam, enemyColor) {
	this.x = 79;
	this.y = 75;
	this.height = 136;
	this.width = 64;
	this.health = 8;
	
	this.drawCharacter = function () {
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

		drawImageCenteredAtLocationWithRotation(enemyUpperArmPic, this.upperArm.x, this.upperArm.y, this.shoulderAngle)

		//draws lower arm
		this.handAngle = this.shoulderAngle + this.elbowAngle;
		this.rightHand.x = ARM_SEGMENT_LENGTH * Math.cos(this.handAngle) + this.rightElbow.x;
		this.rightHand.y = ARM_SEGMENT_LENGTH * Math.sin(this.handAngle) + this.rightElbow.y;

		this.lowerArm.x = this.rightElbow.x + ((this.rightHand.x - this.rightElbow.x) / 2);
		this.lowerArm.y = this.rightElbow.y + ((this.rightHand.y - this.rightElbow.y) / 2);

		drawImageCenteredAtLocationWithRotation(enemyLowerArmPic, this.lowerArm.x, this.lowerArm.y, this.handAngle)

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

		//canvasContext.globalCompositeOperation  = "source-over";
	};
}
