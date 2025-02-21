import type { UserConfig } from 'vite';

export default {
	base: '/pintograph/',
	build: {
		target: ['esnext'],
	},
} satisfies UserConfig;
