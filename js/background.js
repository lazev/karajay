const Background = {

	bgImage: new Image(),

	imageSource: 'img/bg-trees.png',

	pos: {
		x: 0,
		y: -200
	},

	size: {
		x: 0,
		y: 0
	},


	init: () => {
		Background.bgImage.src = Background.imageSource;

		Background.size = {
			x: canvas.width*4,
			y: canvas.height*2
		};
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
			Background.size.x,
			Background.size.y
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
		Background.draw();
	}
};