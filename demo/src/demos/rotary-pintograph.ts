import * as Pintograph from '../../../lib/index.ts';

export default function rotaryPintograph(scene: Pintograph.Scene) {
	let center = new Pintograph.StaticMountPoint({ x: 250, y: 250 });
	let baseWheel1 = new Pintograph.Wheel(center, 200, 0, 0.201);
	let baseWheel2 = new Pintograph.Wheel(center, 200, Math.PI / 6, 0.201);
	let wheel1 = new Pintograph.Wheel(baseWheel1.mountPoint, 20, -Math.PI, 6);
	let wheel2 = new Pintograph.Wheel(baseWheel2.mountPoint, 40, 0, 2);

	let arm = new Pintograph.VArm({
		mountedAt1: wheel1.mountPoint,
		mountedAt2: wheel2.mountPoint,
		length1: 80,
		length2: 100,
		flip: true
	});

	let pen = new Pintograph.Pen(arm.mountPoint, '#000');

	scene.objects.push(center);
	scene.objects.push(baseWheel1);
	scene.objects.push(baseWheel2);
	scene.objects.push(wheel1);
	scene.objects.push(wheel2);
	scene.objects.push(arm);
	scene.pens.push(pen);
}
