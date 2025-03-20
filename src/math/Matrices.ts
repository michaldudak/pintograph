import { Vector2 } from './Vectors.js';

export type Matrix3 = Float32Array;

export function identity(): Matrix3 {
	return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
}

export function fromTranslation(x: number, y: number): Matrix3;
export function fromTranslation(out: Matrix3, x: number, y: number): Matrix3;
export function fromTranslation(
	outOrX: Matrix3 | number,
	xOrY: number,
	maybeY?: number
) {
	const out = typeof outOrX === 'number' ? identity() : outOrX;
	const x = typeof outOrX === 'number' ? outOrX : xOrY;
	const y = typeof outOrX === 'number' ? xOrY : maybeY!;

	out.fill(0);
	out[0] = 1;
	out[4] = 1;
	out[6] = x;
	out[7] = y;
	out[8] = 1;

	return out;
}

export function fromRotation(angle: number): Matrix3;
export function fromRotation(out: Matrix3, angle: number): Matrix3;
export function fromRotation(
	outOrAngle: Matrix3 | number,
	maybeAngle?: number
) {
	const out = typeof outOrAngle === 'number' ? identity() : outOrAngle;
	const angle = typeof outOrAngle === 'number' ? outOrAngle : maybeAngle!;

	let c = Math.cos(angle);
	let s = Math.sin(angle);

	out.fill(0);
	out[0] = c;
	out[1] = s;
	out[3] = -s;
	out[4] = c;
	out[8] = 1;

	return out;
}

export function multiply(a: Matrix3, b: Matrix3): Matrix3;
export function multiply(out: Matrix3, a: Matrix3, b: Matrix3): Matrix3;
export function multiply(outOrA: Matrix3, aOrB: Matrix3, maybeB?: Matrix3) {
	const out = maybeB ? outOrA : identity();
	const a = maybeB ? aOrB : outOrA;
	const b = maybeB ? maybeB : aOrB;

	let a00 = a[0],
		a01 = a[1],
		a02 = a[2];
	let a10 = a[3],
		a11 = a[4],
		a12 = a[5];
	let a20 = a[6],
		a21 = a[7],
		a22 = a[8];
	let b00 = b[0],
		b01 = b[1],
		b02 = b[2];
	let b10 = b[3],
		b11 = b[4],
		b12 = b[5];
	let b20 = b[6],
		b21 = b[7],
		b22 = b[8];

	out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	out[2] = b00 * a02 + b01 * a12 + b02 * a22;
	out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	out[5] = b10 * a02 + b11 * a12 + b12 * a22;
	out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	return out;
}

export function transform(out: Vector2, vec: Vector2, matrix: Matrix3) {
	let x = vec.x;
	let y = vec.y;
	out.x = matrix[0] * x + matrix[3] * y + matrix[6];
	out.y = matrix[1] * x + matrix[4] * y + matrix[7];

	return out;
}
