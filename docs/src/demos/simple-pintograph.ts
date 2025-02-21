import * as Pintograph from '../../../src/index.ts';

export default function simplePintograph(scene: Pintograph.Scene) {
	let mountPoint1 = new Pintograph.StaticMountPoint({ x: 200, y: 450 });
	let mountPoint2 = new Pintograph.StaticMountPoint({ x: 600, y: 450 });
	let wheel1 = new Pintograph.Wheel(mountPoint1, 150, 0, 0.5);
	let wheel2 = new Pintograph.Wheel(mountPoint2, 100, -Math.PI / 2, 0.51);
	let arm = new Pintograph.VArm({
		mountedAt1: wheel1.mountPoint,
		mountedAt2: wheel2.mountPoint,
		length1: 300,
		length2: 400,
		flip: false,
	});

	let pen = new Pintograph.Pen(arm.mountPoint, '#000');

	scene.objects.push(mountPoint1);
	scene.objects.push(mountPoint2);
	scene.objects.push(wheel1);
	scene.objects.push(wheel2);
	scene.objects.push(arm);
	scene.pens.push(pen);
}
