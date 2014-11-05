(function() {

	var DEG_TO_RAD_FACTOR = Math.PI / 180;
	var RAD_TO_DEG_FACTOR = 180 / Math.PI;

	function sqr(value) {
		return value * value;
	}

	 function degToRad(deg) {
		return deg * DEG_TO_RAD_FACTOR;
	}

	function radToDeg(rad) {
		return rad = RAD_TO_DEG_FACTOR;
	}

	function distance(pointA, pointB) {
		var xd = pointB.x - pointA.x;
		var yd = pointB.y - pointA.y;
		return Math.sqrt(sqr(xd) + sqr(yd));
	}

	window.MathUtils = {
		EPSILON: 0.0001,

		degToRad: degToRad,

		radToDeg: radToDeg,

		distance: distance,

		sqr: sqr,

		circleCircleIntersection: function circleCircleIntersection(p0, r0, p1, r1) {
			// based on http://paulbourke.net/geometry/circlesphere/
			var d = distance(p0, p1);
			if (d > r0 + r1) {
				throw new Error("Circles are separate");
			} else if (d < Math.abs(r0 - r1)) {
				throw new Error("Circles are contained within each other");
			} else if (d === 0 && r0 === r1) {
				throw new Error("Circles are coincident");
			}

			var a = (sqr(r0) - sqr(r1) + sqr(d)) / (2 * d);
			var h = Math.sqrt(sqr(r0) - sqr(a));

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
		}
	}
}());