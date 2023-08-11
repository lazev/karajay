class Guiorg extends Enemy { //https://rvros.itch.io/
	constructor({pos}) {

		pos.w = '50';
		pos.h = '70';

		let sprite = {
			scale: 3,

			image: {
				right: new Image(),
				left: new Image()
			},

			map: {
				stay: {
					framesToChange: 14,
					right: [
						{ "pos": { "x": 0,   "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 50,  "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 100, "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 151, "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } }
					],

					left: [
						{ "pos": { "x": 0,   "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 50,  "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 100, "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } },
						{ "pos": { "x": 152, "y": 0, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 8, "w": 26, "h": 35 } }
					]
				},
				run: {
					framesToChange: 6,
					right: [
						{ "pos": { "x": 250, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 300, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 0,   "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 50,  "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 100, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 149, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 200, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } }
					],

					left: [
						{ "pos": { "x": 250, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 300, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 0,   "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 50,  "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 100, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 154, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } },
						{ "pos": { "x": 200, "y": 48, "w": 50, "h": 48 }, "hit": { "x": 11, "y": 7, "w": 26, "h": 38 } }
					]
				},
				gethit: {
					framesToChange: 6,
					right: [
						{ "pos": { "x": 0,   "y": 149, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 50,  "y": 149, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 100, "y": 149, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 150, "y": 149, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 36 } }
					],

					left: [
						{ "pos": { "x": 0,   "y": 149, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 50,  "y": 149, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 100, "y": 149, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 149, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } }
					]
				},
				attack: {
					framesToChange: 9,
					right: [
						{ "pos": { "x": 50,  "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 100, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 150, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 200, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 250, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 329, "y": 96, "w": 90,  "h": 49 }, "hit": { "x": 30,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 429, "y": 96, "w": 90,  "h": 49 }, "hit": { "x": 30,  "y": 9, "w": 28, "h": 38 } }
					],

					left: [
						{ "pos": { "x": 50,  "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 101, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 154, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 201, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 251, "y": 96, "w": 50,  "h": 49 }, "hit": { "x": 10,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 330, "y": 96, "w": 90,  "h": 49 }, "hit": { "x": 30,  "y": 9, "w": 28, "h": 38 } },
						{ "pos": { "x": 422, "y": 96, "w": 80,  "h": 49 }, "hit": { "x": 20,  "y": 9, "w": 28, "h": 38 } }
					]
				},
				die: {
					framesToChange: 12,
					right: [
						{ "pos": { "x": 0,   "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 50,  "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 100, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } },
						{ "pos": { "x": 150, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 8,  "y": 8, "w": 29, "h": 35 } }
					],

					left: [
						{ "pos": { "x": 0,   "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 50,  "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 100, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } },
						{ "pos": { "x": 153, "y": 200, "w": 50, "h": 49 }, "hit": { "x": 11, "y": 8, "w": 29, "h": 36 } }
					]
				}
			}
		}

		sprite.image.right.src = 'objects/enemies/guiorg/mapRight.png';
		sprite.image.left.src  = 'objects/enemies/guiorg/mapLeft.png';

		super({pos, sprite});

		this.distanceToAttack = 100;
		this.delayToAttack = 800;
		this.attackHitPower = 20;
		this.frameToTrigerAttack = 5;
		this.maxLife = 100;
		this.life = this.maxLife;
		this.speed = Engine.randomNumber(4, 7);
	}
}