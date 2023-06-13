const Engine = {

	looper: null,
	thingsToUpdate: [],
	gravity: 0.9,


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

			window.requestAnimationFrame(Engine.run);

			//Engine.looper = setTimeout(Engine.run, 50);

			C.clearRect(0, 0, canvas.width, canvas.height);

			Engine.thingsToUpdate.forEach(function(item){
				item.update();
			});

		}
	}

};