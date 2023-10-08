const InitScreen = {

	init: () => {
		InitScreen.initTextPressKey();
		InitScreen.initBanner();
		InitScreen.initLogo();
	},


	initTextPressKey: () => {
		C.font = '36px serif';
		C.fillStyle = 'grey';
		C.fillText('Press any key to start', 40, 500);
	},


	initLogo: () => {
		let img = new Image();
		img.src = 'img/initLogo.png';
		img.onload = () => {
			C.drawImage(img, 30, 40, img.width, img.height);
		}
	},


	initBanner: () => {
		let img = new Image();
		img.src = 'img/initBanner.png';
		img.onload = () => {

			let testaw  = canvas.width  / img.width;
			let testah  = canvas.height / img.height;
			let imgbase = (testaw < testah) ? 'width' : 'height';
			let newX, newY, newW, newH;

			if(imgbase == 'width') {
				newW = canvas.width;
				newH = img.height*canvas.width/img.width;
				newX = 0;
				newY = canvas.height - newH;
			} else {
				newH = canvas.height;
				newW = img.width*canvas.height/img.height;
				newX = canvas.width - newW;
				newY = 0;
			}

			C.drawImage(img, newX, newY, newW, newH);

			return {
				x: newX,
				y: newY,
				w: newW,
				h: newH
			};
		}
	}

};