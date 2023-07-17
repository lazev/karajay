class Element {

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

		//C.fillStyle = this.color;
		//C.fillRect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);

		//C.fillStyle = 'rgba(255, 0, 0, 0.2)';
		//C.fillRect(
		//		this.pos.x - item.hit.x * this.scale,
		//		this.pos.y - item.hit.y * this.scale,
		//		item.pos.w * this.scale,
		//		item.pos.h * this.scale
		//);

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
		let blockId = Collisions.checkScenario(this);
		if(blockId !== false) {
			this.touchGround(blockId);
		}
	}


	checkBlockCollisionX() {
		let blockId = Collisions.checkScenario(this);
		if(blockId !== false) {
			this.touchWall(blockId);
		}
	}


	touchGround(blockId) {
		if(typeof this.jumpReset == 'function')
			this.jumpReset();

		this.velocity.y = 0;

		this.pos.y = Scenario.pathArray[blockId].pos.y - this.pos.h - 0.01;
	}


	touchWall(blockId) {

		this.stay();

		if(this.faceTo == 'right') {
			this.pos.x = Scenario.pathArray[blockId].pos.x - this.pos.w - 0.01;
		}

		if(this.faceTo == 'left') {
			this.pos.x = Scenario.pathArray[blockId].pos.x + Scenario.pathArray[blockId].pos.w + 0.01;
		}
	}

}