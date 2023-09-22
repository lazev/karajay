class Player extends Objects {
	constructor() {
		super({
			sprite: new Adventurer15,

			color: 'blue',

			pos: {
				x: 200,
				y: 200,
				w: 0,
				h: 0
			},

			hit: {
				x: 0,
				y: 0,
				w: 0,
				h: 0
			}
		});

		this.maxJumps      = 2;
		this.jumpCountdown = 0;

		this.dashing = false;

		this.attacking = 0;

		this.timerAttack = null;

		this.hitCooldown = false;
		this.hitCooldownTimer = 1000;

		this.weapon3Cooldown = false;
		this.weapon3CooldownTimer = 0;

		this.hitCooldownCounterAnimation = 0;

		this.totalHealth = 150;
		this.currentHealth = 150;
	}


	update() {

		if(this.hitCooldown) {
			C.globalAlpha = 0.5;
		}

		this.draw();

		C.globalAlpha = 1;

		this.haveState = false;

		this.pos.x += this.velocity.x;

		this.checkBlockCollisionX();

		if(Keys.pressed[Keys.map.down]) {
			this.pos.y += 15;
			this.haveState = true;
			this.crouch();
		}
		else if(Keys.pressed[Keys.map.right]) {
			if(!this.attacking) {
				this.haveState = true;
				this.runRight();
			}
		}
		else if(Keys.pressed[Keys.map.left]) {
			if(!this.attacking) {
				this.haveState = true;
				this.runLeft();
			}
		}

		if(this.velocity.y > 0.9) { //???
			if(!this.attacking && this.state != 'crouch') {
				this.haveState = true;
				this.falling();
			}
		}
		else if(this.velocity.y < 0) {
			this.haveState = true;
			this.jumping();
		}

		if(Keys.pressed[Keys.map.jump]) {
			Keys.pressed[Keys.map.jump] = false;
			this.haveState = true;
			this.jump();
		}

		if(Keys.pressed[Keys.map.dash]) {
			this.haveState = true;
			if(this.dashing) return;
			this.dashing = true;
			this.dash();
			setTimeout(() => { this.dashing = false; }, 700);
		}

		if(Keys.pressed[Keys.map.attack1]) {
			Keys.pressed[Keys.map.attack1] = false;
			if(this.attacking) return;
			this.attack1(true);
			this.timerAttack = setTimeout(() => {
				this.attack1(false);
			}, 150);
		}

		if(Keys.pressed[Keys.map.attack2]) {
			Keys.pressed[Keys.map.attack2] = false;
			if(this.attacking) return;
			this.attack2(true);
			this.timerAttack = setTimeout(() => {
				this.attack2(false);
			}, 150);
		}

		if(Keys.pressed[Keys.map.attack3]) {
			Keys.pressed[Keys.map.attack3] = false;
			if(this.attacking) return;
			this.attack3(true);
			this.timerAttack = setTimeout(() => {
				this.attack3(false);
			}, 150);
		}

		if(this.attacking) {
			this.haveState = true;
			this.setAttack(this.attacking);
		}

		this.applyGravity();

		this.checkBlockCollisionY();

		if(!this.haveState) this.stay();

		//this.checkGetHitOnTouch();

		this.moveCameraX();

		//C.fillStyle = 'rgba(123,123,123,0.4)';
		//C.fillRect(
		//	this.pos.x + ((this.faceTo == 'left') ? -797 : 50),
		//	this.pos.y + 25,
		//	800,
		//	5
		//)
	}


	attack1(bool) {
		this.attacking = (bool) ? 1 : 0;
	}


	attack2(bool) {
		this.attacking = (bool) ? 2 : 0;
	}


	attack3(bool) {
		this.attacking = (bool) ? 3 : 0;
	}


	setAttack(attackId) {

		this.changeState('attack'+ attackId, this.faceTo);
		this.velocity.x = 0;
		this.velocity.y = this.velocity.y / 5;

		let weapon;

		if(attackId == 1) {
			weapon = new GreyBlade;
		}
		else if(attackId == 2) {
			weapon = new Shotgun;
		}
		else if(attackId == 3) {
			if(!this.weapon3Cooldown) {
				this.weapon3Cooldown = true;
				weapon = new Grenade;

				this.weapon3CooldownTimer = setTimeout(()=> {
					this.weapon3Cooldown = false;
				}, weapon.cooldown ?? 150);
			}
		}

		if(weapon) weapon.attack();
	}


	checkGetHitOnTouch() {
		let ret = Collisions.checkEnemyTouch(this);
		if(ret !== false) {
			if(!this.hitCooldown) {
				this.hitCooldown = true;
				this.getHit(Scenario.enemiesArray[k]);
				setTimeout(()=> { this.hitCooldown = false }, this.hitCooldownTimer);
			}
		}
	}


	checkGetHit(enemy) {
		if(!this.hitCooldown) {
			this.hitCooldown = true;
			this.getHit(enemy);
			setTimeout(()=> { this.hitCooldown = false }, this.hitCooldownTimer);
		}
	}


	getHit(enemy) {
		this.currentHealth -= Engine.calcHitDamage(enemy.attackHitPower);
		this.changeState('getHit');
		Sounds.play('gethit');

		if(this.currentHealth <= 0) {
			Engine.endGame();
		}

		//if(enemy.pos.x > this.pos.x) {
		//	this.pos.x -= 50;
		//}
		//else {
		//	this.pos.x += 50;
		//}
		//this.pos.y -= 50;
	}


	moveCameraX() {
		let playerVelocity = this.velocity.x;

		if(this.pos.x + this.pos.w > cameraEdges.right && playerVelocity >= 0) {

			let distance = this.pos.x + this.pos.w - cameraEdges.right;

			Scenario.moveScenarioX(this);
			Background.moveBackgroundX(this);
			this.velocity.x = 0;

		}
		else if(this.pos.x < cameraEdges.left && playerVelocity <= 0) {

			let distance = cameraEdges.left - this.pos.x;

			Scenario.moveScenarioX(this);
			Background.moveBackgroundX(this);
			this.velocity.x = 0;
		}
	}


	applyGravity() {

		if(this.pos.y + this.pos.h > cameraEdges.bottom) {
			Scenario.moveScenarioY(this);
			super.applyGravity(true);
		}

		else if(this.pos.y < cameraEdges.top && this.velocity.y < 0) {
			Scenario.moveScenarioY(this);
			super.applyGravity(true);
		}

		else {
			super.applyGravity(false);
		}
	}


	stay() {
		this.changeState('stay');
		this.velocity.x = 0;
		Sounds.pause('running');
	}


   crouch() {
      this.changeState('crouch');
      this.velocity.x = 0;
   }


	runRight() {
		this.changeState('run', 'right');
		Sounds.play('running');
		this.velocity.x = 10;
	}


	runLeft() {
		this.changeState('run', 'left');
		Sounds.play('running');
		this.velocity.x = -10;
	}


	dash() {
		if(this.faceTo == 'right') {
			this.velocity.x += 200;
		} else {
			this.velocity.x += -200;
		}
	}


	jump() {
		if(this.jumpCountdown) {
			Sounds.pause('running');
			Sounds.play('jumping');
			this.velocity.y = -15;
			this.jumpCountdown--;
		}
	}


	jumpReset() {
		this.jumpCountdown = this.maxJumps;
	}


   jumping() {
      this.changeState('jump', this.faceTo);
   }


	falling() {
		this.changeState('fall', this.faceTo);
	}

}