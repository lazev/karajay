class Shotgun {

	constructor() {

		this.hitDamage = 52;

		this.multipleHit = false;

		this.frameToTrigerAttack = 6;

	}


	getHitBox() {
		return {
			x: Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? -797 : 50),
			y: Engine.hero.pos.y + 50,
			w: 800,
			h: 5,
			firePos: Engine.hero.pos.x + ((Engine.hero.faceTo == 'left') ? -15 : 70)
		};
	}


	preAttack() {
		Sounds.play('shotgun');
	}


	attack() {

		let hitBox = this.getHitBox();

		let attackHitBox = {
			pos: hitBox
		};

		//Projectile path
		//C.fillStyle = 'rgba(123,123,123,0.4)';
		//C.fillRect(hitBox.x, hitBox.y, hitBox.w, hitBox.h);

		let gradient = C.createRadialGradient(
			hitBox.firePos, hitBox.y, 3,
			hitBox.firePos, hitBox.y, 7
		);

		// Add three color stops
		gradient.addColorStop(0, "white");
		gradient.addColorStop(1, "orange");

		C.beginPath();
		C.arc(hitBox.firePos, hitBox.y, 7, 0, 2 * Math.PI);
		C.fillStyle = gradient;

		C.fill();

		let hitArrKey = Collisions.checkHitEnemy(attackHitBox, true);

		let nearestEnemy = 0;
		let minorDistance = 9999;
		let distance = 0;

		if(hitArrKey.length) {

			hitArrKey.forEach(hitkey => {
				if(Scenario.enemiesArray[hitkey]) {
					distance = Scenario.enemiesArray[hitkey].pos.x - Engine.hero.pos.x;
					if(Math.abs(distance) < minorDistance) {
						minorDistance = Math.abs(distance);
						nearestEnemy = hitkey;
					}
				}
			});

			let block = Collisions.checkScenario(attackHitBox);
			let distanceBlock = 9999;

			if(block) distanceBlock = block.pos.x - Engine.hero.pos.x

			if(!block || Math.abs(distance) < Math.abs(distanceBlock)) {
				Scenario.enemiesArray[nearestEnemy].getHit(nearestEnemy, this.hitDamage, distance);
			}
		}
	}
}