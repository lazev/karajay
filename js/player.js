class Player {
	constructor() {
		this.color  = 'blue';

		this.size = {
			x: 100,
			y: 100
		};

		this.pos = {
			x: 400,
			y: 300
		};

		this.velocity = {
			x: 0,
			y: 1
		};

		this.maxJumps      = 2;
		this.jumpCountdown = 0;
	}


	draw() {
		C.fillStyle = this.color;
		C.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}


	update() {
		this.draw();

		this.pos.x += this.velocity.x;
		this.checkCollisionX();
		this.applyGravity();

		this.checkCollisionY();

		this.velocity.x = 0;

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
			this.dashRight();
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

		//const offset =
		//	this.pos.y - this.position.y + this.hitbox.height

		this.pos.y = Scenario.pathArray[blockId].pos.y - this.size.y - 0.01;
	}


	touchWall(blockId) {

		if(this.velocity.x > 0) {
			this.velocity.x = 0;
			this.pos.x = Scenario.pathArray[blockId].pos.x - this.size.x - 0.01;
		}

		if(this.velocity.x < 0) {
			this.velocity.x = 0;
			this.pos.x = Scenario.pathArray[blockId].pos.x + Scenario.pathArray[blockId].size.x + 0.01;
		}
	}


	runRight() {
		this.velocity.x = 10;
	}


	dashRight() {
		this.velocity.x = 30;
	}


	runLeft() {
		this.velocity.x = -10;
	}


	jump() {
		if(this.jumpCountdown) {
			this.velocity.y = -15;
			this.jumpCountdown--;
		}
	}


	jumpReset() {
		this.jumpCountdown = this.maxJumps;
	};

}