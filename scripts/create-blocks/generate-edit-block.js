const path = require("path");
const writeFile = require("../write-file");

const generateEditBlock = ({withPhpTemplate, blockNamespace, blockDir}) => {
	const editBlockContent = `import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { AttributesType } from './types/AttributesType';
${
	withPhpTemplate
		? "import ServerSideRender from '@wordpress/server-side-render';"
		: ""
}

interface IProps {
    attributes: AttributesType;
    setAttributes: (value: Partial<AttributesType>) => void;
}

export const EditBlock = (props: IProps) => {
    const { attributes, setAttributes } = props;
    const blockProps = useBlockProps();
    return (
        ${
			withPhpTemplate
				? `<ServerSideRender block="${blockNamespace}" attributes={attributes} />`
				: `
        <div {...blockProps}>
            <p>Hello from EditBlock!</p>
        </div>
        `
		}
    );
};`;
	writeFile(path.join(blockDir, "EditBlock.tsx"), editBlockContent);
};

module.exports = generateEditBlock;
