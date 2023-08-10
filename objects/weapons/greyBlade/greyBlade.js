class GreyBlade {

	constructor() {

		this.hitDamage = 20;

		this.multipleHit = true;

	}


	getHitBox() {
		return {
			x: Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? -40 : 30),
			y: Engine.hero.pos.y - 30,
			w: Engine.hero.pos.w + 10,
			h: Engine.hero.pos.h
		};
	}


	attack() {
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

}