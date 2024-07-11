class Grenade {

	constructor() {

		this.hitDamage = 120;

		this.multipleHit = true;

		this.explosionRadius = 150;

		this.timeToExplode = 1000;

		this.velocity = { x: 10, y: 10 };

		this.exploding = false;

		this.frameToTrigerAttack = 0;

		this.numberOfUnits = 3;

		this.cooldownTime = 2000;
		this.cooldown     = false;
	}


	preAttack() {

		if(this.cooldown) return false;

		if(this.numberOfUnits <= 0) return false;

		this.cooldown = true;
		setTimeout(()=>{ this.cooldown = false; }, this.cooldownTime);

		this.numberOfUnits--;

		let posAndDir = this.getThrownPosAndDirection();

		this.direction = posAndDir.dir;

		this.pos = {
			x: posAndDir.x,
			y: posAndDir.y,
			h: 7,
			w: 7
		};


		this.velocity.y = -10;
		this.velocity.x = (this.direction == 'left') ? -10 : 10;

		this.exploding = false;

		return true;
	}


	getThrownPosAndDirection() {
		return {
			x:   Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? 0 : 50),
			y:   Engine.hero.pos.y + 25,
			dir: Engine.hero.faceTo
		};
	}


	attack() {
		let key = Scenario.othersArray.push(this) - 1;
		setTimeout(() => {
			this.explode(key);
		}, this.timeToExplode);
	}


	update() {

		this.draw();

		this.checkEnemyCollision();

		this.pos.x += this.velocity.x;

		this.checkBlockCollisionX();

		this.applyGravity();

		this.checkBlockCollisionY();

		this.checkExplosionHitSomeone();
	}


	draw() {

		if(!this.exploding) {

			C.beginPath();
			C.arc(this.pos.x, this.pos.y, 7, 0, 2 * Math.PI);
			C.stroke();
			C.fillStyle = "darkgreen";
			C.fill();

		} else {

			let gradient = C.createRadialGradient(
				this.pos.x, this.pos.y, this.explosionRadius-30,
				this.pos.x, this.pos.y, this.explosionRadius+20
			);

			gradient.addColorStop(0, "white");
			gradient.addColorStop(1, "orange");

			C.beginPath();
			C.arc(this.pos.x, this.pos.y, this.explosionRadius, 0, 2 * Math.PI);
			C.fillStyle = gradient;
			C.fill();
		}
	}


	explode(key) {
		this.exploding = true;
		this.velocity = {
			x: 0,
			y: 0
		};
		Sounds.play('bombExp');
		setTimeout(() => {
			delete Scenario.othersArray[key];
		}, 150);
	}


	applyGravity(fixedPos) {
		if(!fixedPos) this.pos.y += this.velocity.y;
		this.velocity.y += Engine.gravity;
	}


	checkBlockCollisionY() {
		let block = Collisions.checkScenario(this);
		if(block !== false) {
			this.touchGround(block);
		}
	}


	checkExplosionHitSomeone() {
		if(!this.exploding) return;

		let attackHitBox = {
			pos: this.getHitBox()
		};

		let hitArrKey = Collisions.checkHitEnemy(attackHitBox, this.multipleHit);

		if(hitArrKey.length) {
			Sounds.play('hitting');
			hitArrKey.forEach(hitkey => {
				Scenario.enemiesArray[hitkey].getHit(hitkey, this.hitDamage);
			});
		}
	}


	getHitBox() {
		return {
			x: this.pos.x - this.explosionRadius,
			y: this.pos.y - this.explosionRadius,
			w: this.explosionRadius*2,
			h: this.explosionRadius*2
		};
	}


	checkEnemyCollision() {
		if(Collisions.checkHitEnemy(this, false)) {
			this.velocity.x = 0;
		}
	}


	checkBlockCollisionX() {
		let block = Collisions.checkScenario(this);
		if(block !== false) {
			this.touchWall(block);
		}
	}


	touchGround(block) {

		this.pos.y = block.pos.y - this.pos.h - 0.01;

		this.velocity.y = this.velocity.y*-0.5;

	}


	touchWall(block) {

		if(this.faceTo == 'right') {
			this.pos.x = block.pos.x - this.pos.w - 0.01;
		}

		if(this.faceTo == 'left') {
			this.pos.x = block.pos.x + block.pos.w + 0.01;
		}

		this.velocity.x = this.velocity.x*-1;
	}

}