function createCanvas(className) {
	let canvas = document.createElement('canvas');
	canvas.width = 800;
	canvas.height = 600;
	canvas.className = className;

	return canvas;
}

function setupDemo(container, sceneFactory) {

	let preview = container.querySelector('.preview');
	let code = container.querySelector('.code');

	let artCanvas = createCanvas('drawingArea');
	preview.appendChild(artCanvas);
	let artContext = artCanvas.getContext('2d');

	let contraptionsCanvas = createCanvas('overlay');
	preview.appendChild(contraptionsCanvas);
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

	preview.appendChild(buttonsContainer);

	code.innerHTML = code.innerHTML.replace(/\t\t\t\t\t/gm, '').trim();
}
