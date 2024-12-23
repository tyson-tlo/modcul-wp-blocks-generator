const writeFile = require("../write-file");

const path = require("path");

const generateAttributesType = ({typesDir}) => {
	const attributesTypeContent = `export interface AttributesType {
        // Define your block attributes here
        exampleAttribute?: string;
    }`;
	writeFile(path.join(typesDir, "AttributesType.ts"), attributesTypeContent);
};

module.exports = generateAttributesType;
