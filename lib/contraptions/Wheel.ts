import { MountPoint } from "./MountPoint";
import { SceneObject } from "./SceneObject";
import { drawMountPoint } from "./rendering/drawMountPoint";
import { Matrix3, identity, fromRotation, fromTranslation, multiply, transform } from "../math/Matrices";

export class Wheel implements SceneObject {

	private localTransformation: Matrix3;
	public readonly mountPoint: MountPoint;

	private currentAngle: number;

	private rotationMatrix: Matrix3;
	private translationMatrix: Matrix3;

	constructor(private mountedAt: MountPoint, public radius: number, public startAngle: number, public speed: number) {
		this.currentAngle = startAngle;
		this.rotationMatrix = identity();
		this.translationMatrix = identity();
		this.localTransformation = identity();
		this.mountPoint = { transformation: identity() };
	}

	step(elapsedTime: number, deltaTime: number) {
		this.currentAngle = (this.startAngle + 2 * Math.PI * this.speed * elapsedTime) % (2 * Math.PI);
		fromRotation(this.rotationMatrix, this.currentAngle);
		fromTranslation(this.translationMatrix, this.radius, 0);
		multiply(this.localTransformation, this.rotationMatrix, this.translationMatrix);
		multiply(this.mountPoint.transformation, this.mountedAt.transformation, this.localTransformation);
	}

	drawDebug(context: CanvasRenderingContext2D) {
		let center = { x: 0, y: 0 };
		transform(center, center, this.mountedAt.transformation);

		context.beginPath();

		context.arc(center.x, center.y, this.radius, 0, Math.PI * 2);
		context.strokeStyle = '#888888';
		context.stroke();

		drawMountPoint(context, this.mountPoint.transformation);
	}
}
