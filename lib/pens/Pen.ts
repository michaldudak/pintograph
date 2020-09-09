import { Vector2 } from "../Vectors";

export interface Pen {
	step : (t : number) => void;
	draw : (context : CanvasRenderingContext2D) => void;
	render : (context : CanvasRenderingContext2D) => void;
	mountPoint : Vector2 | null;
	lineStyle : string;
}
