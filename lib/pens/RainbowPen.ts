import { Pen } from "./Pen";
import { Arms } from "../arms/Arms";
import { Vector2 } from "../Vectors";

export class RainbowPen implements Pen {

	public lineStyle : string;
	public mountPoint : Vector2 | null = null;
	private previousMountPoint : Vector2 | null = null;
	private hue : number = 120;

	constructor(private arms : Arms, private opacity : number, private hueChangePerSegment : number) {
		this.lineStyle = `hsla(${this.hue}, 50%, 50%, ${this.opacity})`;
	}

	step(t : number) {
		this.previousMountPoint = this.mountPoint;
		this.mountPoint = this.arms.mountPoint;

		this.hue = (this.hue + this.hueChangePerSegment) % 360;
		this.lineStyle = `hsla(${this.hue}, 50%, 50%, ${this.opacity})`;
	}

	draw(context : CanvasRenderingContext2D) {
		if (this.previousMountPoint === null || this.mountPoint === null) {
			return;
		}

		context.strokeStyle = this.lineStyle;
		context.beginPath();
		context.moveTo(this.previousMountPoint.x, this.previousMountPoint.y);
		context.lineTo(this.mountPoint.x, this.mountPoint.y);
		context.stroke();
	}

	render(context : CanvasRenderingContext2D) {}
}
