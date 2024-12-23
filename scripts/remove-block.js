/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const updateStyleScss = require("./update-style-scss");
const updateGeneratedRenderFunctions = require("./update-generated-render-functions");
const blocksDir = require("./directories/blocks-dir");
const renderFunctionsPath = require("./directories/render-functions-path");

const blockName = process.argv[2];

if (!blockName) {
	console.error("Error: Please specify the block directory name.");
	process.exit(1);
}

const blockDir = path.resolve("src/blocks", blockName);

const removeBlock = () => {
	if (!fs.existsSync(blockDir)) {
		console.error(`Error: Block directory not found: ${blockDir}`);
		process.exit(1);
	}

	fs.rmdirSync(blockDir, {recursive: true});
	console.log(`Removed block: ${blockName}`);
};

removeBlock();

updateStyleScss({blocksDir});
updateGeneratedRenderFunctions({blocksDir, renderFunctionsPath});
