import { Vector2 } from "../math/Vectors";
import { Matrix3, fromTranslation, identity, multiply } from "../math/Matrices";
import { MountPoint } from "./MountPoint";
import { SceneObject } from "./SceneObject";
import { drawMountPoint } from "./rendering/drawMountPoint";

export class StaticMountPoint implements SceneObject, MountPoint {

	public readonly transformation : Matrix3;
	private localTransformation : Matrix3;
	private sceneTransformation : Matrix3;

	constructor(position: Vector2, sceneTransformation ?: Matrix3) {
		this.transformation = identity();
		this.localTransformation = identity();
		this.sceneTransformation = sceneTransformation ?? identity();

		fromTranslation(this.localTransformation, position.x, position.y);
	}

	step(elapsedTime: number, deltaTime: number) {
		multiply(this.transformation, this.localTransformation, this.sceneTransformation);
	}

	drawDebug(context: CanvasRenderingContext2D) {
		drawMountPoint(context, this.transformation);
	}
}
