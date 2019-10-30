const ANIM_TIP_HAT = {
	positionsX: new Array([389.5, -12.334998092074102, -39.19778369209928, 2], [389.5, -17.6664036114567, -40.12229966823247, 2], [389.5, -19.242158903144627, -42.61366139095975, 3.4217289612493005], [389.5, -17.777514585095105, -45.412278334393875, 1.946605563810408]),
	positionsY: new Array([410, 5.1304433649737575, 9.941610039203908, 46.5], [410, 12.287998358428808, 27.79571602568791, 46.5], [410, 24.607331983155632, 49.33138782478426, 57.06028235632431], [410, 12.536700913860727, 25.672088494881393, 44]),
	limbAngles: new Array([0, 0.8537845069879517, -1.6652155997563742, -0.04270905576500415], [0, 0.4266274931268761, -1.6652155997563742, -0.04270905576500415], [0, -0.17219081452293902, -1.0225510836340417, -0.22494126505117096], [0, 0.4136892132788633, -1.3851392906188422, 0]),

	//testing animation timings
	delay: new Array(2, 4, 6)
}

function drawFromAnimationData(characterClass, anim, nextFrame) {

	//console.log(characterClass.animationIndex);

	//nextFrameReady = false;
	if (nextFrame === true) {

		//animationTimer = setInterval(function () {

		//if (nextFrameReady === true) {


		if (characterClass.animationIndex < 2) {
			characterClass.animationIndex++;
		} else {
			characterClass.animationIndex = 0;
		}


		//if (characterClass.animationIndex > 2) {
		//	characterClass.animationIndex = 0;
		//}

		characterClass.nextFrameReady = false;
		nextFrame = false;

		//characterClass.nextFrameReady = true;
		//}

		//clearTimeout(animationTimer);

		//}, 2000);

		setInterval(function () {
			characterClass.nextFrameReady = true;
		}, 2000);

	}

	for (j = 1; j < characterClass.spriteArray.length; j++) {
		drawImageCenteredAtLocationWithRotation(characterClass.spriteArray[j], ((characterClass.x) - (anim.positionsX[characterClass.animationIndex][j])), (characterClass.y - (anim.positionsY[characterClass.animationIndex][j])), anim.limbAngles[characterClass.animationIndex][j]);
	}

}