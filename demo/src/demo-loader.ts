import * as Pintograph from '../../lib/index.ts';

export async function loadDemo(name: string, title: string, rootContainer: Element | null) {
	if (!rootContainer) {
		console.error('No container found for demo:', name);
		return;
	}

	const demoContainer = document.createElement('section');
	demoContainer.className = 'example';

	const header = document.createElement('h2');
	header.innerText = title;

	const codePanel = document.createElement('pre');
	codePanel.className = 'code';
	const sourceCode = (await import(`./demos/${name}.ts?raw`)).default.replace(
		'../../../lib/index.ts',
		'pintograph'
	);
	codePanel.innerText = sourceCode;

	const previewPanel = document.createElement('div');
	previewPanel.className = 'preview';

	let artCanvas = createCanvas('drawingArea');
	previewPanel.appendChild(artCanvas);
	let artContext = artCanvas.getContext('2d');
	if (!artContext) {
		console.error('Failed to get 2D context for the art canvas');
		return;
	}

	let contraptionsCanvas = createCanvas('overlay');

	previewPanel.appendChild(contraptionsCanvas);
	let contraptionsContext = contraptionsCanvas.getContext('2d');
	if (!contraptionsContext) {
		console.error('Failed to get 2D context for the contraptions canvas');
		return;
	}

	const demo = (await import(`./demos/${name}.ts`)).default;

	let scene = new Pintograph.Scene(artContext, contraptionsContext);
	demo(scene);

	let startButton = document.createElement('button');
	startButton.innerText = 'Start';
	startButton.addEventListener('click', () => scene.run());

	let stopButton = document.createElement('button');
	stopButton.innerText = 'Stop';
	stopButton.addEventListener('click', () => scene.stop());

	let buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'controls';

	buttonsContainer.appendChild(startButton);
	buttonsContainer.appendChild(stopButton);

	previewPanel.appendChild(buttonsContainer);

	demoContainer.appendChild(header);

	const innerContainer = document.createElement('div');
	innerContainer.appendChild(previewPanel);
	innerContainer.appendChild(codePanel);

	demoContainer.appendChild(innerContainer);

	rootContainer.appendChild(demoContainer);
}

function createCanvas(className: string) {
	let canvas = document.createElement('canvas');
	canvas.width = 800;
	canvas.height = 600;
	canvas.className = className;

	return canvas;
}
