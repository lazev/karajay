const Hud = {

	update: () => {

		Hud.updateKillCounter();
		Hud.setHealthBar();
		Hud.updateClock();
		Hud.updateAmmo();
		Hud.updateBomb();
	},


	setHealthBar(currentHealth) {

		let totalHealthBar = 200;

		let x = Engine.hero.currentHealth * totalHealthBar / Engine.hero.totalHealth;

		if(x < 0) x = 0;

		C.fillStyle = 'gray';
		C.fillRect(28, 28, totalHealthBar+4, 24);

		C.fillStyle = 'darkgreen';
		C.fillRect(30, 30, x, 20);
	},


	updateKillCounter: () => {

		C.font = "20px Comic Sans MS";
		C.fillStyle = "red";
		C.textAlign = "center";
		C.fillText("☠ "+ Engine.totalKills, 400, 40);
	},


	updateAmmo: () => {

		C.font = "20px Comic Sans MS";
		C.fillStyle = "yellow";
		C.textAlign = "center";
		C.fillText(" "+ Engine.hero.weapons[2].ammo, 500, 40);
	},


	updateBomb: () => {

		C.font = "20px Comic Sans MS";
		C.fillStyle = "darkgreen";
		C.textAlign = "center";
		C.fillText(" "+ Engine.hero.weapons[3].numberOfUnits, 550, 40);
	},


	updateClock: () => {
		let time = Engine.playTime;
		let hour = parseInt(time/3600);
		let tmp  = time-hour*3600;
		let min  = parseInt(tmp/60);
		let sec  = tmp-min*60;

		if(hour > 0) {
			 if(hour < 10) hour = '0'+hour;
			 hour = hour +':';
		} else hour = '';

		if(min < 10) min = '0'+ min;
		if(sec < 10) sec = '0'+ sec;

		C.font = "20px Comic Sans MS";
		C.fillStyle = "white";
		C.textAlign = "center";
		C.fillText(hour + min +':'+ sec, 900, 40);

	}

}