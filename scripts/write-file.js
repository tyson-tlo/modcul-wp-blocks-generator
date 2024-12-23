/* eslint-disable no-console */
const fs = require("fs");

const writeFile = (filePath, content) => {
	console.log("File Path: ", filePath);
	fs.writeFileSync(filePath, content, "utf8");
	console.log(`Created file: ${filePath}`);
};

module.exports = writeFile;
