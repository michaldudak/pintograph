var CircularDrive = function(props) {
	this.position = { x: 0, y: 0 }
    
    for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			this[prop] = props[prop];
		}
	}
    
    this.step(0);
};

CircularDrive.prototype.step = function step(t) {
    var currentAngle = MathUtils.degToRad((this.startingAngle + (this.rpm * 0.006 * t) % 360));
	var x = this.radius * Math.cos(currentAngle) + this.position.x;
	var y = this.radius * Math.sin(currentAngle) + this.position.y;

	this.mountPoint = { x: x, y: y };
}

CircularDrive.prototype.render = function(context) {    
    octx.strokeStyle = "#F00";
    
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    
    context.beginPath();
    context.arc(this.mountPoint.x, this.mountPoint.y, 5, 0, 2 * Math.PI);
    context.fill();
};