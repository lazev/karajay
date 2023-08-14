const Hud = {
	
	update: () => {
		
		Hud.updateKillCounter();
		Hud.setHealthBar();
	
	},
		

	setHealthBar(currentHealth) {

		let totalHealthBar = 200;

		let x = Engine.hero.currentHealth * totalHealthBar / Engine.hero.totalHealth;

		if(x < 0) x = 0;

		C.fillStyle = 'gray';
		C.fillRect(28, 28, totalHealthBar+4, 24);

		C.fillStyle = 'yellow';
		C.fillRect(30, 30, x, 20);
	},
	
	
	updateKillCounter: () => {
		
		C.font = "20px Comic Sans MS";
		C.fillStyle = "red";
		C.textAlign = "center";
		C.fillText("💀 "+ Engine.totalKills, 400, 40);
	}
	
}