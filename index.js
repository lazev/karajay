const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const C = canvas.getContext('2d');
const scaledCanvas = {
	width:  canvas.width  / 4,
	height: canvas.height / 4
}

const cameraEdges = {
	right:  canvas.width  /4 * 3,
	left:   canvas.width  /4,
	top:    canvas.height /4,
	bottom: canvas.height /4 * 3
}

Background.init();
Sounds.init();

Keys.monitor();

var hero = new Player;

Scenario.setInitialBlock();
Scenario.createRandomPath();

Engine.load([
	Background,
	hero,
	//enemy,
	Scenario
])

Engine.run();