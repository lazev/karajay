const Sounds = {

	map: {
		running: new Audio('sounds/running.mp3'),
		jumping: new Audio('sounds/jumping.wav'),
		hitting: new Audio('sounds/hitting.wav'),
		gethit:  new Audio('sounds/gethit.mp3') ,
		bombExp: new Audio('sounds/grenade.wav'),
		shotgun: new Audio('sounds/shotgun.mp3')
	},


	init: () => {
		Sounds.map.running.loop = true;
	},


	pause: id => {
		Sounds.map[id].pause();
	},


	pauseAll: () => {
		for(let id in Sounds.map) {
			Sounds.map[id].pause();
		}
	},


	play: id => {
		if(typeof Sounds.map[id] != 'undefined' && Sounds.map[id].paused) {
			Sounds.map[id].play();
		}
	}

};