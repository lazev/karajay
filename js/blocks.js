class Blocks {

	constructor({pos}) {
		this.pos = pos;

		if(!this.pos.w) this.pos.w = 16;
		if(!this.pos.h) this.pos.h = 16;
	}


	draw() {
		this.drawBack();
		this.drawFront();
	}
	
	
	drawBack() {
		C.fillStyle = '#221515';
		C.fillRect(this.pos.x, this.pos.y + this.pos.h, this.pos.w, canvas.height - this.pos.y);		
	}
	
	
	drawFront() {
		C.fillStyle = 'darkgreen';
		C.fillRect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);		
	}
	

	update() {
		this.draw();
	}
}