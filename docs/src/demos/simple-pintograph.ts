import * as Pintograph from 'pintograph';

export default function simplePintograph(
	scene: Pintograph.Scene,
	context: CanvasRenderingContext2D
) {
	let mountPoint1 = new Pintograph.StaticMountPoint({ x: 200, y: 450 });
	let mountPoint2 = new Pintograph.StaticMountPoint({ x: 600, y: 450 });
	let wheel1 = new Pintograph.Wheel(mountPoint1, 140, 0, 0.5);
	let wheel2 = new Pintograph.Wheel(mountPoint2, 100, -Math.PI / 2, 0.51);
	let arm = new Pintograph.VArm({
		mountedAt1: wheel1.mountPoint,
		mountedAt2: wheel2.mountPoint,
		length1: 280,
		length2: 400,
		flip: false,
	});

	let pen = new Pintograph.Pen(arm.mountPoint, context, '#000');
	scene.registerPen(pen);
}
