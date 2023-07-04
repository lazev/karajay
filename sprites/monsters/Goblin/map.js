class Goblin { //https://rvros.itch.io/
	constructor() {
		this.scale = 3;

		this.image = { right: new Image(), left: new Image() };
		this.image.right.src = 'sprites/player/adventurer-1.5/mapRight.png';
		this.image.left.src  = 'sprites/player/adventurer-1.5/mapLeft.png';

		this.map = {
			stay: {
				right.src = 'sprites/monsters/Goblin/IdleRight.png';
				left.src  = 'sprites/monsters/Goblin/IdleLeft.png';
				framesToChange: 14,
				right: [
					{ pos: { x: 0,   y: 0, w: 50, h: 48 }, hit: { x: 8, y: 8, w: 70, h: 80 } },
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