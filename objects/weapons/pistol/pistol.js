class Pistol {

	constructor() {

		this.hitDamage = 50;

		this.multipleHit = false;

	}


	getHitBox() {
		return {
			x: Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? -797 : 50),
			y: Engine.hero.pos.y + 25,
			w: 800,
			h: 5
		};
	}


	attack() {
		let attackHitBox = {
			pos: this.getHitBox()
		};

		let hitArrKey = Collisions.checkHitEnemy(attackHitBox, true);


		let nearestEnemy = 0;
		let minorDistance = 9999;

		if(hitArrKey.length) {

			Sounds.play('hitting');

			hitArrKey.forEach(hitkey => {
				if(Scenario.enemiesArray[hitkey]) {
					console.log(hitkey, Scenario.enemiesArray[hitkey]);
					if(Math.abs(Scenario.enemiesArray[hitkey].pos.x - Engine.hero.x) < minorDistance) {
						console.log(minorDistance);
						minorDistance = Scenario.enemiesArray[hitkey].pos.x - Engine.hero.x;
						nearestEnemy = hitkey;
					}
				}
			});
			Scenario.enemiesArray[nearestEnemy].getHit(nearestEnemy, this.hitDamage);
		}
	}
}