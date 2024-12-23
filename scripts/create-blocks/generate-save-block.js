const writeFile = require("../write-file");
const path = require("path");

const generateSaveBlock = ({withPhpTemplate, blockDir}) => {
	const saveBlockContent = `import React from 'react';
    import { useBlockProps } from '@wordpress/block-editor';
    import { AttributesType } from './types/AttributesType';

    interface IProps {
        attributes: AttributesType;
    }

    export const SaveBlock = (props: IProps) => {
        const { attributes } = props;
        ${
			withPhpTemplate
				? "return undefined;"
				: `const blockProps = useBlockProps.save();
                return (
                    <div {...blockProps}>
                        <p>Hello from SaveBlock!</p>
                    </div>
                );`
		}
    };`;
	writeFile(path.join(blockDir, "SaveBlock.tsx"), saveBlockContent);
};

module.exports = generateSaveBlock;
