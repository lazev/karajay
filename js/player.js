class Player {
	constructor() {

		this.sprite = new Adventurer15();

		this.color  = 'blue';

		this.pos = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};

		this.hit = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};

		this.velocity = {
			x: 0,
			y: 1
		};

		this.maxJumps      = 2;
		this.jumpCountdown = 0;

		this.dashing = false;

		this.faceTo = 'right';
		this.currentAnimation = 'stay';

		this.currentFrame = 0;

		this.scale = this.sprite.scale;
	}


	get leftEdge() {
		return this.pos.x + this.hit.x * this.scale;
	}

	get rightEdge() {
		return (this.hit.x + this.hit.w) * this.scale;
	}

	get topEdge() {
		return this.pos.y + this.hit.y * this.scale;
	}

	get bottomEdge() {
		return (this.hit.y + this.hit.h) * this.scale;
	}


	changeAnimation(animation, faceTo) {
		if(this.currentAnimation != animation || (typeof faceTo != 'undefined' && this.faceTo != faceTo)) {
			console.log(this.currentAnimation +' - '+ animation);
			console.log(this.faceTo +' - '+ faceTo);
			this.currentFrame = 0;
		}

		if(faceTo) this.faceTo = faceTo;
		this.currentAnimation = animation;
	}


	draw() {

		let frames    = this.sprite.map[this.currentAnimation][this.faceTo];
		let imgToDraw = this.sprite.image[this.faceTo];
		let buffer    = this.sprite.map[this.currentAnimation].framesToChange;

		if(Engine.elapsedFrames % buffer === 0) {
			this.currentFrame++;
			if(this.currentFrame >= frames.length) this.currentFrame = 0;
		}

		let item = frames[this.currentFrame];

		this.hit = item.hit;

		this.pos.w = item.hit.w * this.scale;
		this.pos.h = item.hit.h * this.scale;

		C.fillStyle = this.color;
		C.fillRect(
			this.pos.x,
			this.pos.y,
			this.pos.w,
			this.pos.h
		);

		C.fillStyle = 'rgba(0, 255, 0, 0.2)';
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
			item.pos.h * this.scale,
		);
	}


	update() {
		this.draw();

		this.pos.x += this.velocity.x;

		this.checkCollisionX();

		this.applyGravity();

		this.checkCollisionY();

		this.withOutAnimation = true;

		if(Keys.pressed[Keys.map.right]) {
			this.withOutAnimation = false;
			this.runRight();
		}

		else if(Keys.pressed[Keys.map.left]) {
			this.withOutAnimation = false;
			this.runLeft();
		}

		if(Keys.pressed[Keys.map.jump]) {
			Keys.pressed[Keys.map.jump] = false;
			this.withOutAnimation = false;
			this.jump();
		}

		if(Keys.pressed[Keys.map.dash]) {
			this.withOutAnimation = false;
			if(this.dashing) return;
			this.dashing = true;
			this.dash();
			setTimeout(() => { this.dashing = false; }, 100);
		}

		if(this.velocity.y > 0.9) { //???
			this.withOutAnimation = false;
			this.falling();
		}

		if(this.withOutAnimation) this.stay();

		this.moveCameraX();
	}


	moveCameraX() {
		let playerVelocity = this.velocity.x;
		if(
			this.pos.x + this.pos.w > cameraEdges.right && playerVelocity > 0 ||
			this.pos.x < cameraEdges.left && playerVelocity < 0
		) {
			Scenario.moveScenarioX(this);
			Background.moveBackgroundX(this);
			this.velocity.x = 0;
		}
	}


	applyGravity() {

		if(this.pos.y + this.pos.h > cameraEdges.bottom) {
			Scenario.moveScenarioY(this);
		}

		else if(this.pos.y < cameraEdges.top && this.velocity.y < 0) {
			Scenario.moveScenarioY(this);
		}

		else {
			this.pos.y += this.velocity.y;
		}

		this.velocity.y += Engine.gravity;
	}


	checkCollisionY() {
		let blockId = Collisions.checkScenario(this);
		if(blockId !== false) {
			this.touchGround(blockId);
		}
	}


	checkCollisionX() {
		let blockId = Collisions.checkScenario(this);
		if(blockId !== false) {
			this.touchWall(blockId);
		}
	}


	touchGround(blockId) {
		this.jumpReset();

		this.velocity.y = 0;

		this.pos.y = Scenario.pathArray[blockId].pos.y - this.pos.h - 0.01;
	}


	touchWall(blockId) {

		if(this.velocity.x > 0) {
			this.stay();
			this.pos.x = Scenario.pathArray[blockId].pos.x - this.pos.w - 0.01;
		}

		if(this.velocity.x < 0) {
			this.stay();
			this.pos.x = Scenario.pathArray[blockId].pos.x + Scenario.pathArray[blockId].pos.w + 0.01;
		}
	}


	stay() {
		this.changeAnimation('stay');
		this.velocity.x = 0;
	}


	runRight() {
		this.changeAnimation('run', 'right');
		this.velocity.x = 10;
	}


	runLeft() {
		this.changeAnimation('run', 'left');
		this.velocity.x = -10;
	}


	dash() {
		if(this.faceTo == 'right') {
			this.velocity.x = 20;
		} else {
			this.velocity.x = -20;
		}
	}


	jump() {
		if(this.jumpCountdown) {
			this.velocity.y = -15;
			this.jumpCountdown--;
		}
	}


	jumpReset() {
		this.jumpCountdown = this.maxJumps;
	}


	falling() {
		this.changeAnimation('falling', this.faceTo);
	}

}