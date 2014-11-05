var driveA = new DoubleCircularDrive({
	position: {x: 200, y: 800},
	radius: 300,
	startingAngle: 90,
	rpm: -24,
	innerDrive: new CircularDrive({
		position: {x: 500, y: 800},
		radius: 150,
		startingAngle: 180,
		rpm: 12.06
	})
});

var driveB = new DoubleCircularDrive({
	position: {x: 700, y: 800},
	radius: 250,
	startingAngle: 0,
	rpm: 24,
	innerDrive: new CircularDrive({
		position: {x: 500, y: 800},
		radius: 120,
		startingAngle: 180,
		rpm: -48.06
	})
});

var arms = new SimpleArms(driveA, driveB, 700, 700);
arms.flip = false;

//var pen = new SimplePen(arms, "rgba(255,255,255,0.55)");
var pen = new RainbowPen(arms, 0.75, 0.001);

var drawOverlay = false;

var simulation = new Simulation(driveA, driveB, arms, pen);
simulation.timeStep = 5;
simulation.stepsPerFrame = 300;
simulation.fadeColor = "rgba(0,0,0,0.1)";
simulation.fadeInterval = 6;

setupUI(simulation);