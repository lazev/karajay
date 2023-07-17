class Enemy extends Element {
	constructor({pos, sprite}) {
		super({pos, sprite});

		this.life = 100;

		this.hitCooldown = false;

		this.hitCooldownTimer = 400;

		this.color  = 'red';

		this.recoilWhenHitted = 30;
	}



	changeState(state, faceTo) {
		if(this.state != state || (typeof faceTo != 'undefined' && this.faceTo != faceTo)) {
			console.log(this.state);
			this.currentFrame = 0;
		}

		if(faceTo) this.faceTo = faceTo;
		this.state = state;
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
		//C.fillRect(area.pos.x, area.pos.y, area.pos.w, area.pos.h);

		if(Collisions.checkFull(Engine.hero, area)) {

			if(this.checkDistanceToAttack()) {
				this.attack();
			}
			else if(this.pos.x >= Engine.hero.pos.x) {
				this.runLeft();
			}
			else if(this.pos.x < Engine.hero.pos.x) {
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
		if(this.pos.x >= Engine.hero.pos.x) {

			C.fillStyle = 'rgba(255, 255, 255, 0.1)';
			C.fillRect(
				this.pos.x - this.distanceToAttack,
				this.pos.y,
				this.pos.w + this.distanceToAttack,
				this.pos.h
			);

			if(this.pos.x - this.distanceToAttack <= Engine.hero.pos.x + Engine.hero.pos.w) {
				return true;
			}
		} else {

			C.fillStyle = 'rgba(255, 255, 255, 0.1)';
			C.fillRect(
				this.pos.x,
				this.pos.y,
				this.pos.w + this.distanceToAttack,
				this.pos.h
			);

			if(this.pos.x + this.pos.w + this.distanceToAttack >= Engine.hero.pos.x) {
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
			}, this.hitCooldownTimer);

			this.life -= 30;

			if(this.life <= 0)
				delete Scenario.enemiesArray[hitkey];
		}
	}


	update() {
		this.draw();

		this.applyGravity();

		this.checkBlockCollisionY();

		if(!this.hitCooldown) {
			this.pos.x += this.velocity.x;

			this.lookForhero();
		}

		if(!this.state) {
			console.log('sem state');
			this.changeState('stay');
		}

		this.checkBlockCollisionX();
	}
}