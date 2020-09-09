var driveA = new Pintograph.DoubleCircularDrive({
	position: {x: 140, y: 140},
	radius: 80,
	currentAngle: 0,
	rpm: 16.04,
	innerDrive: new Pintograph.CircularDrive({
		position: {x: 0, y: 0},
		radius: 30,
		currentAngle: 180,
		rpm: -24
	})
});

var driveB = new Pintograph.DoubleCircularDrive({
	position: {x: 140, y: 450},
	radius: 80,
	currentAngle: -90,
	rpm: -16,
	innerDrive: new Pintograph.CircularDrive({
		position: {x: 0, y: 0},
		radius: 30,
		currentAngle: 180,
		rpm: 32.02
	})
});


var arms = new Pintograph.CrossArms(driveA, driveB, 300, 300);
arms.flip = false;

//var pen = new Pintograph.SimplePen(arms, "rgba(255,255,255,0.55)");
var pen = new Pintograph.RainbowPen(arms, 0.75, 0.001);

var simulation = new Pintograph.Simulation(driveA, driveB, arms, pen);
simulation.timeStep = 5;
simulation.stepsPerFrame = 5;
simulation.fadeColor = "rgba(0,0,0,0.1)";
simulation.fadeInterval = 0;
simulation.renderTools = true;

setupUI(simulation);
