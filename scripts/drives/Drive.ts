import { Vector2 } from "../Vectors";

export interface Drive {
	step : (t : number) => void;
	render : (context : CanvasRenderingContext2D) => void;
	mountPoint : Vector2;
	position : Vector2;
	currentAngle : number;
	radius : number;
}
