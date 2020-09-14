function createCanvas(className) {
	let canvas = document.createElement('canvas');
	canvas.width = 800;
	canvas.height = 600;
	canvas.className = className;

	return canvas;
}

function setupDemo(container, sceneFactory) {
	let artCanvas = createCanvas('drawingArea');
	container.appendChild(artCanvas);
	let artContext = artCanvas.getContext('2d');

	let contraptionsCanvas = createCanvas('overlay');
	container.appendChild(contraptionsCanvas);
	let contraptionsContext = contraptionsCanvas.getContext('2d');

	let scene = sceneFactory(artContext, contraptionsContext);

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

	container.appendChild(buttonsContainer);
}
