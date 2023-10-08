class Blocks {

	constructor({pos, imgSrc}) {
		this.pos = pos;

		if(!this.pos.w) this.pos.w = 24;
		if(!this.pos.h) this.pos.h = 24;

		this.imageElem = new Image();
		this.imageElem.src = imgSrc;
	}


	draw() {
		this.drawBack();
		this.drawFront();
	}


	drawBack() {
		C.fillStyle = '#150c02';
		C.fillRect(this.pos.x, this.pos.y + this.pos.h - 10, this.pos.w, canvas.height - this.pos.y);
	}


	drawFront() {
		C.drawImage(
			this.imageElem,
			this.pos.x,
			this.pos.y-10,
			this.pos.w,
			this.pos.h
		);
	}


	update() {
		this.draw();
	}
}