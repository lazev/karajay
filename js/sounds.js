const Sounds = {

	map: {
		running: new Audio('sounds/running.mp3'),
		jumping: new Audio('sounds/jumping.wav'),
		hitting: new Audio('sounds/hitting.wav')
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
		if(typeof Sounds.map[id] != 'undefined')
			Sounds.map[id].play();
	}

};