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

		if(debug) {
			console.log(obj1, obj2);
		}

		return (
			obj1.pos.y + obj1.size.y >= obj2.pos.y && obj1.pos.y <= obj2.pos.y + obj2.size.y &&
			obj1.pos.x <= obj2.pos.x + obj2.size.x &&	obj1.pos.x + obj1.size.x >= obj2.pos.x
		);
	},


	checkFall: (obj1, obj2) => {
		return (
			obj1.pos.y + obj1.size.y >= obj2.pos.y && obj1.pos.y + obj1.size.y <= obj2.pos.y + obj2.size.y &&
			obj1.pos.x <= obj2.pos.x + obj2.size.x && obj1.pos.x + obj1.size.x >= obj2.pos.x
		);
	}

};