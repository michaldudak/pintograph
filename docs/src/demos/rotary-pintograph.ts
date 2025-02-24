import * as Pintograph from 'pintograph';

export default function rotaryPintograph(
	scene: Pintograph.Scene,
	context: CanvasRenderingContext2D
) {
	let center = new Pintograph.StaticMountPoint({ x: 250, y: 250 });
	let baseWheel1 = new Pintograph.Wheel(center, 200, 0, 0.101);
	let baseWheel2 = new Pintograph.Wheel(center, 200, Math.PI / 5, 0.101);
	let wheel1 = new Pintograph.Wheel(baseWheel1.mountPoint, 10, -Math.PI, -0.1);
	let wheel2 = new Pintograph.Wheel(baseWheel2.mountPoint, 50, 0, 0.2);

	let arm = new Pintograph.VArm({
		mountedAt1: wheel1.mountPoint,
		mountedAt2: wheel2.mountPoint,
		length1: 120,
		length2: 80,
		flip: true,
	});

	let pen = new Pintograph.Pen(arm.mountPoint, context, '#000');
	scene.registerPen(pen);
}
