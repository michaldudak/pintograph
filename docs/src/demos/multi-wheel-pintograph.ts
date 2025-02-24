import * as Pintograph from 'pintograph';

export default function multiWheelPintograph(
	scene: Pintograph.Scene,
	context: CanvasRenderingContext2D
) {
	let m1 = new Pintograph.StaticMountPoint({ x: 25, y: 250 });
	let m2 = new Pintograph.StaticMountPoint({ x: 200, y: 350 });
	let m3 = new Pintograph.StaticMountPoint({ x: 380, y: 250 });

	let w1 = new Pintograph.Wheel(m1, 20, 0, -0.15);
	let w2 = new Pintograph.Wheel(m2, 30, (-3 * Math.PI) / 4, 0.005);
	let w3 = new Pintograph.Wheel(m3, 40, Math.PI / 2, -0.3);

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

	let pen = new Pintograph.Pen(a123.mountPoint2, context, '#000');
	scene.registerPen(pen);
}
