import { Vector2, Matrix3, fromTranslation } from '../math/index.js';
import { MountPoint } from './MountPoint.js';
import { SceneObject } from './SceneObject.js';

const GET_EMPTY_ARRAY = () => [] as MountPoint[];

export class StaticMountPoint implements SceneObject, MountPoint {
	public transformation: Matrix3;
	public readonly owner = this;
	public getParentMountPoints = GET_EMPTY_ARRAY;

	#x: number;
	#y: number;

	public get x() {
		return this.#x;
	}

	public set x(value: number) {
		this.#x = value;
		fromTranslation(this.transformation, value, this.#y);
	}

	public get y() {
		return this.#x;
	}

	public set y(value: number) {
		this.#y = value;
		fromTranslation(this.transformation, this.#x, value);
	}

	constructor(position: Vector2) {
		this.#x = position.x;
		this.#y = position.y;
		this.transformation = fromTranslation(position.x, position.y);
	}

	step() {}
}
