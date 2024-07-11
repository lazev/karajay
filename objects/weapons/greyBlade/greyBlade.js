class GreyBlade {

	constructor() {

		this.hitDamage = 20;

		this.multipleHit = true;

		this.frameToTrigerAttack = 1;

		this.cooldown = false;
		this.cooldownTime = 300;
	}


	getHitBox() {
		return {
			x: Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? -40 : 30),
			y: Engine.hero.pos.y - 30,
			w: Engine.hero.pos.w + 10,
			h: Engine.hero.pos.h
		};
	}


	preAttack() {

		if(this.cooldown) return false;

		return true;
	}


	attack() {
		let attackHitBox = {
			pos: this.getHitBox()
		};

		this.cooldown = true;
		setTimeout(()=>{ this.cooldown = false; }, this.cooldownTime);

		let hitArrKey = Collisions.checkHitEnemy(attackHitBox, this.multipleHit);

		if(hitArrKey.length) {
			Sounds.play('hitting');
			hitArrKey.forEach(hitkey => {
				Scenario.enemiesArray[hitkey].getHit(hitkey, this.hitDamage);
			});
		}
	}

}