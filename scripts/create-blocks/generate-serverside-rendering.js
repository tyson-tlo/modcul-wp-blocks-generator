const writeFile = require("../write-file");
const path = require("path");

const generateServersideRendering = ({
	blockName,
	blockNamespace,
	blockDir,
	templatesDir,
}) => {
	const phpTemplateContent = `<?php
	/**
	 * Server-side rendering of the block.
	 *
	 * @package ModculDigitalBlocks
	 */

	function render_${blockName.replace(/[-_]/g, "_")}_block( $attributes ) {
		ob_start();
		require __DIR__ . '/templates/${blockName}.php';
		return ob_get_clean();
	}

	register_block_type( '${blockNamespace}', array(
		'attributes'      => array(
			'exampleAttribute' => array(
				'type'    => 'string',
				'default' => 'Default value',
			),
		),
		'render_callback' => 'render_${blockName.replace(/[-_]/g, "_")}_block',
	) );
	?>`;
	writeFile(path.join(blockDir, `${blockName}.php`), phpTemplateContent);

	const phpTemplateFileContent = `<?php
	/**
	 * Template for the ${blockName} block.
	 *
	 * @package ModculDigitalBlocks
	 */
	?>
	<div class="wp-block-${blockName}">
		<?php echo esc_html( $attributes['exampleAttribute'] ?? '' ); ?>
	</div>`;

	writeFile(
		path.join(templatesDir, `${blockName}.php`),
		phpTemplateFileContent,
	);
};

module.exports = generateServersideRendering;
