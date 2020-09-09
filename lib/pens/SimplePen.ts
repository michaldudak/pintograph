import { Pen } from "./Pen";
import { Arms } from "../arms/Arms";
import { Vector2 } from "../Vectors";

export class SimplePen implements Pen {

	public mountPoint : Vector2 | null = null;
	public lineStyle : string;
	private previousMountPoint : Vector2 | null = null;

	constructor(private arms : Arms, color : string) {
		this.lineStyle = color;
	}

	step(t : number) {
		this.previousMountPoint = this.mountPoint;
		this.mountPoint = this.arms.mountPoint;
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
