const Scenario = {

	pathArray: [],

	referenceBlock:  {},

	blockPlatformHeight: 120,

	blocksUntilChangeY: 0,

	defaultBlockWidth: 6,
	defaultBlockHeight: 6,

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
		} while(block.pos.x < canvas.width+200);

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

			if(rand >= 98) {
				block.pos.y -= Scenario.blockPlatformHeight;
				block.pos.h += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y = block.pos.y;
				Scenario.referenceBlock.pos.h = block.pos.h;
				Scenario.blocksUntilChangeY = 50;
			}

			else if(rand >= 96) {
				block.pos.h += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y += Scenario.blockPlatformHeight;
				Scenario.blocksUntilChangeY = 50;
			}

			else if(rand >= 90){
				block.pos.w = 260;
				Scenario.referenceBlock.pos.w = 260;
			}
		}

		Scenario.blocksUntilChangeY--;

		return block;
	},


	moveScenarioX: player => {
		let last;

		for(let k in Scenario.pathArray) {
			Scenario.pathArray[k].pos.x -= player.velocity.x;
			last = Scenario.pathArray[k];
		}

		Scenario.referenceBlock.pos.x = last.pos.x;
		Scenario.referenceBlock.pos.y = last.pos.y;

		if(Scenario.referenceBlock.pos.x < canvas.width + 100) {
			Scenario.createRandomPath();
		}
	},


	moveScenarioY: player => {

		for(let k in Scenario.pathArray) {
			Scenario.pathArray[k].pos.y -= player.velocity.y;
		}
	},


	draw: () => {

		Scenario.pathArray.forEach(function(item){
			let block = new Blocks({
				pos: item.pos
			});

			block.draw();
		});

	},


	update: () => {
		Scenario.draw();
	}



};