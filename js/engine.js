const Engine = {

	hero: null,

	looper: null,
	thingsToUpdate: [],
	gravity: 0.9,

	elapsedFrames: 0,

	gameOver: false,

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

			if(!Engine.gameOver) {
				window.requestAnimationFrame(Engine.run);
				//Engine.looper = setTimeout(Engine.run, 150);

				Engine.elapsedFrames++;

				C.clearRect(0, 0, canvas.width, canvas.height);

				Engine.thingsToUpdate.forEach(function(item){
					item.update();
				});
			}

		}
	},


	randomNumber: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},


	endGame: () => {

		C.font = "90px Comic Sans MS";
		C.fillStyle = "red";
		C.textAlign = "center";
		C.fillText("Morreu", canvas.width/2, canvas.height/2);
		Engine.gameOver = true;

	}

};
