import { MountPoint } from './MountPoint';
import { transform } from '../math/Matrices';
import { SceneObject } from './SceneObject';
import { Vector2 } from '../math/Vectors';

interface DrawBufferItem extends Vector2 {
	color : string;
}

export class Pen implements SceneObject {

	public color : ((elapsedTime : number) => string);
	private worldPosition: Vector2 = { x: 0, y: 0 };
	private drawBuffer: DrawBufferItem[] = [];

	constructor(private mountedAt: MountPoint, color : string | ((elapsedTime : number) => string)) {
		if (typeof color === 'string') {
			this.color = () => color;
		} else {
			this.color = color;
		}
	}

	step(elapsedTime: number, deltaTime: number) {
		transform(this.worldPosition, { x: 0, y: 0 }, this.mountedAt.transformation);
		this.drawBuffer.push({ ...this.worldPosition, color: this.color(elapsedTime) });
	};

	drawDebug(context: CanvasRenderingContext2D) { };

	draw(context: CanvasRenderingContext2D) {
		if (this.drawBuffer.length > 1) {
			context.beginPath();
			context.moveTo(this.drawBuffer[0].x, this.drawBuffer[0].y);

			for (let i = 1; i < this.drawBuffer.length; ++i) {
				context.lineTo(this.drawBuffer[i].x, this.drawBuffer[i].y);
			}

			context.strokeStyle = this.drawBuffer[0].color;
			context.stroke();

			this.drawBuffer = [ this.drawBuffer[this.drawBuffer.length - 1] ];
		}
	}
}
