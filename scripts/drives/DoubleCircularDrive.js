var DoubleCircularDrive = function(props) {
	for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			this[prop] = props[prop];
		}
	}

	this.currentAngle = this.startingAngle;
	this.step(0);
};

DoubleCircularDrive.prototype.step = function(t) {
	var previousAngle = this.currentAngle;
	var deltaT = t - (this.previousT || 0);
	this.currentAngle = (this.currentAngle + this.rpm * 0.006 * deltaT) % 360;

	var currentAngleRad = MathUtils.degToRad(this.currentAngle);
	var x = this.radius * Math.cos(currentAngleRad) + this.position.x;
	var y = this.radius * Math.sin(currentAngleRad) + this.position.y;

	this.innerDrive.position.x = x;
	this.innerDrive.position.y = y;

	if (this.rotateInnerDrive) {
		this.innerDrive.currentAngle += this.currentAngle - previousAngle;
	}

	this.innerDrive.step(t);

	this.previousT = t;
	this.mountPoint = this.innerDrive.mountPoint;
};

DoubleCircularDrive.prototype.render = function(context) {
	context.strokeStyle = "rgba(255,128,0,0.2)";
	context.fillStyle = "rgba(255,255,255,0.25)";

	// inner drive's path
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	context.stroke();

	// inner drive's mount point
	context.beginPath();
	context.arc(this.innerDrive.position.x, this.innerDrive.position.y, 5, 0, 2 * Math.PI);
	context.fill();

	// outer bounds
	context.strokeStyle = "rgba(255,128,0,0.4)";
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius + this.innerDrive.radius, 0, 2 * Math.PI);
	context.stroke();

	this.innerDrive.render(context);
};