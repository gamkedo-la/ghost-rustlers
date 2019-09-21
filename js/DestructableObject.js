function destructableObjectClass(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.objectHeight = 80;
    this.objectWidth = 40;
    this.health = 1;
    this.maxHealth = 8;

    this.drawObject = function () {
        canvasContext.drawImage(boulderPic, this.x - (this.objectWidth / 2), this.y - (this.objectHeight / 2));
    }

}

