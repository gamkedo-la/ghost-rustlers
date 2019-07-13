const CHARACTER_HEIGHT = 80;
const CHARACTER_WIDTH = 40;
const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;

function characterClass() {

  this.characterY = 75;
  this.characterX = 75;
  this.characterSpeedX = 0;
  this.characterSpeedY = 0;
  this.characterOnGround = false;
  this.destinationCol;
  this.destinationRow;
  this.destinationXCoord;
  this.destinationYCoord;
  this.isActive = false;

  this.drawCharacter = function () {
    colorRect(this.characterX - (CHARACTER_WIDTH / 2), this.characterY - (CHARACTER_HEIGHT / 2), CHARACTER_WIDTH, CHARACTER_HEIGHT, 'white');
  }

  this.characterMove = function () {
    if (this.characterOnGround) {
      this.characterSpeedX *= GROUND_FRICTION;
    } else {
      this.characterSpeedX *= AIR_RESISTANCE;
      this.characterSpeedY += GRAVITY;
      if (this.characterSpeedY > CHARACTER_HEIGHT) { // cheap test to ensure can't fall through floor
        this.characterSpeedY = CHARACTER_HEIGHT;
      }
    }

    this.destinationXCoord = colCenterCoord(this.destinationCol);

    if (this.characterX > this.destinationXCoord) {
      if ((this.characterX - RUN_SPEED) < this.destinationXCoord) {
        this.characterX = this.destinationXCoord;
        this.characterSpeedX = 0;
      } else {
        this.characterSpeedX = -RUN_SPEED
      }
    }

    if (this.characterX < this.destinationXCoord) {
      if ((this.characterX + RUN_SPEED) > this.destinationXCoord) {
        this.characterX = this.destinationXCoord;
        this.characterSpeedX = 0;
      } else {
        this.characterSpeedX = RUN_SPEED;
      }
    }

    /*
    if (holdLeft) {
      characterSpeedX = -RUN_SPEED;
    }
    if (holdRight) {
      characterSpeedX = RUN_SPEED;
    }
    */

    if (hold_E_Key) {
      this.setCharacterDestination();
    }

    if (this.characterSpeedY < 0 && isBrickAtPixelCoord(this.characterX, this.characterY - (CHARACTER_HEIGHT / 2)) == 1) {
      this.characterY = (Math.floor(this.characterY / BRICK_H)) * BRICK_H + (CHARACTER_HEIGHT / 2);
      this.characterSpeedY = 0.0;
    }

    if (this.characterSpeedY > 0 && isBrickAtPixelCoord(this.characterX, this.characterY + (CHARACTER_HEIGHT / 2)) == 1) {
      this.characterY = (1 + Math.floor(this.characterY / BRICK_H)) * BRICK_H - (CHARACTER_HEIGHT / 2);
      this.characterOnGround = true;
      this.characterSpeedY = 0;
    } else if (isBrickAtPixelCoord(this.characterX, this.characterY + (CHARACTER_HEIGHT / 2) + 2) == 0) {
      this.characterOnGround = false;
    }

    if (this.characterSpeedX < 0 && isBrickAtPixelCoord(this.characterX - (CHARACTER_WIDTH / 2), this.characterY) == 1) {
      this.characterX = (Math.floor(this.characterX / BRICK_W)) * BRICK_W + (CHARACTER_WIDTH / 2);
    }
    if (this.characterSpeedX > 0 && isBrickAtPixelCoord(this.characterX + (CHARACTER_WIDTH / 2), this.characterY) == 1) {
      this.characterX = (1 + Math.floor(this.characterX / BRICK_W)) * BRICK_W - (CHARACTER_WIDTH / 2);
    }

    this.characterX += this.characterSpeedX; // move the character based on its current horizontal speed 
    this.characterY += this.characterSpeedY; // same as above, but for vertical
  }

  this.setCharacterDestination = function () {
    if (this.isActive) {
      this.destinationCol = colAtXCoord(mousePos.x);
      this.destinationRow = rowAtYCoord(mousePos.y);
    }
  }

  this.characterReset = function () {
    // center character on screen
    this.characterX = canvas.width / 2;
    this.characterY = canvas.height / 2;
  }

  this.activateCharacter = function(){
    this.isActive = true;
  }

  this.deactivateCharacter = function(){
    this.isActive = false;
  }
}