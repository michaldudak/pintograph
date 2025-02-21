import * as Pintograph from '../../../src/index.ts';

export default function lissajous(scene: Pintograph.Scene) {
	let mountPoint = new Pintograph.StaticMountPoint({ x: 400, y: 300 });
	let hOscillator = new Pintograph.Oscillator(mountPoint, 500, 0, 0.6);
	let vOscillator = new Pintograph.Oscillator(hOscillator.mountPoint, 500, -Math.PI / 2, 0.5);
	let pen = new Pintograph.Pen(vOscillator.mountPoint, '#000');

	scene.objects.push(mountPoint);
	scene.objects.push(hOscillator);
	scene.objects.push(vOscillator);
	scene.pens.push(pen);
}
