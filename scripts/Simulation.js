function Simulation(driveA, driveB, arms, pen, timeStep) {

    function realTimeStep() {
        return performance.now();
    }

    function fixedTimeStep() {
        currentTime += this.timeStep;
        return currentTime;
    }

    this.driveA = driveA;
    this.driveB = driveB;
    this.arms = arms;
    this.pen = pen;
    this.timeStep = timeStep;

    var currentTime = this.timeStep ? 0 : performance.now();

    this.stepTime = this.timeStep ? fixedTimeStep : realTimeStep;
}

Simulation.prototype.step = function() {
    var t = this.stepTime();

    driveA.step(t);
    driveB.step(t);
    arms.step(t);
    pen.step(t);
};

Simulation.prototype.draw = function(context) {
    pen.draw(context);
};

Simulation.prototype.drawTools = function(context) {
    var width = context.canvas.width;
	var height = context.canvas.height;
	
	context.clearRect(0, 0, width, height);
	
	driveA.render(context);
    driveB.render(context);
    arms.render(context);
    pen.render(context);
};