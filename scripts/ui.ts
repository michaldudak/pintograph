import { Simulation } from "./Simulation";
import { DoubleCircularDrive } from "./drives/DoubleCircularDrive";

export function setupUI(simulation : Simulation) {
	var drawingArea = document.getElementById("drawingArea") as HTMLCanvasElement;
	var drawingContext = drawingArea.getContext("2d");

	var overlayCanvas = document.getElementById("overlay") as HTMLCanvasElement;
	var overlayContext = overlayCanvas.getContext("2d");

	function addListener(id : string, event : string, listener : (e : Event) => void) {
		document.getElementById(id).addEventListener(event, listener);
	}

	addListener("step", "click", function () {
		simulation.runSingleStep(drawingContext, overlayContext);
	});

	addListener("run", "click", function () {
		simulation.run(drawingContext, overlayContext);
	});

	addListener("pause", "click", function() {
		simulation.pause();
	});

	addListener("clear", "click", function() {
		drawingContext.clearRect(0, 0, drawingArea.width, drawingArea.height);
	});

	addListener("drawOverlay", "change", function(e) {
		simulation.renderTools = (e.target as HTMLInputElement).checked;
		if (!(e.target as HTMLInputElement).checked) {
			overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
		} else {
			simulation.drawTools(overlayContext);
		}
	});

	addListener("fade", "change", function(e) {
		simulation.fadeInterval = (e.target as HTMLInputElement).checked ? 6 : 0;
	});

	addListener("settings", "click", function() {
		var controlsPanel = document.querySelector(".controls");
		controlsPanel.classList.toggle("expanded");
	});

	(document.getElementById("drawOverlay") as HTMLInputElement).checked = simulation.renderTools;
	(document.getElementById("fade") as HTMLInputElement).checked = !!simulation.fadeInterval;

	function resizeCanvas() {
		var img = drawingContext.getImageData(0, 0, drawingArea.width, drawingArea.height);
		drawingArea.width = window.innerWidth;
		drawingArea.height = window.innerHeight;
		drawingContext.putImageData(img, 0, 0);

		overlayCanvas.width = window.innerWidth;
		overlayCanvas.height = window.innerHeight;
	}

	var resizeDelay : number | null = null;

	window.addEventListener("resize", function() {
		if (resizeDelay) {
			clearTimeout(resizeDelay);
		}

		resizeDelay = setTimeout(resizeCanvas, 150);
	});

	resizeCanvas();

	function bindNumberProperty(controlId : string, object : object, propertyName : string) {
		var control = document.getElementById(controlId) as HTMLInputElement;
		control.addEventListener("input", function(e) {
			object[propertyName] = +(e.target as HTMLInputElement).value || 0;
		});

		control.value = object[propertyName];
	}

	bindNumberProperty("driveARadius", simulation.driveA, "radius");
	bindNumberProperty("driveARpm", simulation.driveA, "rpm");
	bindNumberProperty("driveAX", simulation.driveA.position, "x");
	bindNumberProperty("driveAY", simulation.driveA.position, "y");

	bindNumberProperty("subdriveARadius", (simulation.driveA as DoubleCircularDrive).innerDrive, "radius");
	bindNumberProperty("subdriveARpm", (simulation.driveA as DoubleCircularDrive).innerDrive, "rpm");

	bindNumberProperty("driveBRadius", simulation.driveB, "radius");
	bindNumberProperty("driveBRpm", simulation.driveB, "rpm");
	bindNumberProperty("driveBX", simulation.driveB.position, "x");
	bindNumberProperty("driveBY", simulation.driveB.position, "y");

	bindNumberProperty("subdriveBRadius", (simulation.driveB as DoubleCircularDrive).innerDrive, "radius");
	bindNumberProperty("subdriveBRpm", (simulation.driveB as DoubleCircularDrive).innerDrive, "rpm");

	bindNumberProperty("stepsPerFrame", simulation, "stepsPerFrame");
	bindNumberProperty("timeStep", simulation, "timeStep");

	bindNumberProperty("arm1", simulation.arms, "lengthA");
	bindNumberProperty("arm2", simulation.arms, "lengthB");
}
