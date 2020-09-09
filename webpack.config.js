const path = require('path');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './lib/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: {
			root: 'Pintograph',
			amd: 'pintograph',
			commonjs: ''
		},
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPkgJsonPlugin({
			remove: ['devDependencies', 'scripts', 'files'],
			replace: {
				main: 'index.js',
				types: 'index.d.ts'
			}
		})
	]
}
