var FixedDrive = function(props) {
	this.position = { x: 0, y: 0 }
    
    for (var prop in props) {
		if (props.hasOwnProperty(prop)) {
			this[prop] = props[prop];
		}
	}
    
    this.step(0);
};

FixedDrive.prototype.step = function step(t) {
	this.mountPoint = { x: this.position.x, y: this.position.y };
}

FixedDrive.prototype.render = function(context) {    
    context.beginPath();
    context.arc(this.mountPoint.x, this.mountPoint.y, 5, 0, 2 * Math.PI);
    context.fill();
};