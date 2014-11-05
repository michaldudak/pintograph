function setupUI(simulation) {
	var drawingArea = document.getElementById("drawingArea");
	var drawingContext = drawingArea.getContext("2d");

	var overlayCanvas = document.getElementById("overlay");
	var overlayContext = overlayCanvas.getContext("2d");

	document.getElementById("step").addEventListener("click", function() {
		simulation.runSingleStep(drawingContext, overlayContext);
	});

	document.getElementById("run").addEventListener("click", function() {
		simulation.run(drawingContext, overlayContext);
	});

	document.getElementById("pause").addEventListener("click", function() {
		simulation.pause();
	});

	document.getElementById("clear").addEventListener("click", function() {
		drawingContext.clearRect(0, 0, drawingArea.width, drawingArea.height);
	});

	document.getElementById("drawOverlay").addEventListener("change", function(e) {
		simulation.renderTools = e.target.checked;
		if (!e.target.checked) {
			overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
		} else {
			simulation.drawTools(overlayContext);
		}
	});
	
	document.getElementById("fade").addEventListener("change", function(e) {
		simulation.fadeInterval = e.target.checked ? 6 : 0;
	});

	document.getElementById("drawOverlay").checked = simulation.renderTools;
	document.getElementById("fade").checked = !!simulation.fadeInterval;

	function bindNumberProperty(controlId, object, propertyName) {
		var control = document.getElementById(controlId);
		control.addEventListener("input", function(e) {
			object[propertyName] = +e.target.value || 0;
		});

		control.value = object[propertyName];
	}

	bindNumberProperty("driveARadius", simulation.driveA, "radius");
	bindNumberProperty("driveARpm", simulation.driveA, "rpm");
	bindNumberProperty("driveAX", simulation.driveA.position, "x");
	bindNumberProperty("driveAY", simulation.driveA.position, "y");
	
	bindNumberProperty("subdriveARadius", simulation.driveA.innerDrive, "radius");
	bindNumberProperty("subdriveARpm", simulation.driveA.innerDrive, "rpm");

	bindNumberProperty("driveBRadius", simulation.driveB, "radius");
	bindNumberProperty("driveBRpm", simulation.driveB, "rpm");
	bindNumberProperty("driveBX", simulation.driveB.position, "x");
	bindNumberProperty("driveBY", simulation.driveB.position, "y");
	
	bindNumberProperty("subdriveBRadius", simulation.driveB.innerDrive, "radius");
	bindNumberProperty("subdriveBRpm", simulation.driveB.innerDrive, "rpm");

	bindNumberProperty("stepsPerFrame", simulation, "stepsPerFrame");
	bindNumberProperty("timeStep", simulation, "timeStep");
	
	bindNumberProperty("arm1", simulation.arms, "lengthA");
	bindNumberProperty("arm2", simulation.arms, "lengthB");
}