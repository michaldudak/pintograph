var DoubleCircularDrive = function(props) {
	for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			this[prop] = props[prop];
		}
	}
    
    this.step(0);
};

DoubleCircularDrive.prototype.step = function(t) {
    var currentAngle = MathUtils.degToRad((this.startingAngle + (this.rpm * 0.006 * t) % 360));
	var x = this.radius * Math.cos(currentAngle) + this.position.x;
	var y = this.radius * Math.sin(currentAngle) + this.position.y;
    
    this.innerDrive.position.x = x;
    this.innerDrive.position.y = y;
    
    this.innerDrive.step(t);

	this.mountPoint = this.innerDrive.mountPoint;
};

DoubleCircularDrive.prototype.render = function(context) {
    context.strokeStyle = "rgba(255,0,0,0.25)";
    context.fillStyle = "rgba(0,0,0,0.5)";
    
    // inner drive's path
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    
    // inner drive's mount point
    context.beginPath();
    context.arc(this.innerDrive.position.x, this.innerDrive.position.y, 5, 0, 2 * Math.PI);
    context.fill();
    
    // outer bounds
    context.strokeStyle = "rgba(255,0,0,0.5)";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius + this.innerDrive.radius, 0, 2 * Math.PI);
    context.stroke();
        
    this.innerDrive.render(context);
};