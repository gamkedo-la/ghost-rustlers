// parallax layered background

function BackgroundClass() {

    this.draw = function(x,y) {

        colorRect(0, 0, canvas.width, canvas.height, 'SkyBlue'); // only needed while img are loading

        // base gradient
        if (backgroundPic.loaded) canvasContext.drawImage(backgroundPic,0,0,canvas.width,canvas.height);
        
        // parallax layers aplenty

        // spinning sun rays
        if (sunGlarePic.loaded) drawImageCenteredAtLocationWithRotation(sunGlarePic,canvas.width*0.75,canvas.height*0.5,performance.now()/6000);
    }

}
