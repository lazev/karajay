const Sounds = {

	map: {
		running: new Audio('sounds/running.mp3'),
		jumping: new Audio('sounds/jumping.mp3')
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
		Sounds.map[id].play();
	}

};