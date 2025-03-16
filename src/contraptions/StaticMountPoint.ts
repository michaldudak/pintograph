import {
	Vector2,
	Matrix3,
	fromTranslation,
	identity,
	multiply,
} from '../math/index.js';
import { MountPoint } from './MountPoint.js';
import { SceneObject } from './SceneObject.js';

const GET_EMPTY_ARRAY = () => [] as MountPoint[];

export class StaticMountPoint implements SceneObject, MountPoint {
	public readonly transformation: Matrix3;
	public readonly owner = this;
	public getParentMountPoints = GET_EMPTY_ARRAY;

	private localTransformation: Matrix3;
	private sceneTransformation: Matrix3;

	constructor(position: Vector2, sceneTransformation?: Matrix3) {
		this.transformation = identity();
		this.localTransformation = identity();
		this.sceneTransformation = sceneTransformation ?? identity();

		fromTranslation(this.localTransformation, position.x, position.y);
	}
	step() {
		multiply(
			this.transformation,
			this.localTransformation,
			this.sceneTransformation
		);
	}
}
