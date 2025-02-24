import * as Pintograph from 'pintograph';

export default function lissajous(
	scene: Pintograph.Scene,
	context: CanvasRenderingContext2D
) {
	let mountPoint = new Pintograph.StaticMountPoint({ x: 400, y: 300 });
	let hOscillator = new Pintograph.Oscillator(mountPoint, 500, 0, 0.6);
	let vOscillator = new Pintograph.Oscillator(
		hOscillator.mountPoint,
		500,
		-Math.PI / 2,
		0.5
	);

	let pen = new Pintograph.Pen(vOscillator.mountPoint, context, '#000');
	scene.registerPen(pen);
}
