import { resolve } from 'node:path';
import type { UserConfig } from 'vite';

export default {
	base: '/pintograph/',
	build: {
		target: ['esnext'],
	},
	resolve: {
		alias: {
			pintograph: resolve(import.meta.dirname, '../src/index.ts'),
		},
	},
} satisfies UserConfig;
