import { Pen, SceneObject } from './contraptions/index.js';
import {
	ErrorHandlingBehavior,
	OnErrorCallback,
	PintographError,
} from './errors.js';

/**
 * A Scene is the main class that orchestrates the simulation of the contraptions.
 * It holds references to all objects (directly to pens and transitively to all connected contraptions).
 */
export class Scene {
	/**
	 * The number of steps to simulate in a single frame.
	 * This is used to control the granularity of the simulation.
	 * The higher the number, the more accurate the simulation, but the slower it will be.
	 * @default 10
	 */
	stepsPerFrame = 10;

	/**
	 * The duration of a single frame in seconds.
	 * This is used to control the frequency of rendering.
	 * @default 1 / 60
	 */
	frameTime = 1 / 60;

	/**
	 * The global time scale of the simulation.
	 * This is used to control the speed of the simulation.
	 * @default 1
	 */
	timeScale = 1;

	/**
	 * The current simulation time in seconds.
	 */
	simulationTime = 0;

	/**
	 * Callback that is called when an error occurs.
	 * The callback should return an ErrorHandlingBehavior that specifies how to handle the error.
	 */
	onError: OnErrorCallback | undefined = undefined;

	/**
	 * Callback that is called when the simulation starts.
	 */
	onStart: (() => void) | undefined = undefined;

	/**
	 * Callback that is called when the simulation stops.
	 */
	onStop: (() => void) | undefined = undefined;

	/**
	 * Callback that is called when a frame is drawn.
	 */
	onFrameCompleted: ((elapsedTime: number) => void) | undefined = undefined;

	private pens: Set<Pen> = new Set();

	#isRunning = false;

	/**
	 * The timestamp of the previous step in seconds.
	 */
	#previousStepTimestamp = 0;

	/**
	 * Starts the simulation.
	 */
	run() {
		if (this.#isRunning) {
			return;
		}

		this.#isRunning = true;

		this.onStart?.();
		this.#processFrame();
	}

	/**
	 * Simulates the scene immediately for the given time range.
	 * Draws the scene after the simulation is complete.
	 *
	 * This may take a long time to complete if the time range is large.
	 *
	 * @param endTime The end time of the simulation in seconds.
	 * @param startTime The start time of the simulation in seconds. Defaults to 0.
	 */
	paintImmediate(endTime: number, startTime: number = 0) {
		if (endTime <= startTime) {
			return;
		}

		this.#isRunning = false;
		this.reset(startTime);

		const numberOfSteps = Math.ceil(
			((endTime - startTime) * this.stepsPerFrame) / this.frameTime
		);

		this.#isRunning = true;

		for (let i = 0; i < numberOfSteps; ++i) {
			this.#updateObjects(this.simulationTime);
			this.simulationTime += this.frameTime / this.stepsPerFrame;
		}

		this.#draw();
		this.#isRunning = false;
	}

	/**
	 * Advances the simulation by a single step and draws the result.
	 *
	 * @param stepTime The time to simulate in seconds. Defaults to `frameTime / stepsPerFrame`.
	 */
	step(stepTime?: number) {
		if (this.#isRunning) {
			return;
		}

		if (!stepTime) {
			stepTime = this.frameTime / this.stepsPerFrame;
		}

		this.simulationTime += stepTime * this.timeScale;
		this.#updateObjects(this.simulationTime);
		this.#draw();

		this.onFrameCompleted?.(this.simulationTime);
	}

	/**
	 * Stops the simulation.
	 * Does not reset the simulation time or the state of the contraptions.
	 */
	stop() {
		this.#isRunning = false;
		this.onStop?.();
	}

	/**
	 * Resets the simulation.
	 * Optionally, sets the simulation time to a specific value and updates the contraptions accordingly.
	 *
	 * @param targetTime The time to reset the simulation to in seconds. Defaults to 0.
	 */
	reset(targetTime = 0) {
		this.simulationTime = targetTime;
		this.#previousStepTimestamp = targetTime;
		for (let pen of this.pens) {
			pen.reset();
		}

		this.#updateObjects(targetTime);
	}

	/**
	 * Registers a pen with the scene.
	 */
	registerPen(pen: Pen) {
		this.pens.add(pen);
	}

	/**
	 * Removes a pen from the scene.
	 */
	unregisterPen(pen: Pen) {
		this.pens.delete(pen);
	}

	/**
	 * Returns whether the simulation is running.
	 */
	get isRunning(): boolean {
		return this.#isRunning;
	}

	#processFrame() {
		if (this.#isRunning) {
			setTimeout(this.#processFrame.bind(this), this.frameTime * 1000);
		}

		for (let i = 0; i < this.stepsPerFrame; ++i) {
			this.#updateObjects(this.simulationTime);
			this.simulationTime +=
				(this.timeScale * this.frameTime) / this.stepsPerFrame;
		}

		this.#draw();
		this.onFrameCompleted?.(this.simulationTime);
	}

	#updateObjects(elapsedTime: number) {
		let timeStep = elapsedTime - this.#previousStepTimestamp;
		this.#previousStepTimestamp = elapsedTime;

		const updatedObjects = new Set<SceneObject>();

		for (let pen of this.pens) {
			try {
				this.#updateObjectsInternal(elapsedTime, timeStep, pen, updatedObjects);
			} catch (e) {
				if (e instanceof PintographError && this.onError) {
					const behavior = this.onError(e.code, undefined);
					if (behavior === ErrorHandlingBehavior.Continue) {
						console.warn('The device is stuck.', e);
						pen.reset();
					}
				}

				console.error('The device is stuck.', e);
				this.stop();
			}
		}
	}

	#updateObjectsInternal(
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
			this.#updateObjectsInternal(
				elapsedTime,
				timeStep,
				parents[i].owner,
				updatedObjects
			);
		}

		objectToUpdate.step(elapsedTime, timeStep);
		updatedObjects.add(objectToUpdate);
	}

	#draw() {
		for (let pen of this.pens) {
			pen.draw();
		}
	}
}
