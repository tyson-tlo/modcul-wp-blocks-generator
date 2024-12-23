<?php

/**
 * Plugin Name: ModCul Digital Blocks
 * Description: Custom Gutenberg Blocks for ModCul Digital
 * Version: 1.0.0
 * Author: Tyson London - Succeed Digital - https://succeed.digital
 * Author URI: https://modcul.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: modcul-digital-blocks
 * Domain Path: /languages
 */

if (! defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'generated-render-functions.php';

function modcul_digital_block_categories($categories, $post)
{
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'modcul-digital-blocks',
                'title' => __('Modcul Digital Blocks', 'modcul-digital-blocks'),
                'icon'  => null,
            ),
        )
    );
}

// Hook based on WordPress version
if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
    add_filter('block_categories_all', 'modcul_digital_block_categories', 10, 2);
} else {
    add_filter('block_categories', 'modcul_digital_block_categories', 10, 2);
}

function enqueue_modcul_digital_blocks_assets()
{
    $build_dir = plugin_dir_path(__FILE__) . 'build/';
    $build_url = plugin_dir_url(__FILE__) . 'build/';

    $asset_file = include($build_dir . 'index.asset.php');

    wp_enqueue_script(
        'modcul-digital-blocks-editor',
        $build_url . 'index.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    if (file_exists($build_dir . 'style.css')) {
        wp_enqueue_style(
            'modcul-digital-blocks-style',
            $build_url . 'style.css',
            array(),
            $asset_file['version']
        );
    }

    wp_enqueue_style(
        'modcul-digital-style',
        plugin_dir_url(__FILE__) . 'build/style-index.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_modcul_digital_blocks_assets');

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'modcul-digital-frontend-style',
        plugin_dir_url(__FILE__) . 'build/style-index.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    wp_enqueue_script(
        'component-scripts',
        plugin_dir_url(__FILE__) . 'build/frontend.js',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/frontend.js')
    );
});
