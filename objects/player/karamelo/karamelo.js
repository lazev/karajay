class KarAMelo extends Objects { //https://free-game-assets.itch.io/free-street-animal-pixel-art-asset-pack
	constructor() {

		let sprite = {
			scale: 2,

			image: {
				right: new Image(),
				left:  new Image()
			},

			map: {
				stay: {
					framesToChange: 6,
					right: [
						{ "pos": { "x": 0,   "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 48,  "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 96,  "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 144, "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } }
					],
					left: [
						{ "pos": { "x": 0,   "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 48,  "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 96,  "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } },
						{ "pos": { "x": 144, "y": 0, "w": 48, "h": 48 }, "hit": { "x": 5, "y": 23, "w": 29, "h": 25 } }
					]
				},
				run: {
					framesToChange: 4,
					right: [
						{ "pos": { "x": 0,   "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 48,  "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 96,  "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 144, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 192, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 240, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } }
					],
					left: [
						{ "pos": { "x": 0,   "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 48,  "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 96,  "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 144, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 192, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 240, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } }
					]
				},
				jump: {
					framesToChange: 9,
					right: [
						{ "pos": { "x": 144, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 192, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 240, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } }
					],
					left: [
						{ "pos": { "x": 144, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 192, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } },
						{ "pos": { "x": 240, "y": 49, "w": 48, "h": 38 }, "hit": { "x": 5, "y": 15, "w": 29, "h": 23 } }
					]
				}
			}
		};

		sprite.image.right.src = 'objects/player/karamelo/karameloRight.png';
		sprite.image.left.src  = 'objects/player/karamelo/karameloLeft.png';

		super({
			pos: {
				x: 200,
				y: 200,
				w: 0,
				h: 0
			},
			sprite
		});

		this.state = 'stay';

		this.arrayKey = 0;

		this.speed = 9;

		this.jumping = false;
	}


	update() {

		this.draw();

		this.applyGravity();

		this.checkBlockCollisionY();

		this.predictBlockCollisionX();

		this.lookForhero();

		this.pos.x += this.velocity.x;

	}


	lookForhero() {

		if(this.pos.x < Engine.hero.pos.x - 150) {
			this.runRight();
		}
		else if(this.pos.x > Engine.hero.pos.x + 200) {
			this.runLeft();
		}
		else {
			this.stay();
		}
	}


	predictBlockCollisionX() {

		let area;

		if(this.faceTo == 'right') {
			area = {
				pos: {
					x: this.pos.x,
					y: this.pos.y,
					w: 150,
					h: 5
				}
			}

			//~ C.fillStyle = 'rgba(123,123,123,0.4)';
			//~ C.fillRect(area.pos.x, area.pos.y, area.pos.w, area.pos.h);
		} else {
			area = {
				pos: {
					x: this.pos.x-100,
					y: this.pos.y,
					w: 100,
					h: 5
				}
			}

			//~ C.fillStyle = 'rgba(123,123,123,0.4)';
			//~ C.fillRect(area.pos.x, area.pos.y, area.pos.w, area.pos.h);
		}


		let block = Collisions.checkScenario(area);
		if(block !== false) {
			if(this.state == 'run') {
				console.log('jump');
				this.jump();
			}
		}
	}


	jump() {
		//~ this.velocity.x = 0;
		this.velocity.y = -16;
		this.changeState('jump');
		this.jumping = true;
		setTimeout(() => { this.jumping = false }, 300);
	}


	runRight() {
		this.velocity.x = this.speed;

		if(!this.jumping)
			this.changeState('run', 'right');
	}


	runLeft() {
		this.velocity.x = -this.speed;

		if(!this.jumping)
			this.changeState('run', 'left');
	}

	stay() {
		this.velocity.x = 0;
		this.changeState('stay');
	}
}