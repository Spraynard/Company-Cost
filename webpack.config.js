const path = require('path');

const config = {
	entry : "./src/index.js",
	output : {
		filename: "public/main.js",
		path: path.resolve(__dirname, "dist")
	},
	devtool: 'inline-source-map',
	module : {
		rules : [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use : 'babel-loader'
		},
		{
			test: /\.html$/,
			use : 'html-loader'
		}]
	},
	devServer : {
		contentBase: './dist/',
		historyApiFallback: true
	}
};

module.exports = config;