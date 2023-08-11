class Pistol {

	constructor() {

		this.hitDamage = 32;

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
		let distance = 0;

		if(hitArrKey.length) {

			Sounds.play('hitting');

			hitArrKey.forEach(hitkey => {
				if(Scenario.enemiesArray[hitkey]) {
					distance = Scenario.enemiesArray[hitkey].pos.x - Engine.hero.pos.x;
					if(Math.abs(distance) < minorDistance) {
						minorDistance = Math.abs(distance);
						nearestEnemy = hitkey;
					}
				}
			});

			Scenario.enemiesArray[nearestEnemy].getHit(nearestEnemy, this.hitDamage, distance);
		}
	}
}