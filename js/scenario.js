const Scenario = {

	pathArray: [],
	platformArray: [],
	enemiesArray: [],
	othersArray: [],

	referenceBlock:  {},

	blockPlatformHeight: 120,

	blocksUntilChangeY: 0,

	defaultBlockWidth: 50,
	defaultBlockHeight: 24,


	setInitialBlock: () => {
		Scenario.referenceBlock = {
			pos: {
				x: -216,
				y: canvas.height - 80,
				w: 6,
				h: 6
			}
		};
	},


	createRandomPath: () => {

		let block;

		do {
			block = Scenario.createNextBlock();
			Scenario.pathArray.push(block);

			if(Scenario.pathArray.length > 5) {

				let rand = Engine.randomNumber(0, 100);

				if(rand > 90) {

					rand = Engine.randomNumber(0, possibleEnemies.length-1);

					Scenario.enemiesArray.push(new possibleEnemies[rand]({
						pos: {
							x: block.pos.x,
							y: block.pos.y - 200
						}
					}));
				}
			}

		} while(block.pos.x < canvas.width+200);

	},


	createRandomPlatforms: () => {

		Scenario.platformArray.push({
			pos: {
				x: Engine.randomNumber(1024, 2000),
				y: Engine.randomNumber(100, 400),
				w: 200,
				h: 16
			}
		});

	},


	createNextBlock: () => {

		let block = {
			pos:  {
				x: Scenario.referenceBlock.pos.x + Scenario.referenceBlock.pos.w,
				y: Scenario.referenceBlock.pos.y,
				w: Scenario.defaultBlockWidth,
				h: Scenario.defaultBlockHeight
			}
		};


		Scenario.referenceBlock = {
			pos: {
				y: block.pos.y,
				x: block.pos.x,
				w: Scenario.defaultBlockWidth,
				h: Scenario.defaultBlockHeight
			}
		};

		if(Scenario.blocksUntilChangeY <= 0) {
			Scenario.blocksUntilChangeY = 0;

			let rand = Math.random()*100;

			if(rand >= 75) {
				Scenario.createRandomPlatforms();
			}

			if(rand >= 85) {
				block.pos.y -= Scenario.blockPlatformHeight;
				block.pos.h += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y = block.pos.y;
				Scenario.referenceBlock.pos.h = block.pos.h;
				Scenario.blocksUntilChangeY = 5;
				block.pos.w = 25;
				Scenario.referenceBlock.pos.w = 25;
				block.imgSrc = 'img/floorgrassup.png';
			}

			else if(rand >= 70) {
				block.pos.h += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y += Scenario.blockPlatformHeight;
				Scenario.blocksUntilChangeY = 5;
				block.pos.w = 25;
				Scenario.referenceBlock.pos.w = 25;
				block.imgSrc = 'img/floorgrassdown.png';
			}

			else if(rand >= 10){
				block.pos.w = 260;
				Scenario.referenceBlock.pos.w = 260;
			}
		}

		Scenario.blocksUntilChangeY--;

		return block;
	},


	moveScenarioX: player => {
		let last;

		Engine.pet.pos.x -= player.velocity.x;

		for(let k in Scenario.pathArray) {
			Scenario.pathArray[k].pos.x -= player.velocity.x;
			last = Scenario.pathArray[k];
		}

		for(let k in Scenario.platformArray) {
			Scenario.platformArray[k].pos.x -= player.velocity.x;
		}

		for(k in Scenario.enemiesArray) {
			Scenario.enemiesArray[k].pos.x -= player.velocity.x;
		}

		for(k in Scenario.othersArray) {
			Scenario.othersArray[k].pos.x -= player.velocity.x;
		}

		Scenario.referenceBlock.pos.x = last.pos.x;
		Scenario.referenceBlock.pos.y = last.pos.y;

		if(Scenario.referenceBlock.pos.x < canvas.width + 100) {
			Scenario.createRandomPath();
		}
	},


	moveScenarioY: player => {

		let vel = (player.velocity.y < 0) ? -10 : 10;

		Engine.pet.pos.y -= vel;

		for(let k in Scenario.pathArray) {
			Scenario.pathArray[k].pos.y -= vel;
		}

		for(let k in Scenario.platformArray) {
			Scenario.platformArray[k].pos.y -= vel;
		}

		for(k in Scenario.enemiesArray) {
			Scenario.enemiesArray[k].pos.y -= vel;
		}

		for(k in Scenario.othersArray) {
			Scenario.othersArray[k].pos.y -= vel;
		}
	},


	draw: () => {

		Scenario.platformArray.forEach(function(item){
			if(item.pos.x+item.pos.w > 0 && item.pos.x < canvas.width) {
				let img = (item.imgSrc) ? item.imgSrc : 'img/floorgrass.png';
				let block = new Blocks({pos: item.pos, imgSrc: img});
				block.drawBack();
			}
		});

		Scenario.platformArray.forEach(function(item){
			if(item.pos.x+item.pos.w > 0 && item.pos.x < canvas.width) {
				let img = (item.imgSrc) ? item.imgSrc : 'img/floorgrass.png';
				let block = new Blocks({pos: item.pos, imgSrc: img});
				block.drawFront();
			}
		});

		Scenario.pathArray.forEach(function(item){
			if(item.pos.x+item.pos.w > 0 && item.pos.x < canvas.width) {
				let img = (item.imgSrc) ? item.imgSrc : 'img/floorgrass.png';
				let block = new Blocks({pos: item.pos, imgSrc: img});
				block.draw();
			}
		});

		Scenario.enemiesArray.forEach(function(item){
			item.update();
		});

		Scenario.othersArray.forEach(function(item){
			item.update();
		});

	},


	create: (item, pos) => {

		let lfpt;

		if(item == 'LifePotion') lfpt = new LifePotion({ pos: pos });
		if(item == 'SgAmmo')     lfpt = new SgAmmo({ pos: pos });
		if(item == 'Grenade')    lfpt = new Grenade({ pos: pos });

		let key = Scenario.othersArray.push(lfpt) - 1;

		Scenario.othersArray[key].arrayKey = key;
	},


	update: () => {
		Scenario.draw();
	}

};