export type EasingFunction = (elapsedTime: number) => number;

export const easingFunctions: Record<string, EasingFunction> = {
	sine: (t) => Math.sin(t * Math.PI * 2) * 0.5 + 0.5,
	triangle: (t) => {
		let fraction = t - Math.floor(t);
		return fraction < 0.5 ? fraction * 2 : (1 - fraction) * 2;
	},
	sawtooth: (t) => t - Math.floor(t),
	step: (t) => (t - Math.floor(t) < 0.5 ? 1 : 0),
};
