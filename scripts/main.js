var driveA = new DoubleCircularDrive({
	position: {x: 200, y: 1000},
	radius: 300,
	startingAngle: 90,
	rpm: -24,
	innerDrive: new CircularDrive({
		position: {x: 500, y: 800},
		radius: 150,
		startingAngle: 180,
		rpm: -12
	})
});

var driveB = new DoubleCircularDrive({
	position: {x: 700, y: 1000},
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

var arms = new SimpleArms(driveA, driveB, 900, 900);
arms.flip = false;

//var pen = new SimplePen(arms, "rgba(255,255,255,0.55)");
var pen = new RainbowPen(arms, 0.75, 0.001);

var drawOverlay = false;

var simulation = new Simulation(driveA, driveB, arms, pen);
simulation.timeStep = 10;
simulation.stepsPerFrame = 200;
simulation.fadeColor = "rgba(0,0,0,0.1)";
simulation.fadeInterval = 6;

setupUI(simulation);