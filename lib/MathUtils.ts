import { Vector2 } from './Vectors';

const DEG_TO_RAD_FACTOR = Math.PI / 180;
const RAD_TO_DEG_FACTOR = 180 / Math.PI;

export const EPSILON = 0.0001;

export const degToRad = function degToRad(deg : number) {
	return deg * DEG_TO_RAD_FACTOR;
};

export const radToDeg = function radToDeg(rad : number) {
	return rad * RAD_TO_DEG_FACTOR;
};

export const distance = function distance(pointA : Vector2, pointB : Vector2) {
	var xd = pointB.x - pointA.x;
	var yd = pointB.y - pointA.y;
	return Math.sqrt((xd ** 2) + (yd ** 2));
};

export const circleCircleIntersection = function circleCircleIntersection(p0 : Vector2, r0 : number, p1 : Vector2, r1 : number) {
	// based on http://paulbourke.net/geometry/circlesphere/
	var d = distance(p0, p1);
	if (d > r0 + r1) {
		throw new Error("Circles are separate");
	} else if (d < Math.abs(r0 - r1)) {
		throw new Error("Circles are contained within each other");
	} else if (d === 0 && r0 === r1) {
		throw new Error("Circles are coincident");
	}

	var a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
	var h = Math.sqrt((r0 ** 2) - (a ** 2));

	var p2 : Vector2 = {
		x: p0.x + (a * (p1.x - p0.x)) / d,
		y: p0.y + (a * (p1.y - p0.y)) / d
	};

	var p3_1 : Vector2 = {
		x: p2.x + (h * (p1.y - p0.y)) / d,
		y: p2.y - (h * (p1.x - p0.x)) / d
	};


	var p3_2 : Vector2 = {
		x: p2.x - (h * (p1.y - p0.y)) / d,
		y: p2.y + (h * (p1.x - p0.x)) / d
	};

	return [p3_1, p3_2];
};

export const normalizeVector = function normalizeVector(vector : Vector2) {
	var length = distance({x: 0, y: 0}, vector);
	if (length == 0) {
		return {x: 0, y: 0} as Vector2;
	}

	return {
		x: vector.x / length,
		y: vector.y / length
	} as Vector2;
};

export const multiplyVector = function multiplyVector(vector : Vector2, factor : number) {
	return {
		x: vector.x * factor,
		y: vector.y * factor
	} as Vector2;
};

export const addVectors = function addVectors(a : Vector2, b : Vector2) {
	return {
		x: a.x + b.x,
		y: a.y + b.y
	} as Vector2;
};

export const subtractVectors = function subtractVectors(a : Vector2, b : Vector2) {
	return addVectors(a, {x: -b.x, y: -b.y});
};
