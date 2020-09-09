const path = require('path');

module.exports = {
	entry: './scripts/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: process.env.NODE_ENV === 'development' ? 'Pintograph.js' : 'Pintograph.min.js'
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
	}
}
