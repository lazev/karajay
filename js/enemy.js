class Enemy {
	constructor({
		pos = {
			x: 500,
			y: 200
		}
	}) {

		this.life = 100;

		this.hitCooldown = false;

		this.color  = 'red';

		this.pos = {
			x: pos.x || 500,
			y: pos.y || 0,
			w: 70,
			h: 100
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

		this.recoilWhenHitted = 15;
	}

	draw() {

		C.fillStyle = this.color;

		C.fillRect(
			this.pos.x,
			this.pos.y,
			this.pos.w,
			this.pos.h
		);

	}


	applyGravity() {

		this.pos.y += this.velocity.y;

		this.velocity.y += Engine.gravity;
	}


	lookForhero() {
		let area = {
			pos: {
				x: this.pos.x - 300,
				y: this.pos.y,
				h: this.pos.h,
				w: this.pos.w + 600
			}
		};

		//C.fillStyle = 'rgba(255, 255, 255, 0.1)';
		//C.fillRect(
		//	area.pos.x,
		//	area.pos.y,
		//	area.pos.w,
		//	area.pos.h
		//);

		if(Collisions.checkFull(hero, area)) {
			if(this.pos.x > hero.pos.x) this.velocity.x = -2;
			else if(this.pos.x < hero.pos.x) this.velocity.x = 2;
			else this.velocity.x = 0;
		}

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
		this.velocity.y = 0;
		this.pos.y = Scenario.pathArray[blockId].pos.y - this.pos.h - 0.01;
	}


	update() {
		this.draw();

		this.applyGravity();

		this.checkCollisionY();

		this.lookForhero();

		this.pos.x += this.velocity.x;
	}
}