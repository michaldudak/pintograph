var driveA = new DoubleCircularDrive({
	position: {x: 300, y: 800},
	radius: 100,
	startingAngle: 0,
	rpm: -8,
	innerDrive: new CircularDrive({                   
		position: {x: 500, y: 800},
		radius: 100,
		startingAngle: 180,
		rpm: -4                  
	})
});

var driveB = new DoubleCircularDrive({
	position: {x: 700, y: 800},
	radius: 100,
	startingAngle: 0,
	rpm: 8,
	innerDrive: new CircularDrive({
		position: {x: 500, y: 800},
		radius: 100,
		startingAngle: 180,
		rpm: 16.02
	})
});

var arms = new SimpleArms(driveA, driveB, 600, 600);
arms.flip = false;

//var pen = new SimplePen(arms, "rgba(255,255,255,0.15)");
var pen = new RainbowPen(arms, 0.25, 0.001);

var pause = false;
var drawOverlay = false;

var simulation = new Simulation(driveA, driveB, arms, pen, 30);

var drawingArea = document.getElementById('drawingArea');
var drawingContext = drawingArea.getContext('2d');

var overlayCanvas = document.getElementById('overlay');
var overlayContext = overlayCanvas.getContext('2d');

var counter = 0;

function simulate(repeat) {
	simulation.step();
	simulation.draw(drawingContext);
	
	if (counter++ > 1000) {
		drawingContext.globalAlpha = Math.random() / 20;
		drawingContext.fillStyle = "rgb(0,0,0)";
		drawingContext.fillRect(0, 0, drawingArea.width, drawingArea.height);
		counter = 0;
		drawingContext.globalAlpha = 1;
	}

	if (repeat && !pause) {
		requestAnimationFrame(function() { simulate(true); });
		requestAnimationFrame(overlay);
	} else {
		overlay();
	}
}

function overlay() {
	if (drawOverlay) {
		simulation.drawTools(overlayContext);
	} else {
		overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
	}
}

document.getElementById("step").addEventListener("click", function() {
	simulate(false);
});

document.getElementById("run").addEventListener("click", function() {
	pause = false;
	simulate(true);
});

document.getElementById("runFast").addEventListener("click", function() {
	pause = false;
	for (var i = 0; i < 50; ++i) {
		simulate(true);
	}
});

document.getElementById("pause").addEventListener("click", function() {
	pause = true;
});

document.getElementById("clear").addEventListener("click", function() {
	drawingContext.clearRect(0, 0, drawingArea.width, drawingArea.height);
});

document.getElementById("drawOverlay").addEventListener("change", function(e) {
	drawOverlay = e.target.checked;
});

document.getElementById("drawOverlay").checked = drawOverlay;

function bindProperty(controlId, object, propertyName) {
	var control = document.getElementById(controlId);
	control.addEventListener("change", function(e) {
		object[propertyName] = e.target.value;
	});

	control.value = object[propertyName];
}

bindProperty("driveARadius", driveA, "radius");
bindProperty("driveARpm", driveA, "rpm");
bindProperty("subdriveARadius", driveA.innerDrive, "radius");
bindProperty("subdriveARpm", driveA.innerDrive, "rpm");

bindProperty("driveBRadius", driveB, "radius");
bindProperty("driveBRpm", driveB, "rpm");
bindProperty("subdriveBRadius", driveB.innerDrive, "radius");
bindProperty("subdriveBRpm", driveB.innerDrive, "rpm");