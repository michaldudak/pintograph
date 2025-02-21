import { SceneObject } from "./SceneObject.js";
import { MountPoint } from "./MountPoint.js";
import { drawMountPoint } from "./rendering/drawMountPoint.js";
import { Vector2, distance, subtractVectors, multiplyVector, normalizeVector, addVectors, getAngle, transform, identity, Matrix3, fromRotation, fromTranslation, multiply, EPSILON, circleCircleIntersection } from "../math/index.js";

export interface XArmParameters {
	mountedAt1 : MountPoint;
	mountedAt2 : MountPoint;
	length1 : number;
	length2 : number;
	extensionLength1 : number;
	extensionLength2 : number;
	flip : boolean;
}

export class XArm implements SceneObject {

	public mountPoint1 : MountPoint = { transformation: identity() };
	public mountPoint2 : MountPoint = { transformation: identity() };

	public mountedAt1 : MountPoint;
	public mountedAt2 : MountPoint;
	public length1 : number;
	public length2 : number;
	public extensionLength1 : number;
	public extensionLength2 : number;
	public flip : boolean;

	private mountedAt1WS : Vector2 = { x: 0, y: 0 };
	private mountedAt2WS : Vector2 = { x: 0, y: 0 };

	private mountPoint1Translation : Matrix3 = identity();
	private mountPoint2Translation : Matrix3 = identity();
	private mountPoint1Rotation : Matrix3 = identity();
	private mountPoint2Rotation : Matrix3 = identity();

	constructor(parameters : XArmParameters) {
		this.mountedAt1 = parameters.mountedAt1;
		this.mountedAt2 = parameters.mountedAt2;
		this.length1 = parameters.length1;
		this.length2 = parameters.length2;
		this.extensionLength1 = parameters.extensionLength1;
		this.extensionLength2 = parameters.extensionLength2;
		this.flip = parameters.flip;
	}

	step(elapsedTime: number, deltaTime: number) {
		transform(this.mountedAt1WS, { x: 0, y: 0 }, this.mountedAt1.transformation);
		transform(this.mountedAt2WS, { x: 0, y: 0 }, this.mountedAt2.transformation);

		let d = distance(this.mountedAt1WS, this.mountedAt2WS);
		if (d < EPSILON) {
			throw new Error("Mount points are placed too close to each other.");
		}

		if (d > this.length1 + this.length2) {
			throw new Error("Arms are too short.");
		}

		let possibleIntersectionPoints = circleCircleIntersection(this.mountedAt1WS, this.length1, this.mountedAt2WS, this.length2);
		let intersectionPointPosition = this.flip ? possibleIntersectionPoints[1] : possibleIntersectionPoints[0];

		let base1ToIntersection = subtractVectors(intersectionPointPosition, this.mountedAt1WS);
		let base2ToIntersection = subtractVectors(intersectionPointPosition, this.mountedAt2WS);

		let arm1 = multiplyVector(normalizeVector(base1ToIntersection), this.length1 + this.extensionLength1);
		let arm2 = multiplyVector(normalizeVector(base2ToIntersection), this.length2 + this.extensionLength2);

		let mountPoint1Position = addVectors(this.mountedAt1WS, arm1);
		let mountPoint2Position = addVectors(this.mountedAt2WS, arm2);

		let mountPoint1RotationVector = subtractVectors(mountPoint1Position, this.mountedAt1WS);
		let mountPoint2RotationVector = subtractVectors(mountPoint2Position, this.mountedAt2WS);

		let mountPoint1Rotation = getAngle(mountPoint1RotationVector);
		let mountPoint2Rotation = getAngle(mountPoint2RotationVector);

		fromRotation(this.mountPoint1Rotation, mountPoint1Rotation);
		fromRotation(this.mountPoint2Rotation, mountPoint2Rotation);

		fromTranslation(this.mountPoint1Translation, mountPoint1Position.x, mountPoint1Position.y);
		fromTranslation(this.mountPoint2Translation, mountPoint2Position.x, mountPoint2Position.y);

		multiply(this.mountPoint1.transformation, this.mountPoint1Translation, this.mountPoint1Rotation);
		multiply(this.mountPoint2.transformation, this.mountPoint2Translation, this.mountPoint2Rotation);
	}

	drawDebug(context: CanvasRenderingContext2D) {
		let mountPoint1WS = {x: 0, y: 0};
		let mountPoint2WS = {x: 0, y: 0};
		transform(mountPoint1WS, {x: 0, y: 0}, this.mountPoint1.transformation);
		transform(mountPoint2WS, {x: 0, y: 0}, this.mountPoint2.transformation);

		context.beginPath();
		context.moveTo(this.mountedAt1WS.x, this.mountedAt1WS.y);
		context.lineTo(mountPoint1WS.x, mountPoint1WS.y);
		context.moveTo(this.mountedAt2WS.x, this.mountedAt2WS.y);
		context.lineTo(mountPoint2WS.x, mountPoint2WS.y);
		context.lineWidth = 3;
		context.strokeStyle = 'pink';
		context.stroke();

		context.lineWidth = 1;
		drawMountPoint(context, this.mountPoint1.transformation);
		drawMountPoint(context, this.mountPoint2.transformation);
	}
}
