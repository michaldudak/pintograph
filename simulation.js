function getMidpoint(driveA, driveB, t) {
    driveA.step(t);
    driveB.step(t);
    
	var mountPointA = driveA.mountPoint;
	var mountPointB = driveB.mountPoint;

	var d = MathUtils.distance(mountPointA, mountPointB);
	if (d < MathUtils.EPSILON) {
		throw new Error("Mount points are placed too close to each other.");
	}

	if (d < Math.abs(driveA.armLength - driveB.armLength)) {
		throw new Error("Arms are too short.");
	}

	return MathUtils.circleCircleIntersection(mountPointA, driveA.armLength, mountPointB, driveB.armLength);
}