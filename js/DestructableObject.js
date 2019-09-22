function destructableObjectClass(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.height = 80;
    this.width = 40;
    this.health = 1;
    this.maxHealth = 8;

    this.drawObject = function () {
        canvasContext.drawImage(boulderPic, this.x - (this.width / 2), this.y - (this.height / 2));
    }

}

