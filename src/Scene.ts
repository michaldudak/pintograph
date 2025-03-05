import { Pen, SceneObject } from './contraptions/index.js';

export class Scene {
	private pens: Set<Pen> = new Set();

	public stepsPerFrame = 10;
	public frameTime = 1 / 60;
	public timeScale = 1;
	public continueOnError = false;

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

	paintImmediate(endTime: number, startTime: number = 0) {
		if (endTime <= startTime) {
			return;
		}

		this.stop();
		this.reset(startTime);

		const numberOfSteps = Math.ceil(
			((endTime - startTime) * this.stepsPerFrame) / this.frameTime
		);

		this._isRunning = true;

		for (let i = 0; i < numberOfSteps; ++i) {
			this.updateObjects(this.simulationTime);
			this.simulationTime += this.frameTime / this.stepsPerFrame;
		}

		this.draw();
		this.stop();
	}

	step(stepTime?: number) {
		if (this._isRunning) {
			return;
		}

		if (!stepTime) {
			stepTime = this.frameTime / this.stepsPerFrame;
		}

		this.updateObjects(this.simulationTime);
		this.simulationTime += stepTime * this.timeScale;
		this.draw();
	}

	stop() {
		this._isRunning = false;
	}

	reset(targetTime = 0) {
		this.simulationTime = targetTime;
		this.previousStepTimestamp = targetTime;
		for (let pen of this.pens) {
			pen.reset();
		}

		this.updateObjects(targetTime);
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
			this.simulationTime +=
				(this.timeScale * this.frameTime) / this.stepsPerFrame;
		}

		this.draw();
	}

	private updateObjects(elapsedTime: number) {
		let timeStep = elapsedTime - this.previousStepTimestamp;
		this.previousStepTimestamp = elapsedTime;

		const updatedObjects = new Set<SceneObject>();

		for (let pen of this.pens) {
			try {
				this.updateObjectsInternal(elapsedTime, timeStep, pen, updatedObjects);
			} catch (e) {
				if (this.continueOnError) {
					console.warn('The device is stuck.', e);
					pen.reset();
				} else {
					console.error('The device is stuck.', e);
					this.stop();
				}
			}
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

		let parents = objectToUpdate.getParentMountPoints();
		for (let i = 0; i < parents.length; ++i) {
			this.updateObjectsInternal(
				elapsedTime,
				timeStep,
				parents[i].owner,
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
