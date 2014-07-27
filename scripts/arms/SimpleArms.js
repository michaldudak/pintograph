function SimpleArms(driveA, driveB, lengthA, lengthB) {
    this.driveA = driveA;
    this.driveB = driveB;
    this.lengthA = lengthA;
    this.lengthB = lengthB;
}

SimpleArms.prototype.step = function(t) {
    var mountPointA = this.driveA.mountPoint;
	var mountPointB = this.driveB.mountPoint;

	var d = MathUtils.distance(mountPointA, mountPointB);
	if (d < MathUtils.EPSILON) {
		throw new Error("Mount points are placed too close to each other.");
	}

	if (d < Math.abs(this.lengthA - this.lengthB)) {
		throw new Error("Arms are too short.");
	}

    var possibleMountPoints = MathUtils.circleCircleIntersection(mountPointA, this.lengthA, mountPointB, this.lengthB);
	this.mountPoint = this.flip ? possibleMountPoints[1] : possibleMountPoints[0];
};

SimpleArms.prototype.render = function(context) {
    // mount point
    context.beginPath();
    context.arc(this.mountPoint.x, this.mountPoint.y, 3, 0, 2 * Math.PI);
    context.fill();

    // arms
    context.strokeStyle = "rgba(0, 128, 255, 0.4)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.driveA.mountPoint.x, this.driveA.mountPoint.y);
    context.lineTo(this.mountPoint.x, this.mountPoint.y);
    context.lineTo(this.driveB.mountPoint.x, this.driveB.mountPoint.y);
    context.stroke();
};