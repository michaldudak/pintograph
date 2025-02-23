import { Vector2, Matrix3, transform } from '../../math/index.js';

export function drawMountPoint(
	context: CanvasRenderingContext2D,
	transformation: Matrix3
) {
	let mountPointDisplayCoords: Vector2[] = [
		{ x: 2, y: 6 },
		{ x: 2, y: 2 },
		{ x: 6, y: 2 },
		{ x: 6, y: -2 },
		{ x: 2, y: -2 },
		{ x: 2, y: -6 },
		{ x: -2, y: -6 },
		{ x: -2, y: -2 },
		{ x: -6, y: -2 },
		{ x: -6, y: 2 },
		{ x: -2, y: 2 },
		{ x: -2, y: 6 },
		{ x: 2, y: 6 },
	];

	context.beginPath();
	for (let i = 0; i < mountPointDisplayCoords.length; ++i) {
		transform(
			mountPointDisplayCoords[i],
			mountPointDisplayCoords[i],
			transformation
		);
		if (i === 0) {
			context.moveTo(
				mountPointDisplayCoords[i].x,
				mountPointDisplayCoords[i].y
			);
		} else {
			context.lineTo(
				mountPointDisplayCoords[i].x,
				mountPointDisplayCoords[i].y
			);
		}
	}

	context.stroke();
}
