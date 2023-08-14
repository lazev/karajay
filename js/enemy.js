class Enemy extends Objects {
	constructor({pos, sprite}) {
		super({pos, sprite});

		this.hitCooldown = false;

		this.hitCooldownTimer = 400;

		this.color  = 'red';

		this.recoilWhenHitted = 30;

		this.dead = false;

		this.panicRunFaceTo = '';

		this.panicRunTimer  = null;
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

			this.panicRunning();
		}

		if(!this.state) {
			this.changeState('stay');
		}

		this.checkBlockCollisionX();

		this.setHealthBar();
	}


	setHealthBar(currentHealth) {
		if(this.dead) return;

		let totalHealthSize = 60;

		let x = this.life * totalHealthSize / this.maxLife;

		if(x < 0) x = 0;

		C.fillStyle = 'gray';
		C.fillRect(this.pos.x+10, this.pos.y-20, totalHealthSize+2, 6);

		C.fillStyle = 'red';
		C.fillRect(this.pos.x+11, this.pos.y-19, x, 4);
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
		if(this.dead) return;
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

			if(this.panicRunTimer) {
				this.panicRunStop();
			}

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
		} else {
			if(this.velocity.x == 0) {
				this.stay();
			}
		}
	}


	checkDistanceToAttack() {
		if(this.dead) return;

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

		//C.fillStyle = 'rgba(255, 255, 255, 0.1)';
		//C.fillRect(...area);

		return Collisions.checkObjArr(Engine.hero, area);
	}


	runRight() {
		if(this.dead) return;

		this.velocity.x = this.speed;
		this.changeState('run', 'right');
	}


	runLeft() {
		if(this.dead) return;

		this.velocity.x = -this.speed;
		this.changeState('run', 'left');
	}


	stay() {
		if(this.dead) return;

		this.changeState('stay');
	}


	attack() {
		if(this.dead) return;

		this.velocity.x = 0;
		this.changeState('attack');
	}


	getHit(hitkey, damage, distance) {
		if(this.dead) return;

		if(this.hitCooldown == false) {
			this.hitCooldown = true;

			this.pos.x += ((this.faceTo == 'right') ? this.recoilWhenHitted : -this.recoilWhenHitted);
			this.changeState('gethit');

			if(this.attackingTimer) clearTimeout(this.attackingTimer);

			this.pos.x -= ((this.faceTo == 'right') ? 10 : -10);

			setTimeout(() => {
				this.hitCooldown = false;
			}, this.hitCooldownTimer);

			this.life -= Engine.calcHitDamage(damage);

			if(this.life <= 0) {
				this.dead = true;
				this.velocity.x = 0;
				this.changeState('die');
				//this.lostScenarioFloor = true;
				setTimeout(() => {
					delete Scenario.enemiesArray[hitkey];
				}, 2000);
				Engine.totalKills++;
			}

			if(Scenario.enemiesArray[hitkey])
				Scenario.enemiesArray[hitkey].panicRunStart((distance < 0) ? 'right' : 'left');
		}
	}


	hitHero() {
		if(this.dead) return;

		Engine.hero.checkGetHit(this);
	}


	panicRunStop() {
		clearTimeout(this.panicRunTimer);
		this.panicRunTimer = null;
		this.panicRunFaceTo = '';
	}


	panicRunStart(leftOrRight) {
		this.panicRunStop();
		this.panicRunFaceTo = leftOrRight;
		this.panicRunTimer = setTimeout(()=>{
			this.panicRunStop();
		}, 4000);
	}


	panicRunning() {
		if(this.panicRunFaceTo == 'left') {
			this.runLeft();
			return true;
		}
		else if(this.panicRunFaceTo == 'right') {
			this.runRight();
			return true;
		}
		return false;
	}
}