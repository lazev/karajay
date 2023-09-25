const InitScreen = {

	bgImage: new Image(),

	imageSource: 'img/init.png',

	pos: {
		x: 0,
		y: 0,
		w: 0,
		h: 0
	},


	init: () => {

		InitScreen.bgImage.src = InitScreen.imageSource;

		InitScreen.pos.w = canvas.width*4;
		InitScreen.pos.h = canvas.height*2;

		C.drawImage(
			InitScreen.bgImage,
			0,
			0,
			1024,
			1024,
			InitScreen.pos.x,
			InitScreen.pos.y,
			InitScreen.pos.w,
			InitScreen.pos.h
		);
	}

};