const writeFile = require("../write-file");
const path = require("path");

const generateScss = ({scssDir, blockName}) => {
	const scssContent = `// SCSS file for ${blockName} block

.block-${blockName} {
	// Block-specific styles go here
}`;
	writeFile(path.join(scssDir, "_main.scss"), scssContent);
};

module.exports = generateScss;
