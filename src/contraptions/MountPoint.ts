import { SceneObject } from './SceneObject.js';
import { Matrix3 } from '../math/index.js';

export interface MountPoint {
	readonly transformation: Matrix3;

	readonly owner: SceneObject;
}
