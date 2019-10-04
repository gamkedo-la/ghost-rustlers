function destructableObjectClass(spawnX, spawnY) {
  this.x = spawnX;
  this.y = spawnY;
  this.height = 80;
  this.width = 40;
  this.team = "OBJECT"
  this.health = 1;
  this.maxHealth = 8;
  this.isDead = false;

  this.drawObject = function () {
    canvasContext.drawImage(boulderPic, this.x - (this.width / 2), this.y - (this.height / 2));
  }

  this.objectSpawn = function (x, y) {
    // center character on screen
    this.x = x;
    this.y = y;
    if (this.team === 'PLAYER_TEAM') {
      allPlayerCharacters.push(this);
    } else if (this.team === 'ENEMY_TEAM') {
      allEnemyCharacters.push(this);
    } else {
      allObjects.push(this);
    }

    allCharacters.push(this);
    console.log(allCharacters[0].width + ", " + allCharacters[0].height);


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

  this.wasHitByProjectile = function (projectileX, projectileY) {

    if (projectileX > this.x && //check left side
      projectileX < this.x + this.width && // check right side
      projectileY > this.y && // check top side
      projectileY < this.y + this.height) { // check bottom side

      return true;
    } else {
      return false;
    }
  }

  this.takeDamage = function (damage){
    this.health -= damage;
    if (this.health <= 0){
      console.log("Character Defeated");
      this.isDead = true;
    }
  }

}