import { MountPoint } from "./MountPoint";
import { SceneObject } from "./SceneObject";
import { Matrix3, identity, fromRotation, fromTranslation, multiply, transform } from '../math/Matrices';
import { drawMountPoint } from "./rendering/drawMountPoint";
import { EasingFunction, easingFunctions } from "./EasingFunction";

export class Oscillator implements SceneObject {

	public mountPoint : MountPoint = { transformation: identity() }
	public easingFunction : EasingFunction;

	private currentPosition : number = 0;
	private localRotation : Matrix3 = identity();
	private localTranslation : Matrix3 = identity();
	private localTransformation : Matrix3 = identity();

	constructor(private mountedAt : MountPoint, public length : number, public angle : number, public speed : number, easingFunction ?: EasingFunction) {
		if (!easingFunction) {
			this.easingFunction = easingFunctions.sine;
		} else {
			this.easingFunction = easingFunction;
		}
	}

	step(elapsedTime: number, deltaTime: number) {
		this.currentPosition = this.easingFunction(elapsedTime * this.speed) * this.length - this.length * 0.5;
		fromRotation(this.localRotation, this.angle);
		fromTranslation(this.localTranslation, this.currentPosition, 0);
		multiply(this.localTransformation, this.localRotation, this.localTranslation);
		multiply(this.mountPoint.transformation, this.mountedAt.transformation, this.localTransformation);
	}

	drawDebug(context: CanvasRenderingContext2D) {
		let end1 = { x: (-this.length / 2) - this.currentPosition, y: 0 };
		let end2 = { x: (this.length / 2) - this.currentPosition, y: 0 };



		transform(end1, end1, this.mountPoint.transformation);
		transform(end2, end2, this.mountPoint.transformation);

		context.beginPath();

		context.moveTo(end1.x, end1.y);
		context.lineTo(end2.x, end2.y);
		context.strokeStyle = '#555555';
		context.stroke();

		drawMountPoint(context, this.mountPoint.transformation);
	}

}
