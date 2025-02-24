import { loadDemo } from './demo-loader.js';

const main = document.querySelector('main');

await loadDemo('lissajous', 'Lissajous curves', main);
await loadDemo('simple-pintograph', 'Simple pintograph', main);
await loadDemo('proper-pintograph', 'Proper pintograph', main);
await loadDemo('dynamic-pen-color', 'Dynamic pen color', main);
await loadDemo('rotary-pintograph', 'Rotary pintograph', main);
await loadDemo('multi-wheel-pintograph', 'Multi-wheel pintograph', main);
