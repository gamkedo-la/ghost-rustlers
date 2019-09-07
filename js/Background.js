// parallax layered background

function BackgroundClass() {

    // how many parallax terrain layers not including bg,sun,clouds
    const layerCount = 4;
    
    // how fast each layer moves in proportion to the one before it
    const layerXscale = 0.666;
    const layerYscale = 0.888;

    // shift parallax layers to never show missing parts
    const xOffset = 0; 
    const yOffset = 100;

    function onloadPic() { this.loaded = true; }

    var backgroundPic = new Image();
    var sunGlarePic = new Image();
    var cloudsPic = new Image();
    backgroundPic.onload = sunGlarePic.onload = cloudsPic.onload = onloadPic;
    backgroundPic.src = "images/background.png";
    sunGlarePic.src = "images/sun-glare.png";
    cloudsPic.src = "images/background-clouds.png";

    var parallaxPic = [];
    for (var num=0; num<layerCount; num++) {
        parallaxPic[num] = new Image();
        parallaxPic[num].onload = onloadPic;
        parallaxPic[num].src = "images/background-parallax-layer-"+num+".png";
    }



    this.draw = function(x=0,y=0) {

        colorRect(0, 0, canvas.width, canvas.height, 'SkyBlue'); // only needed while img are loading

        // base gradient, scaled to fit the viewport (no parallax)
        if (backgroundPic.loaded) canvasContext.drawImage(backgroundPic,0,0,canvas.width,canvas.height);
        
        // scrolling clouds
        if (cloudsPic.loaded) canvasContext.drawImage(cloudsPic,Math.cos(performance.now()/10000+1)*1000-1000,0,3000,canvas.height);
        // another layer for fun
        if (cloudsPic.loaded) canvasContext.drawImage(cloudsPic,Math.sin(performance.now()/6000+0.1)*1000-1000,0,3000,canvas.height*0.5);

        // parallax layers aplenty
        for (var num=0; num<layerCount; num++) {
            if (parallaxPic[num].loaded) 
                canvasContext.drawImage(
                    parallaxPic[num],
                    x*num*layerXscale + xOffset,
                    y*num*layerYscale + yOffset);
                    //,parallaxPic[num].width, //canvas.width,
                    //canvas.height);            
        }

        // spinning sun rays in a hardcoded position (no parallax)
        if (sunGlarePic.loaded) drawImageCenteredAtLocationWithRotation(sunGlarePic,canvas.width*0.75,canvas.height*0.5,performance.now()/5000);
    }

}
