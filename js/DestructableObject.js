function destructableObjectClass(character_team) {
  this.x;
  this.y;
  this.height;
  this.width;
  this.team = character_team;
  this.health = 8;
  this.maxHealth = 8;
  this.isDead = false;
  this.sprite;

  this.drawObject = function () {
    drawImageCenteredAtLocationWithRotation(this.sprite, this.x, this.y, 0)
  }

  this.objectSpawn = function (tileCol, tileRow) {
    // center character on screen
    this.x = xCoordAtCenterOfCol(tileCol);
    this.y = yCoordAtCenterOfRow(tileRow);
    if (this.team === 'PLAYER_TEAM') {
      this.sprite = characterBodyRightPic;
      allPlayerCharacters.push(this);
    } else if (this.team === 'ENEMY_TEAM') {
      this.sprite = enemyBodyRightPic;
      allEnemyCharacters.push(this);
    } else if (this.team === 'CRATE') {
      this.sprite = cratePic;
      allObjects.push(this);
    } else if (this.team === 'BARREL') {
      this.sprite = redBarrelPic;
      allObjects.push(this);
    } else {
      allObjects.push(this);
    }

    allCharacters.push(this);

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

  this.wasHitByProjectile = function (projectileX, projectileY) {

    if (projectileX > this.x - (this.sprite.width / 2) && //check left side
      projectileX < this.x + (this.sprite.width / 2) && // check right side
      projectileY > this.y - (this.sprite.height / 2) && // check top side
      projectileY < this.y + (this.sprite.height / 2)) { // check bottom side

      return true;

    } else {
      return false;
    }

  }

  this.takeDamage = function (damage) {
    this.health -= damage;
    if (this.health <= 0) {
      console.log("Character Defeated");
      this.actionsRemaining = 0;
      this.isDead = true;
    }
  }

}