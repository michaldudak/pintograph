export interface Vector2 {
	x: number;
	y: number;
}

export function distance(pointA: Vector2, pointB: Vector2) {
	let xd = pointB.x - pointA.x;
	let yd = pointB.y - pointA.y;
	return Math.sqrt(xd ** 2 + yd ** 2);
}

export function normalizeVector(vector: Vector2) {
	let length = distance({ x: 0, y: 0 }, vector);
	if (length == 0) {
		return { x: 0, y: 0 } as Vector2;
	}

	return {
		x: vector.x / length,
		y: vector.y / length,
	} as Vector2;
}

export function multiplyVector(vector: Vector2, factor: number) {
	return {
		x: vector.x * factor,
		y: vector.y * factor,
	} as Vector2;
}

export function addVectors(a: Vector2, b: Vector2) {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
	} as Vector2;
}

export function subtractVectors(a: Vector2, b: Vector2) {
	return addVectors(a, { x: -b.x, y: -b.y });
}

export function getAngle(vector: Vector2): number {
	return Math.atan2(vector.y, vector.x);
}
