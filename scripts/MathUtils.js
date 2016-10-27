(function() {

	var DEG_TO_RAD_FACTOR = Math.PI / 180;
	var RAD_TO_DEG_FACTOR = 180 / Math.PI;

	window.MathUtils = {
		EPSILON: 0.0001
	};

	window.MathUtils.sqr = function sqr(value) {
		return value * value;
	};

	window.MathUtils.degToRad = function degToRad(deg) {
		return deg * DEG_TO_RAD_FACTOR;
	};

	window.MathUtils.radToDeg = function radToDeg(rad) {
		return rad = RAD_TO_DEG_FACTOR;
	};

	window.MathUtils.distance = function distance(pointA, pointB) {
		var xd = pointB.x - pointA.x;
		var yd = pointB.y - pointA.y;
		return Math.sqrt(window.MathUtils.sqr(xd) + window.MathUtils.sqr(yd));
	};

	window.MathUtils.circleCircleIntersection = function circleCircleIntersection(p0, r0, p1, r1) {
		// based on http://paulbourke.net/geometry/circlesphere/
		var d = window.MathUtils.distance(p0, p1);
		if (d > r0 + r1) {
			throw new Error("Circles are separate");
		} else if (d < Math.abs(r0 - r1)) {
			throw new Error("Circles are contained within each other");
		} else if (d === 0 && r0 === r1) {
			throw new Error("Circles are coincident");
		}

		var a = (window.MathUtils.sqr(r0) - window.MathUtils.sqr(r1) + window.MathUtils.sqr(d)) / (2 * d);
		var h = Math.sqrt(window.MathUtils.sqr(r0) - window.MathUtils.sqr(a));

		var p2 = {};
		p2.x = p0.x + (a * (p1.x - p0.x)) / d;
		p2.y = p0.y + (a * (p1.y - p0.y)) / d;

		var p3_1 = {};
		p3_1.x = p2.x + (h * (p1.y - p0.y)) / d;
		p3_1.y = p2.y - (h * (p1.x - p0.x)) / d;

		var p3_2 = {};
		p3_2.x = p2.x - (h * (p1.y - p0.y)) / d;
		p3_2.y = p2.y + (h * (p1.x - p0.x)) / d;

		return [p3_1, p3_2];
	};

	window.MathUtils.normalizeVector = function normalizeVector(vector) {
		var length = window.MathUtils.distance({x: 0, y: 0}, vector);
		if (length == 0) {
			return {x: 0, y: 0};
		}

		return {
			x: vector.x / length,
			y: vector.y / length
		};
	};

	window.MathUtils.multiplyVector = function multiplyVector(vector, factor) {
		return {
			x: vector.x * factor,
			y: vector.y * factor
		};
	};

	window.MathUtils.addVectors = function addVectors(a, b) {
		return {
			x: a.x + b.x,
			y: a.y + b.y
		};
	};

	window.MathUtils.subtractVectors = function subtractVectors(a, b) {
		return window.MathUtils.addVectors(a, {x: -b.x, y: -b.y});
	};
}());