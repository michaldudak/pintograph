// TODO: Extract rendering logic to a Renderer object

import { Vector2 } from './Vectors';
import { Drive } from './drives/Drive';
import { Pen } from './pens/Pen';
import { Arms } from './arms/Arms';

interface DrawBufferElement extends Vector2 {
	style : string;
}

export class Simulation {

	public timeStep : number = 10;
	public stepsPerFrame : number = 10;
	public renderTools : boolean = false;
	public fadeColor : string = "rgba(0,0,0,0.1)";
	public fadeInterval : number = 6;
	private currentTime : number = 0;
	private drawBuffer : DrawBufferElement[] = [];
	private isRunning : boolean = false;

	constructor(public driveA : Drive, public driveB : Drive, public arms : Arms, public pen : Pen) {}

	private stepTime() {
		this.currentTime += (+this.timeStep);
		return this.currentTime;
	};

	step() {
		try {
			var t = this.stepTime();

			this.driveA.step(t);
			this.driveB.step(t);
			this.arms.step(t);
			this.pen.step(t);

			if (!this.pen.mountPoint) {
				return;
			}

			this.drawBuffer.push({ x: this.pen.mountPoint.x, y: this.pen.mountPoint.y, style: this.pen.lineStyle });
		} catch (err) {
			console.warn(err);
			throw err;
		}
	}

	draw(context : CanvasRenderingContext2D) {
		if (this.drawBuffer.length <= 1) {
			return;
		}

		context.beginPath();

		context.lineTo(this.drawBuffer[0].x, this.drawBuffer[0].y);
		for (var i = 1; i < this.drawBuffer.length; i++) {
			var nextPoint = this.drawBuffer[i];
			context.strokeStyle = nextPoint.style;
			context.lineTo(nextPoint.x, nextPoint.y);
		}

		context.stroke();

		var lastPoint = this.drawBuffer[this.drawBuffer.length - 1];
		this.drawBuffer = [ lastPoint ];
	}

	drawTools(context : CanvasRenderingContext2D) {
		var width = context.canvas.width;
		var height = context.canvas.height;

		context.clearRect(0, 0, width, height);

		this.driveA.render(context);
		this.driveB.render(context);
		this.arms.render(context);
		this.pen.render(context);
	}

	runSingleStep(drawingContext : CanvasRenderingContext2D, toolsDrawingContext : CanvasRenderingContext2D) {
		this.step();
		this.draw(drawingContext);
		if (this.renderTools) {
			this.drawTools(toolsDrawingContext);
		}
	}

	runOnce(drawingContext : CanvasRenderingContext2D, toolsDrawingContext : CanvasRenderingContext2D) {
		for (var i = 0; i < this.stepsPerFrame; i++) {
			this.step();
		}

		this.draw(drawingContext);
		if (this.renderTools) {
			this.drawTools(toolsDrawingContext);
		}
	};

	run(drawingContext : CanvasRenderingContext2D, toolsDrawingContext : CanvasRenderingContext2D) {
		this.isRunning = true;
		var frameCounter = 0;

		let runStep = () => {
			if (this.fadeInterval) {
				if (frameCounter++ >= this.fadeInterval) {
					frameCounter = 0;
					drawingContext.fillStyle = this.fadeColor;
					drawingContext.fillRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
				}
			} else {
				frameCounter = 0;
			}

			this.runOnce(drawingContext, toolsDrawingContext);

			if (this.isRunning) {
				requestAnimationFrame(runStep);
			}
		}

		runStep();
	};

	pause() {
		this.isRunning = false;
	};
}
