var characterX = 75, characterY = 75;
var characterSpeedX = 0, characterSpeedY = 0;
var characterOnGround = false;
var CHARACTER_HEIGHT = 80;
var CHARACTER_WIDTH = 40;

function drawCharacter(){
  colorRect(characterX-(CHARACTER_WIDTH/2), characterY-(CHARACTER_HEIGHT/2), CHARACTER_WIDTH, CHARACTER_HEIGHT, 'white');
}

function characterMove() {
  if(characterOnGround) {
    characterSpeedX *= GROUND_FRICTION;
  } else {
    characterSpeedX *= AIR_RESISTANCE;
    characterSpeedY += GRAVITY;
    if(characterSpeedY > CHARACTER_HEIGHT) { // cheap test to ensure can't fall through floor
      characterSpeedY = CHARACTER_HEIGHT;
    }
  }
  
  if(holdLeft) {
    characterSpeedX = -RUN_SPEED;
  }
  if(holdRight) {
    characterSpeedX = RUN_SPEED;
  }

  if(characterSpeedY < 0 && isBrickAtPixelCoord(characterX,characterY-(CHARACTER_HEIGHT/2)) == 1) {
    characterY = (Math.floor( characterY / BRICK_H )) * BRICK_H + (CHARACTER_HEIGHT/2);
    characterSpeedY = 0.0;
  }
    
  if(characterSpeedY > 0 && isBrickAtPixelCoord(characterX,characterY+(CHARACTER_HEIGHT/2)) == 1) {
    characterY = (1+Math.floor( characterY / BRICK_H )) * BRICK_H - (CHARACTER_HEIGHT/2);
    characterOnGround = true;
    characterSpeedY = 0;
  } else if(isBrickAtPixelCoord(characterX,characterY+(CHARACTER_HEIGHT/2)+2) == 0) {
    characterOnGround = false;
  }
    
  if(characterSpeedX < 0 && isBrickAtPixelCoord(characterX-(CHARACTER_WIDTH/2),characterY) == 1) {
    characterX = (Math.floor( characterX / BRICK_W )) * BRICK_W + (CHARACTER_WIDTH/2);
  }
  if(characterSpeedX > 0 && isBrickAtPixelCoord(characterX+(CHARACTER_WIDTH/2),characterY) == 1) {
    characterX = (1+Math.floor( characterX / BRICK_W )) * BRICK_W - (CHARACTER_WIDTH/2);
  }
    
  characterX += characterSpeedX; // move the character based on its current horizontal speed 
  characterY += characterSpeedY; // same as above, but for vertical
}

function characterReset() {
  // center character on screen
  characterX = canvas.width/2;
  characterY = canvas.height/2;
}