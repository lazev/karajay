const Engine = {

	looper: null,
	thingsToUpdate: [],
	gravity: 0.9,

	elapsedFrames: 0,

	load: arr => {
		Engine.thingsToUpdate = arr;
	},


	run: () => {

		if(Keys.pressed[Keys.map.pause]) {
			Keys.pressed[Keys.map.pause] = false;

			console.log('pause');

			if(Engine.looper) {
				clearInterval(Engine.looper);
			}

		} else {

			//Engine.looper = setTimeout(Engine.run, 150);
			window.requestAnimationFrame(Engine.run);

			Engine.elapsedFrames++;

			C.clearRect(0, 0, canvas.width, canvas.height);

			Engine.thingsToUpdate.forEach(function(item){
				item.update();
			});

		}
	},


	randomNumber: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

};
