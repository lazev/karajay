class Blocks {

	constructor({
		pos,
		size
	}) {
		this.pos  = pos;

		if(size) {
			this.size = size;
		} else {
			this.size = {
				x: 16,
				y: 16
			}
		}
	}


	draw() {
		C.fillStyle = 'darkgreen';
		C.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);

		C.fillStyle = '#221515';
		C.fillRect(this.pos.x, this.pos.y + this.size.y, this.size.x, canvas.height - this.pos.y);
	}


	update() {
		this.draw();
	}
}