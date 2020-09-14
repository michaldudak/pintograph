export interface SceneObject {
	step: (elapsedTime: number, deltaTime: number) => void;
	drawDebug: (context: CanvasRenderingContext2D) => void;
}
