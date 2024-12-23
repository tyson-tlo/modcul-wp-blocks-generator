/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const writeFile = require("./write-file");
const blocksDir = require("./directories/blocks-dir");
const renderFunctionsPath = require("./directories/render-functions-path");

// Helper function to update generated-render-functions.php
const updateGeneratedRenderFunctions = () => {
	console.log("blocksDir: ", blocksDir);
	try {
		const blocks = fs
			.readdirSync(blocksDir)
			.filter((dir) =>
				fs.statSync(path.join(blocksDir, dir)).isDirectory(),
			);

		const functions = blocks
			.map((block) => {
				const phpFilePath = path.join(blocksDir, block, `${block}.php`);
				if (fs.existsSync(phpFilePath)) {
					return `require_once plugin_dir_path( __FILE__ ) . '/src/blocks/${block}/${block}.php';`;
				}

				console.warn(`Warning: PHP file not found for block: ${block}`);
				return null;
			})
			.filter(Boolean) // Remove null entries
			.join("\n");

		const content = `<?php
/**
 * Auto-generated file for registering render functions.
 *
 * @package ModculDigitalBlocks
 */

${functions}
`;

		writeFile(renderFunctionsPath, content);
		console.log(
			"Updated generated-render-functions.php with block render functions.",
		);
	} catch (error) {
		console.log("Error updating generated render function: ", error);
	}
};

module.exports = updateGeneratedRenderFunctions;
