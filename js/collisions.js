const Collisions = {

	checkScenario: (obj1, debug) => {
		if(Scenario.pathArray.length) {
			for(let k in Scenario.pathArray) {
				if(Collisions.checkFull(obj1, Scenario.pathArray[k], debug)) return Scenario.pathArray[k];
			}
		}

		if(Scenario.platformArray.length) {
			for(let k in Scenario.platformArray) {
				if(Collisions.checkFall(obj1, Scenario.platformArray[k], debug)) return Scenario.platformArray[k];
			}
		}
		return false;
	},


	checkHitEnemy: (obj1) => {
		if(Scenario.enemiesArray.length) {
			for(let k in Scenario.enemiesArray) {
				if(Collisions.checkFull(obj1, Scenario.enemiesArray[k])) return k;
			}
		}

		return false;
	},


	checkEnemyTouch: obj1 => {
		if(Scenario.enemiesArray.length) {
			for(let k in Scenario.enemiesArray) {
				if(Collisions.checkFull(obj1, Scenario.enemiesArray[k])) return k;
			}
		}

		return false;
	},


	checkFull: (obj1, obj2, debug) => {
		return (
			obj1.pos.y + obj1.pos.h >= obj2.pos.y && obj1.pos.y <= obj2.pos.y + obj2.pos.h &&
			obj1.pos.x <= obj2.pos.x + obj2.pos.w && obj1.pos.x + obj1.pos.w >= obj2.pos.x
		);
	},


	checkObjArr: (obj1, arr, debug) => {
		return (
			obj1.pos.y + obj1.pos.h >= arr[1] && obj1.pos.y <= arr[1] + arr[3] &&
			obj1.pos.x <= arr[0] + arr[2] && obj1.pos.x + obj1.pos.w >= arr[0]
		);
	},


	checkFall: (obj1, obj2) => {
		return (
			obj1.pos.y + obj1.pos.h >= obj2.pos.y && obj1.pos.y + obj1.pos.h <= obj2.pos.y + obj2.pos.h &&
			obj1.pos.x <= obj2.pos.x + obj2.pos.w && obj1.pos.x + obj1.pos.w >= obj2.pos.x
		);
	}

};