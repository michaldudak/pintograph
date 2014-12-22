// TODO: Extract rendering logic to a Renderer object

function Simulation(driveA, driveB, arms, pen) {

	this.driveA = driveA;
	this.driveB = driveB;
	this.arms = arms;
	this.pen = pen;
	this.timeStep = 10;
	this.stepsPerFrame = 10;
	this.renderTools = false;
	this.fadeColor = "rgba(0,0,0,0.1)";
	this.fadeInterval = 6;

	var currentTime = 0;

	this.stepTime = function () {
		currentTime += (+this.timeStep);
		return currentTime;
	};
}

var drawBuffer = [];

Simulation.prototype.step = function() {
	try {
		var t = this.stepTime();

		this.driveA.step(t);
		this.driveB.step(t);
		this.arms.step(t);
		this.pen.step(t);

		drawBuffer.push({ x: this.pen.mountPoint.x, y: this.pen.mountPoint.y, style: this.pen.lineStyle });
	} catch (err) {
		console.warn(err);
	}
};

Simulation.prototype.draw = function(context) {
	if (drawBuffer.length <= 1) {
		return;
	}
	
	context.beginPath();
	
	context.lineTo(drawBuffer[0].x, drawBuffer[0].y);
	for (var i = 1; i < drawBuffer.length; i++) {
		var nextPoint = drawBuffer[i];
		context.strokeStyle = nextPoint.style;
		context.lineTo(nextPoint.x, nextPoint.y);
	}
	
	context.stroke();

	var lastPoint = drawBuffer[drawBuffer.length - 1];
	drawBuffer = [ lastPoint ];
};

Simulation.prototype.drawTools = function(context) {
	var width = context.canvas.width;
	var height = context.canvas.height;

	context.clearRect(0, 0, width, height);

	this.driveA.render(context);
	this.driveB.render(context);
	this.arms.render(context);
	this.pen.render(context);
};

Simulation.prototype.runSingleStep = function(drawingContext, toolsDrawingContext) {
	this.step();
	this.draw(drawingContext);
	if (this.renderTools) {
		this.drawTools(toolsDrawingContext);
	}
};

Simulation.prototype.runOnce = function(drawingContext, toolsDrawingContext) {
	for (var i = 0; i < this.stepsPerFrame; i++) {
		this.step();
	}
	
	this.draw(drawingContext);
	if (this.renderTools) {
		this.drawTools(toolsDrawingContext);
	}
};

var running = false;

Simulation.prototype.run = function(drawingContext, toolsDrawingContext) {
	running = true;
	var self = this;
	var frameCounter = 0;
	
	function runStep() {
		if (self.fadeInterval) {
			if (frameCounter++ >= self.fadeInterval) {
				frameCounter = 0;
				drawingContext.fillStyle = self.fadeColor;
				drawingContext.fillRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
			}
		} else {
			frameCounter = 0;
		}
		
		self.runOnce(drawingContext, toolsDrawingContext);
		
		if (running) {
			requestAnimationFrame(runStep);
		}
	}
	
	runStep();
};

Simulation.prototype.pause = function() {
	running = false;
};