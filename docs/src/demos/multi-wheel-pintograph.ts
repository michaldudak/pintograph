import * as Pintograph from '../../../src/index.ts';

export default function multiWheelPintograph(scene: Pintograph.Scene) {
	let m1 = new Pintograph.StaticMountPoint({ x: 25, y: 250 });
	let m2 = new Pintograph.StaticMountPoint({ x: 200, y: 350 });
	let m3 = new Pintograph.StaticMountPoint({ x: 400, y: 300 });

	let w1 = new Pintograph.Wheel(m1, 20, 0, 0.2);
	let w2 = new Pintograph.Wheel(m2, 30, Math.PI / 6, 0.002);
	let w3 = new Pintograph.Wheel(m3, 20, Math.PI / 6, -0.3);

	let a12 = new Pintograph.XArm({
		mountedAt1: w1.mountPoint,
		mountedAt2: w2.mountPoint,
		length1: 150,
		extensionLength1: 60,
		length2: 110,
		extensionLength2: 0,
		flip: false,
	});

	let a123 = new Pintograph.XArm({
		mountedAt1: a12.mountPoint1,
		mountedAt2: w3.mountPoint,
		length1: 80,
		extensionLength1: 0,
		length2: 150,
		extensionLength2: 60,
		flip: false,
	});

	let pen = new Pintograph.Pen(a123.mountPoint2, '#000');

	scene.objects.push(m1, m2, m3);
	scene.objects.push(w1, w2, w3);
	scene.objects.push(a12, a123);
	scene.pens.push(pen);
}
