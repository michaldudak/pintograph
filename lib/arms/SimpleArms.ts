import { Arms } from "./Arms";
import { Drive } from "../drives/Drive";
import { circleCircleIntersection, distance, EPSILON } from "../MathUtils";
import { Vector2 } from "../Vectors";

export class SimpleArms implements Arms {

	public mountPoint : Vector2  = { x: 0, y: 0 };;
	public flip : boolean = false;

	constructor(private driveA : Drive, private driveB : Drive, private lengthA : number, private lengthB : number) { }

	step(t : number) {
		var mountPointA = this.driveA.mountPoint;
		var mountPointB = this.driveB.mountPoint;

		var d = distance(mountPointA, mountPointB);
		if (d < EPSILON) {
			throw new Error("Mount points are placed too close to each other.");
		}

		if (d < Math.abs(this.lengthA - this.lengthB)) {
			throw new Error("Arms are too short.");
		}

		var possibleMountPoints = circleCircleIntersection(mountPointA, this.lengthA, mountPointB, this.lengthB);
		this.mountPoint = this.flip ? possibleMountPoints[1] : possibleMountPoints[0];
	};

	render(context : CanvasRenderingContext2D) {
		// mount point
		context.beginPath();
		context.arc(this.mountPoint.x, this.mountPoint.y, 3, 0, 2 * Math.PI);
		context.fill();

		// arms
		context.strokeStyle = "rgba(0, 128, 255, 0.4)";
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(this.driveA.mountPoint.x, this.driveA.mountPoint.y);
		context.lineTo(this.mountPoint.x, this.mountPoint.y);
		context.lineTo(this.driveB.mountPoint.x, this.driveB.mountPoint.y);
		context.stroke();
	}
}
