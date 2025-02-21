import { Pen, SceneObject } from './contraptions/index.js';

export class Scene {
	public objects: SceneObject[] = [];
	public pens: Pen[] = [];

	public stepsPerFrame = 10;
	public frameTime = 1 / 60;

	private _isRunning = false;
	private simulationTime = 0;
	private previousStepTimestamp = 0;

	constructor(
		private renderContext: CanvasRenderingContext2D,
		private contraptionRenderContext?: CanvasRenderingContext2D
	) {}

	run() {
		if (this._isRunning) {
			return;
		}

		this._isRunning = true;
		this.processFrame();
	}

	stop() {
		this._isRunning = false;
	}

	reset() {
		this.stop();
		this.simulationTime = 0;
		this.previousStepTimestamp = 0;
	}

	get isRunning(): boolean {
		return this._isRunning;
	}

	private processFrame() {
		if (this._isRunning) {
			setTimeout(this.processFrame.bind(this), this.frameTime * 1000);
		}

		for (let i = 0; i < this.stepsPerFrame; ++i) {
			this.step(this.simulationTime);
			this.simulationTime += this.frameTime / this.stepsPerFrame;
		}

		this.draw(this.renderContext);
		this.contraptionRenderContext && this.drawDebug(this.contraptionRenderContext);
	}

	step(elapsedTime: number) {
		let timeStep = elapsedTime - this.previousStepTimestamp;
		this.previousStepTimestamp = elapsedTime;

		for (let i = 0; i < this.objects.length; ++i) {
			this.objects[i].step(elapsedTime, timeStep);
		}

		for (let i = 0; i < this.pens.length; ++i) {
			this.pens[i].step(elapsedTime, timeStep);
		}
	}

	private draw(context: CanvasRenderingContext2D) {
		for (let i = 0; i < this.pens.length; ++i) {
			this.pens[i].draw(context);
		}
	}

	private drawDebug(context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		for (let i = 0; i < this.objects.length; ++i) {
			this.objects[i].drawDebug(context);
		}
	}
}
