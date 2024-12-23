const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		index: "./src/index.js", // Gutenberg editor script
		frontend: "./src/frontend.js", // Front-end DOM manipulation script
	},
	output: {
		...defaultConfig.output,
		filename: "[name].js", // Outputs editor.js and frontend.js
	},
};
