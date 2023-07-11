class Enemy extends Element {
	constructor({pos, sprite}) {
		super({pos, sprite});

		this.life = 100;

		this.hitCooldown = false;

		this.color  = 'red';

		this.recoilWhenHitted = 30;
	}


	// draw() {

	// 	C.fillStyle = this.color;

	// 	C.fillRect(
	// 		this.pos.x,
	// 		this.pos.y,
	// 		this.pos.w,
	// 		this.pos.h
	// 	);

	// }

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

			if(this.checkDistanceToAttack()) {
				console.log('attack');
				this.attack();
			}
			else if(this.pos.x >= hero.pos.x) {
				this.runLeft();
			}
			else if(this.pos.x < hero.pos.x) {
				this.runRight();
			}
			else {
				if(this.velocity.x != 0) {
					setTimeout(() => {
						this.velocity.x = 0;
						this.stay();
					}, 1000);
				}
			}
		}
	}


	checkDistanceToAttack() {
		if(this.pos.x >= hero.pos.x) {
			if(this.pos.x - hero.pos.x + hero.pos.w <= this.distanceToAttack) {
				return true;
			}
		} else {
			if(hero.pos.x - this.pos.x + this.pos.w <= this.distanceToAttack) {
				return true;
			}
		}

		return false;
	}


	runRight() {
		this.velocity.x = 6;
		this.changeState('run', 'right');
	}


	runLeft() {
		this.velocity.x = -6;
		this.changeState('run', 'left');
	}


	stay() {
		this.changeState('stay');
	}


	attack() {
		this.velocity.x = 0;
		this.changeState('attack');
	}


	getHit(hitkey) {
		if(this.hitCooldown == false) {
			this.hitCooldown = true;
			this.color = 'white';
			this.pos.x += ((this.faceTo == 'right') ? this.recoilWhenHitted : -this.recoilWhenHitted);
			this.changeState('gethit');

			this.pos.x -= ((this.faceTo == 'right') ? 10 : -10);

			setTimeout(() => {
				this.color = 'red';
				this.hitCooldown = false;
			}, 200);

			this.life -= 30;

			if(this.life <= 0)
				delete Scenario.enemiesArray[hitkey];
		}
	}


	update() {
		this.draw();

		this.applyGravity();

		this.checkBlockCollisionY();

		this.lookForhero();

		this.pos.x += this.velocity.x;

		this.checkBlockCollisionX();
	}
}