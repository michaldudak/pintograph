import { Arms } from './Arms';
import { Drive } from '../drives/Drive';
import { distance, EPSILON, circleCircleIntersection, normalizeVector, subtractVectors, multiplyVector, addVectors } from '../MathUtils';
import { Vector2 } from '../Vectors';

function getJointPosition(mountPointA : Vector2, lengthA : number, mountPointB : Vector2, lengthB : number, flip : boolean) {
	var d = distance(mountPointA, mountPointB);
	if (d < EPSILON) {
		throw new Error("Mount points are placed too close to each other.");
	}

	if (d < Math.abs(lengthA - lengthB)) {
		throw new Error("Arms are too short.");
	}

	var possibleMountPoints = circleCircleIntersection(mountPointA, lengthA, mountPointB, lengthB);
	return flip ? possibleMountPoints[1] : possibleMountPoints[0];
}

function getExtensionEndPoint(startPoint : Vector2, middlePoint : Vector2, extensionLength : number) {
	var direction = normalizeVector(subtractVectors(middlePoint, startPoint));
	var armLength = multiplyVector(direction, extensionLength);

	return addVectors(middlePoint, armLength);
}

export class CrossArms implements Arms {

	public mountPoint : Vector2 = { x: 0, y: 0 };
	public flip : boolean = false;
	private extensionAEnd : Vector2  = { x: 0, y: 0 };;
	private extensionBEnd : Vector2  = { x: 0, y: 0 };;

	constructor(private driveA : Drive, private driveB : Drive, private lengthA : number, private lengthB : number) {}

	step(t : number) {
		var mountPointA = this.driveA.mountPoint;
		var mountPointB = this.driveB.mountPoint;

		var joint = getJointPosition(mountPointA, this.lengthA, mountPointB, this.lengthB, this.flip);
		this.extensionAEnd = getExtensionEndPoint(mountPointA, joint, this.lengthA * 0.4);
		this.extensionBEnd = getExtensionEndPoint(mountPointB, joint, this.lengthB * 0.4);

		this.mountPoint = getJointPosition(this.extensionAEnd, this.lengthA * 0.41, this.extensionBEnd, this.lengthB * 0.41, !this.flip);
	};

	render(context : CanvasRenderingContext2D) {
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
	}
}
