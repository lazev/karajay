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
		if(this.state == 'die') return;

		if(this.state != state || (typeof faceTo != 'undefined' && this.faceTo != faceTo)) {
			this.currentFrame = 0;
			if(this.attackingTimer) {
				clearTimeout(this.attackingTimer);
				this.attackingTimer = null;
			}
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

		let area = {};

		if(this.pos.x >= Engine.hero.pos.x) {

			area = [
				this.pos.x - this.distanceToAttack,
				this.pos.y,
				this.pos.w + this.distanceToAttack,
				this.pos.h
			];

		} else {

			area = [
				this.pos.x,
				this.pos.y,
				this.pos.w + this.distanceToAttack,
				this.pos.h
			];
		}

		C.fillStyle = 'rgba(255, 255, 255, 0.1)';
		C.fillRect(...area);

		return Collisions.checkObjArr(Engine.hero, area);
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

			if(this.attackingTimer) clearTimeout(this.attackingTimer);

			this.pos.x -= ((this.faceTo == 'right') ? 10 : -10);

			setTimeout(() => {
				this.hitCooldown = false;
			}, this.hitCooldownTimer);

			this.life -= 30;

			if(this.life <= 0) {
				this.changeState('die');
				this.lostScenarioFloor = true;
				setTimeout(() => {
					delete Scenario.enemiesArray[hitkey];
				}, 2000);
			}

		}
	}


	hitHero() {
		Engine.hero.checkGetHit(this);
	}


	update() {


		if(this.state == 'attack' && this.currentFrame == 5) {
			if(this.checkDistanceToAttack()) {
				this.hitHero();
			}
		}


		this.draw();

		this.applyGravity();

		this.checkBlockCollisionY();

		if(!this.hitCooldown) {
			this.pos.x += this.velocity.x;

			this.lookForhero();
		}

		if(!this.state) {
			this.changeState('stay');
		}

		this.checkBlockCollisionX();
	}
}