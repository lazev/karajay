class Grenade {

	constructor() {

		this.hitDamage = 190;

		this.multipleHit = true;

		this.cooldown = 2000;

		let posAndDir = this.getThrownPosAndDir();

		this.direction = posAndDir.dir;

		this.velocity = {
			x: 10,
			y: -10
		};

		if(this.direction == 'left')
			this.velocity.x = -this.velocity.x;

		this.pos = {
			x: posAndDir.x,
			y: posAndDir.y,
			h: 7,
			w: 7
		};

		this.explosionRadius = 150;
		this.timeToExplode = 1000;
		this.exploding = false;

		this.draw();
	}


	getThrownPosAndDir() {
		return {
			x:   Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? 0 : 50),
			y:   Engine.hero.pos.y + 25,
			dir: Engine.hero.faceTo
		};
	}


	draw() {

		if(!this.exploding) {

			C.beginPath();
			C.arc(this.pos.x, this.pos.y, 7, 0, 2 * Math.PI);
			C.stroke();
			C.fillStyle = "darkgreen";
			C.fill();

		} else {

			const gradient = C.createRadialGradient(
				this.pos.x, this.pos.y, this.explosionRadius-30,
				this.pos.x, this.pos.y, this.explosionRadius+20
			);

			// Add three color stops
			gradient.addColorStop(0, "white");
			gradient.addColorStop(1, "orange");

			C.beginPath();
			C.arc(this.pos.x, this.pos.y, this.explosionRadius, 0, 2 * Math.PI);
			C.fillStyle = gradient;
			C.fill();
		}

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


	attack() {
		let key = Scenario.othersArray.push(this) - 1;
		setTimeout(() => {
			this.explode(key);
		}, this.timeToExplode);
	}


	explode(key) {
		this.exploding = true;
		this.velocity = {
			x: 0,
			y: 0
		};
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


	getHitBox() {
		return {
			x: this.pos.x - this.explosionRadius,
			y: this.pos.y - this.explosionRadius,
			w: this.explosionRadius*2,
			h: this.explosionRadius*2
		};
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