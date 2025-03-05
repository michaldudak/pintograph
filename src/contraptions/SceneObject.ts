import { MountPoint } from './MountPoint.js';

export interface SceneObject {
	step: (elapsedTime: number, deltaTime: number) => void;
	getParentMountPoints: () => MountPoint[];
}
