const path = require("path");
const webpack = require("webpack");

var config = {
	mode : "development",
	entry : "./src/index.js",
	output : {
		filename: "public/main.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "inline-source-map",
	module : {
		rules : [{
			// Javascript Rule. Is handled by Babel, allowing for use of ES6
			test: /\.js$/,
			exclude: /(node_modules)/,
			use : "babel-loader"
		}, {
			// HTML Rule. Allows handling of HTML in our javascript files
			test: /\.html$/,
			use : "html-loader"
		}, {
			// CSS Rule. Allows for addition of CSS packages like normalize.css, which is definitely being used.
			test: /\.css$/,
			use : [{
				loader: "style-loader",
			}, {
				loader: "css-loader",
				options : {
					sourceMap: true
				}
			}]
		}, {
			// CSS Rule for Less. Allows for development of the app using LESS files
			test: /\.less$/,
			use : [{
				loader : "style-loader",
			}, {
				loader : "css-loader",
				options : {
					sourceMap: true
				}
			}, {
				loader : "less-loader",
				options: {
					sourceMap: true
				}
			}]
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use : "file-loader"
		}]
	},
	devServer : {
		contentBase: "./dist/",
		historyApiFallback: true,
		inline: true
	},
	plugins : [
		new webpack.EnvironmentPlugin({
			NODE_ENV : "staging"
		}),
	]
};


// // Only allow for css sourcemaps on DEVELOPMENT side of application
// if ( process.env.NODE_ENV === "DEVELOPMENT" )
// {
// 	config.devtool = "inline-source-map";
// 	// Go Through each Rule
// 	config.module.rules.map( rule => {
// 		// Go through each rule use
// 		let rule_usage = rule.use;
// 		if ( Array.isArray( rule_usage ) )
// 		{
// 			rule_usage.map( usage => {
// 				if ( usage.loader === "style-loader" )
// 				{
// 					usage.options = {};
// 					usage.options.sourceMap = true;
// 				}
// 			});
// 		}
// 	});
// }

module.exports = config;