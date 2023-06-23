class Player {
	constructor() {

		this.sprite = new Adventurer15();

		this.color  = 'blue';

		this.size = {
			x: 0,
			y: 0
		};

		this.pos = {
			x: 0,
			y: 0
		};

		this.hitPos  = { x: 0, y: 0 };
		this.hitSize = { x: 0, y: 0 };

		this.velocity = {
			x: 0,
			y: 1
		};

		this.maxJumps      = 2;
		this.jumpCountdown = 0;

		this.dashing = false;

		this.faceTo = 'right';

		this.changeAnimation('stay');

		this.currentFrame  = 0;

		this.scale = this.sprite.scale;
	}


	get leftEdge() {
		return this.pos.x + this.hitPos.x * this.scale;
	}

	get rightEdge() {
		return (this.hitPos.x + this.hitSize.x) * this.scale;
	}

	get topEdge() {
		return this.pos.y + this.hitPos.y * this.scale;
	}

	get bottomEdge() {
		return (this.hitPos.y + this.hitSize.y) * this.scale;
	}


	changeAnimation(animation, faceTo) {
		if(faceTo) this.faceTo = faceTo;
		this.animation = animation;
	}


	draw() {

		let frames    = this.sprite.map[this.animation][this.faceTo];
		let imgToDraw = this.sprite.image[this.faceTo];
		let buffer    = this.sprite.map[this.animation].framesToChange;
		let item      = frames[this.currentFrame];

		this.hitPos  = item.hitPos;
		this.hitSize = item.hitSize;

		if(Engine.elapsedFrames % buffer === 0) {
			this.currentFrame++;
			console.log(this.currentFrame, frames.length-1);
			if(this.currentFrame >= frames.length-1) this.currentFrame = 0;
		}

		this.size = {
			x: item.hitSize.x * this.scale,
			y: item.hitSize.y * this.scale
		};

		C.fillStyle = this.color;
		C.fillRect(
			this.leftEdge,
			this.topEdge,
			this.rightEdge,
			this.bottomEdge
		);

		C.fillStyle = 'rgba(0, 255, 0, 0.2)';
		C.fillRect(
			this.pos.x,
			this.pos.y,
			item.size.x * this.scale,
			item.size.y * this.scale
		);

		C.drawImage(
			imgToDraw,

			item.pos.x,
			item.pos.y,
			item.size.x,
			item.size.y,

			this.pos.x,
			this.pos.y,
			item.size.x * this.scale,
			item.size.y * this.scale,
		);
	}


	update() {
		this.draw();

		this.pos.x += this.velocity.x;
		this.checkCollisionX();
		this.applyGravity();

		this.checkCollisionY();

		this.stay();

		if(Keys.pressed[Keys.map.right]) {
			this.runRight();
		}

		else if(Keys.pressed[Keys.map.left]) {
			this.runLeft();
		}

		if(Keys.pressed[Keys.map.jump]) {
			Keys.pressed[Keys.map.jump] = false;
			this.jump();
		}

		if(Keys.pressed[Keys.map.dash]) {
			if(this.dashing) return;
			this.dashing = true;
			this.dash();
			setTimeout(() => { this.dashing = false; }, 100);
		}

		if(this.velocity.y > 0.9) { //???
			this.falling();
		}

		this.moveCameraX();
	}


	moveCameraX() {
		let playerVelocity = this.velocity.x;
		if(
			this.pos.x + this.size.x > cameraEdges.right && playerVelocity > 0 ||
			this.pos.x < cameraEdges.left && playerVelocity < 0
		) {
			Scenario.moveScenarioX(this);
			Background.moveBackgroundX(this);
			this.velocity.x = 0;
		}
	}


	applyGravity() {

		if(this.pos.y + this.size.y > cameraEdges.bottom) {
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

		this.pos.y = Scenario.pathArray[blockId].pos.y - this.size.y - 0.01;
	}


	touchWall(blockId) {

		if(this.velocity.x > 0) {
			this.stay();
			this.pos.x = Scenario.pathArray[blockId].pos.x - this.size.x - 0.01;
		}

		if(this.velocity.x < 0) {
			this.stay();
			this.pos.x = Scenario.pathArray[blockId].pos.x + Scenario.pathArray[blockId].size.x + 0.01;
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