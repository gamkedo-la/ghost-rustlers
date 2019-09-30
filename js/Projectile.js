var trajectoryPaths = [];
var ricochetCount = 0;
const MAX_BULLET_T = 1.0;
const MAX_RICOCHETS = 2;
var bulletT = MAX_BULLET_T;
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;

function drawBulletOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;
  //var ricochetCount = 0;

  if (isWallTileAtPixelCoord(positionNowX, positionNowY) == 1) {
    //ricochetCount++;
  }

  if (ricochetCount > MAX_RICOCHETS) {
    console.log(ricochetCount);
    bulletT = MAX_BULLET_T;
    bulletT = MAX_BULLET_T;
  } else {
    console.log("drawing projectile");
    colorCircle(positionNowX, positionNowY, 5, 'white');
    checkForCollisionAgainstEnemy(positionNowX, positionNowY);
  }
}

//Checks for collisions against friendly and enemy characters
function checkForCollisionAgainstEnemy(positionNowX, positionNowY) {
  for (i in allCharacters) {
    if (positionNowX > allCharacters[i].x && //check left side
      positionNowX < allCharacters[i].x + allCharacters[i].width && // check right side
      positionNowY > allCharacters[i].y && // check top side
      positionNowY < allCharacters[i].y + allCharacters[i].height) { // check bottom side
      if (damageAvailable) {
        allCharacters[i].health--;
        damageAvailable = false;
        console.log("Hit! " + allCharacters[i] + " health: " + allCharacters[i].health);
      }
    }
  }
}

function drawProjectileTrajectory(character) {
  if (character.hasFired) {
    var lineLength = DistanceBetweenTwoPixelCoords(aimFromX, aimFromY, aimToX, aimToY);
    //TODO: Fix this so that the projectile moves at a constant speed for all line lengths.
    //bulletT += (MAX_BULLET_T * lineLength) * .0001;
    bulletT += MAX_BULLET_T * 0.001;
    console.log(bulletT);
  } else {
    if (playersTurn == true) {
      aimToX = aimerX;
      aimToY = aimerY;
    } else {
      aimToX = aiMousePosX;
      aimToY = aiMousePosY;
    }

  }

  if (character.isActive && !character.hasFired) {
    aimFromX = Math.floor(character.rightHand.x);
    aimFromY = Math.floor(character.rightHand.y);
    aimColor = 'red';

    var intersectionData;
    var ricochetAngle;

    //calculate each ricochet point and trajectory line 
    for (i = 0; i <= MAX_RICOCHETS; i++) {

      var prevIndex = i - 1;
      var intersectingEdge;

      if (trajectoryPaths[i] === undefined) {
        trajectoryPaths.push({
          x1: 0,
          y1: 0,
          x2: 1,
          y2: 1,
          angle: 0
        });
      }

      if (i === 0) {
        trajectoryPaths[i].x1 = aimFromX;
        trajectoryPaths[i].y1 = aimFromY;
        trajectoryPaths[i].x2 = aimToX;
        trajectoryPaths[i].y2 = aimToY;
      } else {
        trajectoryPaths[i].x1 = trajectoryPaths[prevIndex].x2;
        trajectoryPaths[i].y1 = trajectoryPaths[prevIndex].y2;
        trajectoryPaths[i].x2 = 1000 * Math.cos(ricochetAngle) + trajectoryPaths[i].x1;
        trajectoryPaths[i].y2 = 1000 * Math.sin(ricochetAngle) + trajectoryPaths[i].y1;
      }

      trajectoryPaths[i].angle = angleFromLine(trajectoryPaths[i]);

      intersectingEdge = undefined;

      //find a wall edge that intersects the trajectory line.
      //TODO: find only the closest wall edge if more than one intersect the trajectory line.
      wallEdges.forEach(function (wallEdge) {
        intersectionData = getLineIntersection(trajectoryPaths[i], wallEdge);
        if (intersectionData.linesIntersect) {
          intersectingEdge = wallEdge;
          if (intersectingEdge != undefined) {
            trajectoryPaths[i].x2 = intersectionData.x;
            trajectoryPaths[i].y2 = intersectionData.y;
            ricochetAngle = angleOfReflection(trajectoryPaths[i], intersectingEdge);
          }
        }
      })

    }
  }

  //draw each trajectory path.
  for (i = 0; i < trajectoryPaths.length; i++) {
    colorLine(trajectoryPaths[i].x1, trajectoryPaths[i].y1, trajectoryPaths[i].x2, trajectoryPaths[i].y2, aimColor);
  }

}

function drawProjectile(fromX, fromY, toX, toY) {
  drawBulletOnLine(fromX, fromY, toX, toY, bulletT);
  if (bulletT >= MAX_BULLET_T) {
    //bulletT = 0;
    ricochetCount++;
    projectileAlive = false;
  }
}