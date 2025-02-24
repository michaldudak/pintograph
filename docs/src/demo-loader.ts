import * as Pintograph from 'pintograph';

export async function loadDemo(
	name: string,
	title: string,
	rootContainer: Element | null
) {
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
	const sourceCode = (await import(`./demos/${name}.ts?raw`)).default;
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

	let scene = new Pintograph.Scene();
	demo(scene, artContext);

	let toggleButton = document.createElement('button');
	toggleButton.innerText = 'Start';
	toggleButton.addEventListener('click', () => {
		if (scene.isRunning) {
			scene.stop();
			toggleButton.innerText = 'Start';
			stepButton.disabled = false;
		} else {
			scene.run();
			toggleButton.innerText = 'Stop';
			stepButton.disabled = true;
		}
	});

	let stepButton = document.createElement('button');
	stepButton.innerText = 'Step';
	stepButton.addEventListener('click', () => {
		scene.step();
	});

	let resetButton = document.createElement('button');
	resetButton.innerText = 'Reset';
	resetButton.addEventListener('click', () => {
		scene.reset();
		artContext.clearRect(0, 0, artCanvas.width, artCanvas.height);
	});

	let buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'controls';

	buttonsContainer.appendChild(toggleButton);
	buttonsContainer.appendChild(stepButton);
	buttonsContainer.appendChild(resetButton);

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
