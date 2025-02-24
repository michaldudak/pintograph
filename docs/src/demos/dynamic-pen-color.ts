import * as Pintograph from 'pintograph';

export default function dynamicPenColor(
	scene: Pintograph.Scene,
	context: CanvasRenderingContext2D
) {
	let mountPoint1 = new Pintograph.StaticMountPoint({ x: 250, y: 400 });
	let mountPoint2 = new Pintograph.StaticMountPoint({ x: 550, y: 400 });
	let wheel1 = new Pintograph.Wheel(mountPoint1, 80, 0, -0.303);
	let subwheel1 = new Pintograph.Wheel(wheel1.mountPoint, 20, 0, 0.909);
	let wheel2 = new Pintograph.Wheel(mountPoint2, 100, Math.PI / 6, 0.3);
	let subwheel2 = new Pintograph.Wheel(wheel2.mountPoint, 30, Math.PI, -0.9);

	let xArm = new Pintograph.XArm({
		mountedAt1: subwheel1.mountPoint,
		mountedAt2: subwheel2.mountPoint,
		length1: 250,
		extensionLength1: 60,
		length2: 250,
		extensionLength2: 60,
		flip: false,
	});

	let arm = new Pintograph.VArm({
		mountedAt1: xArm.mountPoint1,
		mountedAt2: xArm.mountPoint2,
		length1: 60,
		length2: 60,
		flip: true,
	});

	let pen = new Pintograph.Pen(
		arm.mountPoint,
		context,
		(t) => `hsl(${(t * 4) % 360}, 80%, 60%)`
	);

	scene.registerPen(pen);
}
