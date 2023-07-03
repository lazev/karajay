class Adventurer15 { //https://rvros.itch.io/
	constructor() {
		this.scale = 3;

		this.image = { right: new Image(), left: new Image() };
		this.image.right.src = 'sprites/player/adventurer-1.5/mapRight.png';
		this.image.left.src  = 'sprites/player/adventurer-1.5/mapLeft.png';

		this.map = {
			stay: {
				framesToChange: 14,
				right: [
					{ pos: { x: 0,   y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 50,  y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 100, y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 150, y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
				],

				left: [
					{ pos: { x: 0,   y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 50,  y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 100, y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } },
					{ pos: { x: 150, y: 0, w: 50, h: 37 }, hit: { x: 15, y: 7, w: 18, h: 29 } }
				]
			},

			crouch: {
				framesToChange: 14,
				right: [
					{ pos: { x: 200, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 250, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 300, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 0,   y: 37, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } }
				],

				left: [
					{ pos: { x: 200, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 250, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 300, y:  0, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } },
					{ pos: { x: 0,   y: 37, w: 50, h: 37 }, hit: { x: 15, y: 14, w: 18, h: 22 } }
				]
			},

			run: {
				framesToChange: 5,
				right: [
					{ pos: { x: 50,  y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 100, y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 150, y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 200, y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 250, y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 300, y: 37, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } }
				],
				left: [
					{ pos: { x: 50,  y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } },
					{ pos: { x: 100, y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } },
					{ pos: { x: 150, y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } },
					{ pos: { x: 200, y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } },
					{ pos: { x: 250, y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } },
					{ pos: { x: 300, y: 37, w: 50, h: 37 }, hit: { x: 10, y: 4, w: 18, h: 29 } }
				]
			},

			jump: {
				framesToChange: 20,
				right: [
					{ pos: { x: 100, y: 74, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } }
				],
				left: [
					{ pos: { x: 100, y: 74, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } }
				]
			},

			fall: {
				framesToChange: 5,
				right: [
					{ pos: { x: 50,  y: 111, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 100, y: 111, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } }
				],
				left: [
					{ pos: { x: 50,  y: 111, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 100, y: 111, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } }
				]
			},

			attack1: {
				framesToChange: 4,
				right: [
					{ pos: { x: 250, y: 481, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 300, y: 481, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 0,   y: 518, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
				],
				left: [
					{ pos: { x: 250, y: 481, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 300, y: 481, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 0,   y: 518, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
				]
			},

			getHit: {
				framesToChange: 4,
				right: [
					{ pos: { x: 150, y: 444, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 350, y: 444, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
				],
				left: [
					{ pos: { x: 150, y: 444, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
					{ pos: { x: 350, y: 444, w: 50, h: 37 }, hit: { x: 20, y: 4, w: 18, h: 29 } },
				]
			}
		};
	}
}
