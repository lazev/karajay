const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const C = canvas.getContext('2d');
const scaledCanvas = {
	width:  canvas.width  / 4,
	height: canvas.height / 4
}

const cameraEdges = {
	right:  canvas.width  /5 * 3,
	left:   canvas.width  /5 * 2,
	top:    canvas.height /5 * 3,
	bottom: canvas.height /5 * 4
}

const possibleEnemies = [
	Guiorg
];

Background.init();
Sounds.init();

Keys.monitor();

Engine.hero = new Player;

//const enemy1 = new Enemy;

Scenario.setInitialBlock();
Scenario.createRandomPath();

Engine.load([
	Background,
	Scenario,
	Engine.hero
])

Engine.run();