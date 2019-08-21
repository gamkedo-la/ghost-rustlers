function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorLine(x1, y1, x2, y2, color) {
    canvasContext.beginPath();
    canvasContext.strokeStyle = color;
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function drawImageCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
    canvasContext.save();	//	allows	us	to	undo	translate	movement	and	rotate	spin
    canvasContext.translate(atX, atY);	//	sets	the	point	where	our	graphic	will	go
    canvasContext.rotate(withAngle);	//	sets	the	rotation
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);	//	center,	draw
    canvasContext.restore();	//	undo	the	translation	movement	and	rotation	since	save()
 }

function drawBackground() {
    colorRect(0, 0, canvas.width, canvas.height, 'SkyBlue');
}

var _tintImageCanvas = document.createElement('canvas');
var _tintImageCTX = _tintImageCanvas.getContext('2d');
function tintImage (image, color) {
  _tintImageCanvas.width = image.width;
  _tintImageCanvas.height = image.height;
  _tintImageCTX.fillStyle = color;
  _tintImageCTX.fillRect(0, 0, _tintImageCanvas.width, _tintImageCanvas.height);
  _tintImageCTX.globalCompositeOperation = 'destination-atop';
  _tintImageCTX.globalAlpha = 1;
  _tintImageCTX.drawImage(image, 0, 0);
  return _tintImageCanvas; // gets modified by the next call to this func
}

function createTintedSprite (image, color) {
  var newCanvas = document.createElement('canvas');
  var newContext = newCanvas.getContext('2d');
  newCanvas.width = image.width;
  newCanvas.height = image.height;
  newContext.fillStyle = color;
  newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
  newContext.globalCompositeOperation = 'destination-atop';
  newContext.globalAlpha = 1;
  newContext.drawImage(image, 0, 0);
  return newCanvas; // reuse me
}