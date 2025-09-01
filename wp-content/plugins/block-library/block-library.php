<?php

/**
 * Plugin Name: Block Library
 * Version: 1.0.0
 * Author: Christian Theriot
 * Author URI: https://theriot.dev
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    register_block_type(__DIR__ . '/blocks/carousel/build');
    register_block_type(__DIR__ . '/blocks/carousel-card/build');
});
