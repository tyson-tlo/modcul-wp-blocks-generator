/* eslint-disable no-console */

const path = require("path");
const createDir = require("./create-blocks/create-dir");
const updateStyleScss = require("./update-style-scss");
const updateGeneratedRenderFunctions = require("./update-generated-render-functions");
const generateSaveBlock = require("./create-blocks/generate-save-block");
const generateEditBlock = require("./create-blocks/generate-edit-block");
const generateIndex = require("./create-blocks/generate-index");
const generateAttributesType = require("./create-blocks/generate-attributes-type");
const generateServersideRendering = require("./create-blocks/generate-serverside-rendering");
const generateScss = require("./create-blocks/generate-scss");
const blocksDir = require("./directories/blocks-dir");
const renderFunctionsPath = require("./directories/render-functions-path");

const blockName = process.argv[2];
const withPhpTemplate = process.argv.includes("--php");

if (!blockName) {
	console.error("Error: Please specify the block directory name.");
	process.exit(1);
}

const blockNamespace = `modcul-digital-blocks/${blockName}`;

const blockDir = path.join(blocksDir, blockName);
const componentsDir = path.join(blockDir, "components");
const partialsDir = path.join(blockDir, "partials");
const typesDir = path.join(blockDir, "types");
const templatesDir = path.join(blockDir, "templates");
const scssDir = path.join(blockDir, "scss");

const blockData = {
	blockName,
	blockNamespace,
	blockDir,
	templatesDir,
	withPhpTemplate,
	typesDir,
	scssDir,
	renderFunctionsPath,
	blocksDir,
};

[
	blocksDir,
	blockDir,
	componentsDir,
	partialsDir,
	typesDir,
	templatesDir,
	scssDir,
].forEach((dir) => {
	if (dir) {
		createDir(dir);
	}
});

generateIndex(blockData);
generateEditBlock(blockData);
generateSaveBlock(blockData);

generateAttributesType(blockData);

if (withPhpTemplate) {
	generateServersideRendering(blockData);
}

generateScss(blockData);

/*
 * Generate imports for scss and render functions
 *
 * This is done after generating the block files to ensure that the block files are
 * generated before updating the style.scss file.
 */
updateStyleScss(blockData);
updateGeneratedRenderFunctions(blockData);

console.log(`Block '${blockName}' has been scaffolded successfully.`);
