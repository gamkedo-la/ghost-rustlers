// all art assets are loaded here

var characterBodyRightPic = document.createElement("img");
var characterBodyLeftPic = document.createElement("img");
var characterUpperArmPic = document.createElement("img");
var characterLowerArmPic = document.createElement("img");
var enemyBodyRightPic = document.createElement("img");
var enemyBodyLeftPic = document.createElement("img");
var enemyUpperArmPic = document.createElement("img");
var enemyLowerArmPic = document.createElement("img");
var ladderPic = document.createElement("img");
var ladderBrokenPic = document.createElement("img");
var ladderPlatformPic = document.createElement("img");
var platformPic = document.createElement("img");
var wallInteriorPic = document.createElement("img");
var wallTopPic = document.createElement("img");
var wallRightIntPic = document.createElement("img");
var wallRightTopPic = document.createElement("img");
var wallBottomEdgePic = document.createElement("img");
var wallBottomIntPic = document.createElement("img");
var wallBottomRightCornerPic = document.createElement("img");
var targetAimerPic = document.createElement("img");
var moveAimerPic = document.createElement("img");
var cowboyHatLeftPic = document.createElement("img");
var cowboyHatRightPic = document.createElement("img");
var boulderPic = document.createElement("img");
var buttonPic = document.createElement("img");
var circleImg = document.createElement("img");
var cactusPic = document.createElement("img");
var cactusTopPic = document.createElement("img");
var cactusBottomPic = document.createElement("img");
var redBarrelPic = document.createElement("img");
var cratePic = document.createElement("img");
var weaponPic = document.createElement("img");
var bulletPic = document.createElement("img");

//var inActiveColor = "#88880088";
//var usedColor = "#000000AA";

var inActiveColor = "#00000000";
var usedColor = "#00000000";

var characterBodyRightPic_inActive;
var characterBodyLeftPic_inActive;
var characterUpperArmPic_inActive;
var characterLowerArmPic_inActive;

var characterBodyRightPic_used;
var characterBodyLeftPic_used;
var characterUpperArmPic_used;
var characterLowerArmPic_used;

function initArt(){
  var	imageList	=	[
  {varName:characterBodyRightPic,	theFile:"characterBodyPlaceHolderRight.png"},
  {varName:characterBodyLeftPic,	theFile:"characterBodyPlaceHolderLeft.png"},
  {varName:characterUpperArmPic,	theFile:"characterUpperArmPlaceHolder.png"},
  {varName:characterLowerArmPic,	theFile:"characterLowerArmPlaceHolder.png"},
  {varName:enemyBodyRightPic,	theFile:"ghostBanditBodyRight.gif"},
  {varName:enemyBodyLeftPic,	theFile:"ghostBanditBodyLeft.gif"},
  {varName:enemyLowerArmPic,	theFile:"enemyLowerArm.gif"},
  {varName:enemyUpperArmPic,	theFile:"enemyUpperArm.gif"},
  {varName:wallInteriorPic,	theFile:"wall_rock_interior.png"},
  {varName:wallTopPic,	theFile:"wall_rock_top.png"},
  {varName:wallRightIntPic,	theFile:"wall_rock_right_int.png"},
  {varName:wallRightTopPic,	theFile:"wall_rock_right_top.png"},
  {varName:wallBottomEdgePic,	theFile:"wall_rock_bottom.png"},
  {varName:wallBottomIntPic,	theFile:"wall_rock_bottom_int.png"},
  {varName:wallBottomRightCornerPic,	theFile:"wall_rock_bottom_right_corner.png"},
  {varName:ladderPic,	theFile:"ladder.png"},
  {varName:ladderBrokenPic,	theFile:"ladderBroken.png"},
  {varName:ladderPlatformPic,	theFile:"ladderPlatform.png"},
  {varName:platformPic,	theFile:"platform.png"},
  {varName:targetAimerPic,	theFile:"targetAimer.png"},
  {varName:moveAimerPic,	theFile:"moveAimer.png"},
  {varName:boulderPic,	theFile:"boulder.png"},
  {varName:buttonPic,	theFile:"button.png"},
  {varName:circleImg,	theFile:"circle.png"},
  {varName:cowboyHatLeftPic,	theFile:"cowboyHatLeft.png"},
  {varName:cowboyHatRightPic,	theFile:"cowboyHatRight.png"},
  {varName:cactusPic, theFile:"cactus.png"},
  {varName:cactusTopPic, theFile:"cactusTop.png"},
  {varName:cactusBottomPic, theFile:"cactusBottom.png"},
  {varName:redBarrelPic, theFile:"red_barrel.png"},
  {varName:cratePic, theFile:"crate.png"},
  {varName:weaponPic, theFile:"weapon.png"},
  {varName:bulletPic, theFile:"bullet.png"}
];
  
  picsToLoad	=	imageList.length;

  for(var	i=0;i<imageList.length;i++)	{
      beginLoadingImage(imageList[i].varName,imageList[i].theFile);
  }
}

function beginLoadingImage(imgVar,	fileName)	{
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function countLoadedImageAndLaunchIfReady(){
  picsToLoad--;
  if(picsToLoad === 0){
    createTintedImages();
    initRenderLoop();
  }
}

function createTintedImages(){
  characterBodyRightPic_inActive = createTintedSprite(characterBodyRightPic, inActiveColor);
  characterBodyRightPic_used = createTintedSprite(characterBodyRightPic, usedColor);
  characterBodyLeftPic_inActive = createTintedSprite(characterBodyLeftPic, inActiveColor);
  characterBodyLeftPic_used = createTintedSprite(characterBodyLeftPic, usedColor);
  characterUpperArmPic_inActive = createTintedSprite(characterUpperArmPic, inActiveColor);
  characterUpperArmPic_used = createTintedSprite(characterUpperArmPic, usedColor);
  characterLowerArmPic_inActive = createTintedSprite(characterLowerArmPic, inActiveColor);
  characterLowerArmPic_used = createTintedSprite(characterLowerArmPic, usedColor);
}