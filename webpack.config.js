const path = require("path");

var config = {
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
		}]
	},
	devServer : {
		contentBase: "./dist/",
		historyApiFallback: true,
		inline: true
	}
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