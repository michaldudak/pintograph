import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['dist/**', 'node_modules/**', 'docs/dist/**']),
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'prefer-const': 'off',
		},
	},
]);
