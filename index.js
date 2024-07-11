const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const C = canvas.getContext('2d');
const scaledCanvas = {
	width:  canvas.width  / 4,
	height: canvas.height / 4
}

const cameraEdges = {
	right:  canvas.width  / 2,// /5 * 3,
	left:   canvas.width  / 2,// /5 * 2,
	top:    canvas.height /5 * 3,
	bottom: canvas.height /5 * 4
}

const possibleEnemies = [
	Guiorg
];


document.addEventListener('DOMContentLoaded', function() {
	Background.init();
	Sounds.init();

	Keys.monitor();

	Engine.hero = new Player;
	Engine.pet  = new KarAMelo;

	Scenario.setInitialBlock();
	Scenario.createRandomPath();

	Engine.load([
		Background,
		Scenario,
		Engine.pet,
		Engine.hero,
		Hud
	]);

	InitScreen.init();

	Engine.counterPlayTime = setInterval(() => {
		if(Engine.running) {
			Engine.playTime++;
		}
	}, 1000);

	//Engine.run();
}, false);


console.warn('** CREDITS/THANKS TO **');
console.warn('Hero: https://rvros.itch.io/animated-pixel-hero');
console.warn('KarAMelo: https://free-game-assets.itch.io/free-street-animal-pixel-art-asset-pack');
console.warn('Monsters: https://luizmelo.itch.io/monsters-creatures-fantasy')
console.warn('Grass: https://szadiart.itch.io/pixel-dark-forest');
console.warn('Ammo: https://fightswithbears.itch.io/2d-health-and-ammo-pickups');
console.warn('Potion: https://cup-coffee.itch.io/pixel-assets');