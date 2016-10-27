function CrossArms(driveA, driveB, lengthA, lengthB) {
	this.driveA = driveA;
	this.driveB = driveB;
	this.lengthA = lengthA;
	this.lengthB = lengthB;
}

CrossArms.prototype.step = function(t) {
	var mountPointA = this.driveA.mountPoint;
	var mountPointB = this.driveB.mountPoint;

	var joint = getJointPosition(mountPointA, this.lengthA, mountPointB, this.lengthB, this.flip);
	this.extensionAEnd = getExtensionEndPoint(mountPointA, joint, this.lengthA * 0.4);
	this.extensionBEnd = getExtensionEndPoint(mountPointB, joint, this.lengthB * 0.4);

	this.mountPoint = getJointPosition(this.extensionAEnd, this.lengthA * 0.41, this.extensionBEnd, this.lengthB * 0.41, !this.flip);
};

function getJointPosition(mountPointA, lengthA, mountPointB, lengthB, flip) {
	var d = MathUtils.distance(mountPointA, mountPointB);
	if (d < MathUtils.EPSILON) {
		throw new Error("Mount points are placed too close to each other.");
	}

	if (d < Math.abs(lengthA - lengthB)) {
		throw new Error("Arms are too short.");
	}

	var possibleMountPoints = MathUtils.circleCircleIntersection(mountPointA, lengthA, mountPointB, lengthB);
	return flip ? possibleMountPoints[1] : possibleMountPoints[0];
}

function getExtensionEndPoint(startPoint, middlePoint, extensionLength) {
	var direction = MathUtils.normalizeVector(MathUtils.subtractVectors(middlePoint, startPoint));
	var armLength = MathUtils.multiplyVector(direction, extensionLength);

	return MathUtils.addVectors(middlePoint, armLength);
}

CrossArms.prototype.render = function(context) {
	// mount point
	context.beginPath();
	context.arc(this.mountPoint.x, this.mountPoint.y, 3, 0, 2 * Math.PI);
	context.fill();

	// arms
	context.strokeStyle = "rgba(0, 128, 255, 0.4)";
	context.lineWidth = 5;
	context.beginPath();
	context.moveTo(this.driveA.mountPoint.x, this.driveA.mountPoint.y);
	context.lineTo(this.extensionAEnd.x, this.extensionAEnd.y);
	context.lineTo(this.mountPoint.x, this.mountPoint.y);
	context.stroke();

	context.beginPath();
	context.moveTo(this.driveB.mountPoint.x, this.driveB.mountPoint.y);
	context.lineTo(this.extensionBEnd.x, this.extensionBEnd.y);
	context.lineTo(this.mountPoint.x, this.mountPoint.y);
	context.stroke();
};