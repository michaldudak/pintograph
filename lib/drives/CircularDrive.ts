import { Drive } from "./Drive";
import { Vector2 } from "../Vectors";
import { degToRad } from "../MathUtils";

interface CircularDriveProps {
	position : Vector2;
	currentAngle : number;
	radius : number;
	rpm : number;
}

export class CircularDrive implements Drive {

	public position : Vector2 = { x: 0, y : 0 }
	public currentAngle : number;
	public mountPoint : Vector2 = { x: 0, y: 0 };
	public radius : number;
	private previousT : number = 0;
	private rpm : number;

	constructor(props : CircularDriveProps) {
		this.currentAngle = props.currentAngle;
		this.position = props.position;
		this.radius = props.radius;
		this.rpm = props.rpm;

		this.step(0);
	};

	step(t : number) {
		var deltaT = t - (this.previousT || 0);
		this.currentAngle = (this.currentAngle + this.rpm * 0.006 * deltaT) % 360;
		var currentAngleRad = degToRad(this.currentAngle);
		var x = this.radius * Math.cos(currentAngleRad) + this.position.x;
		var y = this.radius * Math.sin(currentAngleRad) + this.position.y;

		this.previousT = t;
		this.mountPoint = { x: x, y: y };
	}

	render(context : CanvasRenderingContext2D) {
		context.strokeStyle = "rgba(255,128,0,0.4)";
		context.fillStyle = "rgba(255,255,255,0.4)";
		context.lineWidth = 2;

		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.stroke();

		context.beginPath();
		context.arc(this.mountPoint.x, this.mountPoint.y, 5, 0, 2 * Math.PI);
		context.fill();
	};
}
