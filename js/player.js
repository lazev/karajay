class Player {
	constructor() {
		this.color  = 'blue';

		this.size = {
			x: 0,
			y: 0
		};

		this.pos = {
			x: 400,
			y: 200
		};

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

		this.sprite = new Adventurer15();
	}


	changeAnimation(animation, faceTo) {
		if(faceTo) this.faceTo = faceTo;
		this.animation = animation;
		//this.currentFrame = 0;
	}


	draw() {

		let frames    = this.sprite.map[this.animation][this.faceTo];
		let imgToDraw = this.sprite.image[this.faceTo];
		let scale     = this.sprite.scale;
		let buffer    = this.sprite.map[this.animation].framesToChange;

		let item = frames[this.currentFrame];
		if(Engine.elapsedFrames % buffer === 0) {
			if(this.currentFrame >= frames.length - 1) this.currentFrame = -1;
			this.currentFrame++;
		}

		this.size.x = item.hitSize.x * scale;
		this.size.y = item.hitSize.y * scale;

		C.fillStyle = this.color;
		C.fillRect(
			this.pos.x,
			this.pos.y,
			this.size.x,
			this.size.y
		);

		C.drawImage(
			imgToDraw,

			item.pos.x+item.hitPos.x,
			item.pos.y+item.hitPos.y,
			item.hitSize.x,
			item.hitSize.y,

			this.pos.x  - item.hitPos.x,
			this.pos.y  - item.hitPos.y,
			this.size.x + item.hitPos.x,
			this.size.y + item.hitPos.y
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

}