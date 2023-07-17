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
						{ pos: { x: 0,   y: 0, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					],

					left: [
						{ pos: { x: 0,   y: 0, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 0, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					]
				},
				run: {
					framesToChange: 6,
					right: [
						{ pos: { x: 0,   y: 48, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 200, y: 48, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 250, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 300, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					],

					left: [
						{ pos: { x: 0,   y: 48, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 200, y: 48, w: 50, h: 48 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 250, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 300, y: 48, w: 50, h: 48 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					]
				},
				gethit: {
					framesToChange: 6,
					right: [
						{ pos: { x: 0,   y: 144, w: 50, h: 49 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					],

					left: [
						{ pos: { x: 0,   y: 144, w: 50, h: 49 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 50,  y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 100, y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 150, y: 144, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					]
				},
				attack: {
					framesToChange: 9,
					right: [
						{ pos: { x: 150, y: 98, w: 50, h: 49 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 200, y: 98, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 250, y: 98, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 300, y: 98, w: 100, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					],

					left: [
						{ pos: { x: 150, y: 98, w: 50, h: 49 }, hit: { x: 8,  y: 8, w: 18, h: 29 } },
						{ pos: { x: 200, y: 98, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 250, y: 98, w: 50, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
						{ pos: { x: 300, y: 98, w: 100, h: 49 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
					]
				}
			}
		}

		sprite.image.right.src = 'sprites/enemies/guiorg/mapRight.png';
		sprite.image.left.src  = 'sprites/enemies/guiorg/mapLeft.png';

		super({pos, sprite});

		this.distanceToAttack = 100;
	}
}