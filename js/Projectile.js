var trajectoryPaths = [];
var projectileSpeed = 15;
var ricochetCount = 0;
const MAX_BULLET_T = 1.0;
const MAX_RICOCHETS = 5;
var bulletT = MAX_BULLET_T;
var projectileAlive = false;
var aimFromX = 0;
var aimFromY = 0;
var aimToX = 0;
var aimToY = 0;

function calculateProjectileTrajectory(character) {

  if (playersTurn == true) {
    aimToX = aimerX;
    aimToY = aimerY;
  } else { //end if
    aimToX = aiMousePosX;
    aimToY = aiMousePosY;
  } //end else

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
    } //end if

    if (i === 0) {
      trajectoryPaths[i].x1 = aimFromX;
      trajectoryPaths[i].y1 = aimFromY;
      trajectoryPaths[i].x2 = aimToX;
      trajectoryPaths[i].y2 = aimToY;
    } else { //end if
      trajectoryPaths[i].x1 = trajectoryPaths[prevIndex].x2;
      trajectoryPaths[i].y1 = trajectoryPaths[prevIndex].y2;
      trajectoryPaths[i].x2 = 1000 * Math.cos(ricochetAngle) + trajectoryPaths[i].x1;
      trajectoryPaths[i].y2 = 1000 * Math.sin(ricochetAngle) + trajectoryPaths[i].y1;
    } //end else

    trajectoryPaths[i].angle = angleFromLine(trajectoryPaths[i]);

    intersectingEdge = undefined;

    //find a wall edge that intersects the trajectory line.
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
    }) //end forEach
  } //end for
} //end function

function calculateTrajectoryPath() {

}

function drawTrajectoryPath() {
  //draw each trajectory path.
  for (i = 0; i < trajectoryPaths.length; i++) {
    colorLine(trajectoryPaths[i].x1, trajectoryPaths[i].y1, trajectoryPaths[i].x2, trajectoryPaths[i].y2, aimColor);
  }
}

function animateProjectile(fromX, fromY, toX, toY) {
  if (bulletT < MAX_BULLET_T) {
    var lineLength = DistanceBetweenTwoPixelCoords(fromX, fromY, toX, toY);
    bulletT += (1 / lineLength) * projectileSpeed;
    drawBulletAtPointOnLine(fromX, fromY, toX, toY, bulletT);
  } else {
    ricochetCount++
    bulletT = 0;
  }
}

function drawBulletAtPointOnLine(startX, startY, endX, endY, percent) {
  var oppositePerc = 1.0 - percent;
  var positionNowX = startX * oppositePerc + endX * percent;
  var positionNowY = startY * oppositePerc + endY * percent;

  colorCircle(positionNowX, positionNowY, 5, 'white');

  //TODO: move somwhere else?
  checkForCollisionAgainstEnemy(positionNowX, positionNowY);
}

//Checks for collisions against friendly and enemy characters
function checkForCollisionAgainstEnemy(positionNowX, positionNowY) {
  for (i in allCharacters) {
    if (allCharacters[i].wasHitByProjectile(positionNowX, positionNowY)) {
      if (damageAvailable) {
        resetProjectile();
        allCharacters[i].takeDamage(1);
        console.log("Hit! " + allCharacters[i] + " health: " + allCharacters[i].health);
      }
    }
  }
}

function resetProjectile(){
  damageAvailable = false;
  bulletT = MAX_BULLET_T;
  ricochetCount = MAX_RICOCHETS;
}