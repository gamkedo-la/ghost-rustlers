//Camera Pan Variables
const AUTO_PAN_SPEED = 3.0;
const PAN_SPEED = 5.0;
const DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 200;
const DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 150;
var camPanX = 0.0;
var camPanY = 0.0;
var camTargetX = 0;
var camTargetY = 0;
var autoPan = false;

function moveCamera() {
    if (!autoPan) {
        controlCamera();
    } else {
        updateAutoPan();
    }
    
    let clampedCoords = clampCameraCoords(camPanX, camPanY);

    camPanX = clampedCoords.x;
    camPanY = clampedCoords.y;
}

function controlCamera() {
    if (holdRight || mousePos.x >= canvas.width - BRICK_W) {
        camPanX += PAN_SPEED;
    }
    if (holdLeft || mousePos.x <= BRICK_W) {
        camPanX -= PAN_SPEED;
    }
    if (holdUp || mousePos.y <= BRICK_H) {
        camPanY -= PAN_SPEED;
    }
    if (holdDown || mousePos.y >= canvas.height - BRICK_H) {
        camPanY += PAN_SPEED;
    }
}

function clampCameraCoords(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);

    let maxPanRight = BRICK_COLS * BRICK_W - canvas.width,
        maxPanTop = BRICK_ROWS * BRICK_H - canvas.height;
    
    if (x < 0) {
        x = 0;
    } else if (x > maxPanRight) {
        x = maxPanRight;
    }

    if (y < 0) {
        y = 0;
    } else if (y > maxPanTop) {
        y = maxPanTop;
    }
    
    return {x: x, y: y};
}

function beginAutoPanTo(x, y) {
    let clampedTarget = clampCameraCoords(x, y);
    if (x !== undefined && x !== null) {
        camTargetX = clampedTarget.x;
    }
    if (y !== undefined && y !== null) {
        camTargetY = clampedTarget.y;
    }
    
    autoPan = true;
}

function updateAutoPan() {
    if (Math.abs(camPanX - camTargetX) <= AUTO_PAN_SPEED && Math.abs(camPanY - camTargetY) <= AUTO_PAN_SPEED) {
        camPanX = camTargetX;
        camPanY = camTargetY;
        autoPan = false;
        return;
    }

    if (camPanX + AUTO_PAN_SPEED < camTargetX) {
        camPanX += AUTO_PAN_SPEED;
    } else if (camPanX - PAN_SPEED > camTargetX) {
        camPanX -= AUTO_PAN_SPEED;
    }

    if (camPanY + AUTO_PAN_SPEED < camTargetY) {
        camPanY += AUTO_PAN_SPEED;
    } else if (camPanY - AUTO_PAN_SPEED > camTargetY) {
        camPanY -= AUTO_PAN_SPEED;
    }
}

function moveAutoPan(destX, destY) {
    let panDeltaX = destX - canvas.width / 2 - camPanX,
      panDeltaY = destY - canvas.height / 2 - camPanY;

    if (Math.abs(panDeltaX) > DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      panDeltaX += panDeltaX > 0 ? -DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X : DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X;
      beginAutoPanTo(camPanX + panDeltaX, null)
    }
    if (Math.abs(panDeltaY) > DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      panDeltaY += panDeltaY > 0 ? -DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y : DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y;
      beginAutoPanTo(null, camPanY + panDeltaY);
    }
  }