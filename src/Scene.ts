import { Pen, SceneObject } from './contraptions/index.js';

export class Scene {
	private pens: Set<Pen> = new Set();

	public stepsPerFrame = 10;
	public frameTime = 1 / 60;

	private _isRunning = false;
	private simulationTime = 0;
	private previousStepTimestamp = 0;

	run() {
		if (this._isRunning) {
			return;
		}

		this._isRunning = true;
		this.processFrame();
	}

	step(stepTime?: number) {
		if (this._isRunning) {
			return;
		}

		if (!stepTime) {
			stepTime = this.frameTime / this.stepsPerFrame;
		}

		this.updateObjects(this.simulationTime);
		this.simulationTime += stepTime;
		this.draw();
	}

	stop() {
		this._isRunning = false;
	}

	reset() {
		this.simulationTime = 0;
		this.previousStepTimestamp = 0;
		for (let pen of this.pens) {
			pen.reset();
		}
	}

	registerPen(pen: Pen) {
		this.pens.add(pen);
	}

	unregisterPen(pen: Pen) {
		this.pens.delete(pen);
	}

	get isRunning(): boolean {
		return this._isRunning;
	}

	private processFrame() {
		if (this._isRunning) {
			setTimeout(this.processFrame.bind(this), this.frameTime * 1000);
		}

		for (let i = 0; i < this.stepsPerFrame; ++i) {
			this.updateObjects(this.simulationTime);
			this.simulationTime += this.frameTime / this.stepsPerFrame;
		}

		this.draw();
	}

	private updateObjects(elapsedTime: number) {
		let timeStep = elapsedTime - this.previousStepTimestamp;
		this.previousStepTimestamp = elapsedTime;

		const updatedObjects = new Set<SceneObject>();

		for (let pen of this.pens) {
			this.updateObjectsInternal(elapsedTime, timeStep, pen, updatedObjects);
		}
	}

	private updateObjectsInternal(
		elapsedTime: number,
		timeStep: number,
		objectToUpdate: SceneObject,
		updatedObjects: Set<SceneObject>
	) {
		if (updatedObjects.has(objectToUpdate)) {
			return;
		}

		let parents = objectToUpdate.getParents();
		for (let i = 0; i < parents.length; ++i) {
			this.updateObjectsInternal(
				elapsedTime,
				timeStep,
				parents[i],
				updatedObjects
			);
		}

		objectToUpdate.step(elapsedTime, timeStep);
		updatedObjects.add(objectToUpdate);
	}

	private draw() {
		for (let pen of this.pens) {
			pen.draw();
		}
	}
}
