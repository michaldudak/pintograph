import { loadDemo } from './demo-loader.js';

await loadDemo('lissajous', 'Lissajous curves', document.body);
await loadDemo('simple-pintograph', 'Simple pintograph', document.body);
await loadDemo('proper-pintograph', 'Proper pintograph', document.body);
await loadDemo('dynamic-pen-color', 'Dynamic pen color', document.body);
await loadDemo('rotary-pintograph', 'Rotary pintograph', document.body);
await loadDemo(
	'multi-wheel-pintograph',
	'Multi-wheel pintograph',
	document.body
);
