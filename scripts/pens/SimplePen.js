function SimplePen(arms, color) {
	this.arms = arms;
	this.color = color;

	this.previousMountPoint = null;
	this.mountPoint = null;
	this.lineStyle = color;
}

SimplePen.prototype.step = function(t) {
	this.previousMountPoint = this.mountPoint;
	this.mountPoint = this.arms.mountPoint;
};

SimplePen.prototype.draw = function(context) {
	if (this.previousMountPoint === null || this.mountPoint === null) {
		return;
	}

	context.strokeStyle = this.color;
	context.beginPath();
	context.moveTo(this.previousMountPoint.x, this.previousMountPoint.y);
	context.lineTo(this.mountPoint.x, this.mountPoint.y);
	context.stroke();
};

SimplePen.prototype.render = function(context) {
};