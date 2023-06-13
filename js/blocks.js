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
	}


	update() {
		this.draw();
	}
}