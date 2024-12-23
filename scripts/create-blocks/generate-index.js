const writeFile = require("../write-file");
const path = require("path");

const generateIndex = ({blockDir, blockNamespace, blockName}) => {
	const indexContent = `import { registerBlockType } from '@wordpress/blocks';
    import { EditBlock } from './EditBlock';
    import { SaveBlock } from './SaveBlock';
    import { AttributesType } from './types/AttributesType';

    registerBlockType<'AttributesType'>('${blockNamespace}', {
        title: '${blockName
			.replace(/[-_]/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase())}',
        category: 'modcul-digital-blocks',
        icon: 'smiley',
        attributes: {
            exampleAttribute: {
                type: 'string',
                default: 'Default value',
            },
        },
        edit: EditBlock,
        save: SaveBlock,
    });`;
	writeFile(path.join(blockDir, "index.tsx"), indexContent);
};

module.exports = generateIndex;
