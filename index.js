const canvas = document.querySelector('canvas');
const C = canvas.getContext('2d');
const scaledCanvas = {
	width:  canvas.width  / 4,
	height: canvas.height / 4
}

canvas.width = 1024;
canvas.height = 576;

Background.init();

const cameraEdges = {
	right:  canvas.width  /4 * 3,
	left:   canvas.width  /4,
	top:    canvas.height /4,
	bottom: canvas.height /4 * 3
}

Keys.monitor();

var hero = new Player;

/*
var enemy = new Player;
enemy.color = 'red';
enemy.pos.x = 300;
*/

Scenario.setInitialBlock();
Scenario.createRandomPath();

Engine.load([
	Background,
	hero,
	//enemy,
	Scenario
])

Engine.run();