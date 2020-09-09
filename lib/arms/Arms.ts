import { Vector2 } from "../Vectors";

export interface Arms {
	step : (t : number) => void;
	render : (context : CanvasRenderingContext2D) => void;
	mountPoint : Vector2;
	flip : boolean;
}
