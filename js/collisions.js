const Collisions = {

	checkScenario: (obj1, debug) => {
		if(Scenario.pathArray.length) {
			for(let k in Scenario.pathArray) {
				if(Collisions.checkFull(obj1, Scenario.pathArray[k], debug)) return k;
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


	checkFall: (obj1, obj2) => {
		return (
			obj1.pos.y + obj1.pos.h >= obj2.pos.y && obj1.pos.y + obj1.pos.h <= obj2.pos.y + obj2.pos.h &&
			obj1.pos.x <= obj2.pos.x + obj2.pos.w && obj1.pos.x + obj1.pos.w >= obj2.pos.x
		);
	}

};