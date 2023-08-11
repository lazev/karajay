class Objects {

	constructor({
		pos = {
			x: 500,
			y: 200,
			w: 50,
			h: 70
		},

		hit = {
			x: 500,
			y: 200,
			w: 50,
			h: 70
		},

		color = '',

		sprite,

		state = 'stay',

		faceTo = 'left'

	}) {

		this.pos = {
			x: pos.x,
			y: pos.y,
			w: pos.w,
			h: pos.h
		};

		this.hit = {
			x: hit.x,
			y: hit.y,
			w: hit.w,
			h: hit.h
		};

		this.velocity = {
			x: 0,
			y: 1
		};

		this.sprite = sprite;

		this.scale = this.sprite.scale;

		this.color = color;

		this.state = state;

		this.faceTo = faceTo;

		this.currentFrame = 0;

	}


	changeState(state, faceTo) {
		if(this.state != state || (typeof faceTo != 'undefined' && this.faceTo != faceTo)) {
			this.currentFrame = 0;
		}

		if(faceTo) this.faceTo = faceTo;
		this.state = state;
	}


	draw() {
		let frames    = this.sprite.map[this.state][this.faceTo];
		let imgToDraw = this.sprite.image[this.faceTo];
		let buffer    = this.sprite.map[this.state].framesToChange;

		if(Engine.elapsedFrames % buffer === 0) {
			this.currentFrame++;
			if(this.currentFrame >= frames.length) this.currentFrame = 0;
		}

		let item = frames[this.currentFrame];

		this.hit = item.hit;

		this.pos.w = item.hit.w * this.scale;
		this.pos.h = item.hit.h * this.scale;

		C.fillStyle = this.color;
		C.fillRect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);

		C.fillStyle = 'rgba(180, 180, 180, 0.5)';
		C.fillRect(
				this.pos.x - item.hit.x * this.scale,
				this.pos.y - item.hit.y * this.scale,
				item.pos.w * this.scale,
				item.pos.h * this.scale
		);

		C.drawImage(
			imgToDraw,

			item.pos.x,
			item.pos.y,
			item.pos.w,
			item.pos.h,

			this.pos.x - item.hit.x * this.scale,
			this.pos.y - item.hit.y * this.scale,
			item.pos.w * this.scale,
			item.pos.h * this.scale
		);
	}


	applyGravity(fixedPos) {
		if(!fixedPos) this.pos.y += this.velocity.y;
		this.velocity.y += Engine.gravity;
	}


	checkBlockCollisionY() {
		let block = Collisions.checkScenario(this);
		if(block !== false) {
			this.touchGround(block);
		}
	}


	checkBlockCollisionX() {
		let block = Collisions.checkScenario(this);
		if(block !== false) {
			this.touchWall(block);
		}
	}


	touchGround(block) {

		console.log(block.pos);

		if(!this.lostScenarioFloor) {
			if(typeof this.jumpReset == 'function')
				this.jumpReset();

			this.velocity.y = 0;

			this.pos.y = block.pos.y - this.pos.h - 0.01;
		}
	}


	touchWall(block) {

		this.stay();

		if(this.faceTo == 'right') {
			this.pos.x = block.pos.x - this.pos.w - 0.01;
		}

		if(this.faceTo == 'left') {
			this.pos.x = block.pos.x + block.pos.w + 0.01;
		}
	}

}