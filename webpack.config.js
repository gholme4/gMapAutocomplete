var webpack = require('webpack');
const path = require ( 'path' );
const dist = path.resolve ( './dist' );
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		"gMapAutocomplete": './src/js/gMapAutocomplete',
		"gMapAutocomplete.min": './src/js/gMapAutocomplete',
	},
	output: {
		path: dist,
		filename: '[name].js',
		publicPath: "/",
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ["es2015"]
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
		
	]
};
