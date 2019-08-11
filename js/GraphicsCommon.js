function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
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