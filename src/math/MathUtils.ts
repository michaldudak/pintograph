import { Vector2, distance } from './Vectors.js';

export const EPSILON = 0.0001;
export const PI_INV = 1 / Math.PI;

export function circleCircleIntersection(
	p0: Vector2,
	r0: number,
	p1: Vector2,
	r1: number
) {
	// based on http://paulbourke.net/geometry/circlesphere/
	let d = distance(p0, p1);
	if (d > r0 + r1) {
		throw new Error('Circles are separate');
	} else if (d < Math.abs(r0 - r1)) {
		throw new Error('Circles are contained within each other');
	} else if (d === 0 && r0 === r1) {
		throw new Error('Circles are coincident');
	}

	let a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
	let h = Math.sqrt(r0 ** 2 - a ** 2);

	let p2: Vector2 = {
		x: p0.x + (a * (p1.x - p0.x)) / d,
		y: p0.y + (a * (p1.y - p0.y)) / d,
	};

	let p3_1: Vector2 = {
		x: p2.x + (h * (p1.y - p0.y)) / d,
		y: p2.y - (h * (p1.x - p0.x)) / d,
	};

	let p3_2: Vector2 = {
		x: p2.x - (h * (p1.y - p0.y)) / d,
		y: p2.y + (h * (p1.x - p0.x)) / d,
	};

	return [p3_1, p3_2];
}
