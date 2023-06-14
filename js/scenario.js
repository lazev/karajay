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
				y: canvas.height - 80
			},
			size: {
				x: 6,
				y: 6
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
			pos:  {x: 0,  y: 0 },
			size: {
				x: Scenario.defaultBlockWidth,
				y: Scenario.defaultBlockHeight
			}
		};

		block.pos.x = Scenario.referenceBlock.pos.x + Scenario.referenceBlock.size.x;
		block.pos.y = Scenario.referenceBlock.pos.y;

		Scenario.referenceBlock.pos.x = block.pos.x;
		Scenario.referenceBlock.pos.y = block.pos.y;

		if(Scenario.blocksUntilChangeY <= 0) {
			Scenario.blocksUntilChangeY = 0;

			let rand = Math.random()*100;

			if(rand >= 98) {
				block.pos.y  -= Scenario.blockPlatformHeight;
				block.size.y += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y  = block.pos.y;
				Scenario.referenceBlock.size.y = block.size.y;
				Scenario.blocksUntilChangeY = 10;
			}
			else if(rand >= 96) {
				block.size.y += Scenario.blockPlatformHeight;
				Scenario.referenceBlock.pos.y += Scenario.blockPlatformHeight;
				Scenario.blocksUntilChangeY = 10;
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
				pos:  item.pos,
				size: item.size
			});

			block.draw();
		});

	},


	update: () => {
		Scenario.draw();
	}



};