class LifePotion extends Objects { //https://cup-coffee.itch.io/pixel-assets
	constructor({pos}) {

		pos.w = '50';
		pos.h = '70';

		let sprite = {
			scale: 1,

			image: {
				right: new Image(),
				left:  new Image()
			},

			map: {
				stay: {
					framesToChange: 100,
					right: [
						{ "pos": { "x": 0,   "y": 0, "w": 23, "h": 31 }, "hit": { "x": 0, "y": 0, "w": 23, "h": 31 } }
					],
					left: [
						{ "pos": { "x": 0,   "y": 0, "w": 23, "h": 31 }, "hit": { "x": 0, "y": 0, "w": 23, "h": 31 } }
					]
				}
			}
		};

		sprite.image.right.src = 'objects/powerups/lifePotion/lifePotion.png';
		sprite.image.left.src  = 'objects/powerups/lifePotion/lifePotion.png';

		super({pos, sprite});

		this.state = 'stay';

		this.lifeRecovery = 70;

		this.arrayKey = 0;

		this.canPickup = false;

		setTimeout(()=>{
			this.canPickup = true;
		}, 1000);
	}


	update() {

		this.draw();

		this.applyGravity();

		if(this.canPickup == true) this.checkHeroTouch();

		this.checkBlockCollisionY();

		this.checkBlockCollisionX();
	}


	checkHeroTouch() {
		if(Collisions.checkFull(Engine.hero, this)) {
			delete Scenario.othersArray[this.arrayKey];
			Sounds.play('potion');
			Engine.hero.currentHealth += parseInt(Engine.hero.totalHealth*this.lifeRecovery/100);
			if(Engine.hero.currentHealth > Engine.hero.totalHealth) Engine.hero.currentHealth = Engine.hero.totalHealth;
		}
	}

}