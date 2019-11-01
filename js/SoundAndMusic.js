var audioFormat;
var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level

//sounds
var shotSoundA = new SoundOverlapsClass("shooting2");
var shotSoundB = new SoundOverlapsClass("shooting6");
var shotHitSound = new SoundOverlapsClass("shooting3");
var ricoSound = new SoundOverlapsClass("woosh");
var menuSoundA = new SoundOverlapsClass("menu_sound");
var menuSoundB = new SoundOverlapsClass("menu_sound_2");
var reload = new SoundOverlapsClass("reload");

var hauntedHoedownSound = new BackgroundMusicClass("HauntedHoedown");

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("sound/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("audio/sounds/" + filenameWithPath + audioFormat);
    var altSound = new Audio("audio/sounds/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("audio muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass(filenameWithPath) {
    var musicSound = null;
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("audio/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		} else {
			musicSound.volume = 0.3; // even outside of meetings reducing volume of music relative to sound effects
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
