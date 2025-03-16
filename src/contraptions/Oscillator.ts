import { MountPoint } from './MountPoint.js';
import { SceneObject } from './SceneObject.js';
import {
	Matrix3,
	identity,
	fromRotation,
	fromTranslation,
	multiply,
} from '../math/Matrices.js';
import { EasingFunction, easingFunctions } from './EasingFunction.js';

const EMPTY_ARRAY: MountPoint[] = [];

export class Oscillator implements SceneObject {
	public mountPoint: MountPoint = { transformation: identity(), owner: this };
	public easingFunction: EasingFunction;
	public getParentMountPoints = () =>
		this.mountedAt ? [this.mountedAt] : EMPTY_ARRAY;

	private currentPosition: number = 0;
	private localRotation: Matrix3 = identity();
	private localTranslation: Matrix3 = identity();
	private localTransformation: Matrix3 = identity();

	constructor(
		private mountedAt: MountPoint,
		public length: number,
		public angle: number,
		public speed: number,
		easingFunction?: EasingFunction
	) {
		if (!easingFunction) {
			this.easingFunction = easingFunctions.sine;
		} else {
			this.easingFunction = easingFunction;
		}
	}

	step(elapsedTime: number) {
		this.currentPosition =
			this.easingFunction(elapsedTime * this.speed) * this.length -
			this.length * 0.5;
		fromRotation(this.localRotation, this.angle);
		fromTranslation(this.localTranslation, this.currentPosition, 0);
		multiply(
			this.localTransformation,
			this.localRotation,
			this.localTranslation
		);
		multiply(
			this.mountPoint.transformation,
			this.mountedAt.transformation,
			this.localTransformation
		);
	}
}
