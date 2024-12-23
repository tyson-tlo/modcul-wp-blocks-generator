/* eslint-disable no-console */
// Helper function to create directories
const fs = require("fs");

const createDir = (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, {recursive: true});
		console.log(`Created directory: ${dirPath}`);
	}
};

module.exports = createDir;
