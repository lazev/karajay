const Background = {

	bgImage: new Image(),

	imageSource: 'img/bg-trees.png',

	pos: {
		x: 0,
		y: -200,
		w: 0,
		h: 0
	},

	init: () => {
		Background.bgImage.src = Background.imageSource;

		Background.pos.w = canvas.width*4;
		Background.pos.h = canvas.height*2;
	},


	draw: () => {

		C.drawImage(
			Background.bgImage,
			0,
			0,
			1280,
			720,
			Background.pos.x,
			Background.pos.y,
			Background.pos.w,
			Background.pos.h
		);


		//setTimeout(function(){
		//	console.log(C.getImageData(100, 100, 1, 1).data);
		//	debugger;
		//}, 2000);

	},


	moveBackgroundX: player => {
		let paralaxVelocity = 0;
		if(player.velocity.x > 0) {
			paralaxVelocity = 0.5;
		}
		else if(player.velocity.x < 0) {
			paralaxVelocity = -0.5;
		}

		Background.pos.x -= paralaxVelocity;
	},


	update: () => {

		let totalW  = Background.pos.w;

		let current = canvas.width-Background.pos.x;

		let perc = current*100/totalW;

		Engine.daylight = 100-perc;

		if(Engine.daylight < 100) {
			C.globalAlpha = Engine.daylight/100;
			Background.draw();
			C.globalAlpha = 1;
		} else {
			Background.draw();
		}

	}
};