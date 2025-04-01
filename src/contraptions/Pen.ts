import { SceneObject } from './index.js';

export interface Pen extends SceneObject {
	reset(): void;
	draw(): void;
}
