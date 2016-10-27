var CircularDrive = function(props) {
	this.position = { x: 0, y: 0 }

	for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			this[prop] = props[prop];
		}
	}

	this.step(0);
	this.currentAngle = this.startingAngle;
};

CircularDrive.prototype.step = function step(t) {
	var deltaT = t - (this.previousT || 0);
	this.currentAngle = (this.currentAngle + this.rpm * 0.006 * deltaT) % 360;
	var currentAngleRad = MathUtils.degToRad(this.currentAngle);
	var x = this.radius * Math.cos(currentAngleRad) + this.position.x;
	var y = this.radius * Math.sin(currentAngleRad) + this.position.y;

	this.previousT = t;
	this.mountPoint = { x: x, y: y };
}

CircularDrive.prototype.render = function(context) {
	context.strokeStyle = "rgba(255,128,0,0.4)";
	context.fillStyle = "rgba(255,255,255,0.4)";
	context.lineWidth = 2;

	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	context.stroke();

	context.beginPath();
	context.arc(this.mountPoint.x, this.mountPoint.y, 5, 0, 2 * Math.PI);
	context.fill();
};