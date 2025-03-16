import {
	Vector2,
	Matrix3,
	fromTranslation,
	identity,
	multiply,
	transform,
	distance,
	EPSILON,
	circleCircleIntersection,
	fromRotation,
	getAngle,
	subtractVectors,
} from '../math/index.js';
import { MountPoint } from './MountPoint.js';
import { SceneObject } from './SceneObject.js';

export interface VArmParameters {
	mountedAt1: MountPoint;
	mountedAt2: MountPoint;
	length1: number;
	length2: number;
	flip: boolean;
}

export class VArm implements SceneObject {
	public mountPoint: MountPoint = { transformation: identity(), owner: this };
	public getParentMountPoints = () =>
		[this.mountedAt1, this.mountedAt2].filter(Boolean);

	public mountedAt1: MountPoint;
	public mountedAt2: MountPoint;
	public length1: number;
	public length2: number;
	public flip: boolean;

	private mountedAt1WS: Vector2 = { x: 0, y: 0 };
	private mountedAt2WS: Vector2 = { x: 0, y: 0 };

	private mountPointTranslation: Matrix3 = identity();
	private mountPointRotation: Matrix3 = identity();

	constructor(parameters: VArmParameters) {
		this.mountedAt1 = parameters.mountedAt1;
		this.mountedAt2 = parameters.mountedAt2;
		this.length1 = parameters.length1;
		this.length2 = parameters.length2;
		this.flip = parameters.flip;
	}

	step() {
		transform(
			this.mountedAt1WS,
			{ x: 0, y: 0 },
			this.mountedAt1.transformation
		);
		transform(
			this.mountedAt2WS,
			{ x: 0, y: 0 },
			this.mountedAt2.transformation
		);

		let d = distance(this.mountedAt1WS, this.mountedAt2WS);
		if (d < EPSILON) {
			throw new Error('Mount points are placed too close to each other.');
		}

		if (d > this.length1 + this.length2) {
			throw new Error('Arms are too short.');
		}

		let possibleMountPoints = circleCircleIntersection(
			this.mountedAt1WS,
			this.length1,
			this.mountedAt2WS,
			this.length2
		);
		let mountPointPosition = this.flip
			? possibleMountPoints[1]
			: possibleMountPoints[0];
		let mountPointRotationVector = subtractVectors(
			mountPointPosition,
			this.mountedAt1WS
		);
		let mountPointRotation = getAngle(mountPointRotationVector);

		fromRotation(this.mountPointRotation, mountPointRotation);
		fromTranslation(
			this.mountPointTranslation,
			mountPointPosition.x,
			mountPointPosition.y
		);

		multiply(
			this.mountPoint.transformation,
			this.mountPointTranslation,
			this.mountPointRotation
		);
	}
}
