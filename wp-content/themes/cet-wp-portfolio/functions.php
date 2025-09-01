<?php

/**
 * CET WP Portfolio functions and definitions
 * 
 * @package WordPress
 * @subpackage CET_WP_Portfolio
 * @since CET WP Portfolio 1.0.0
 */

function cet_wp_portfolio_enqueue_styles()
{
    wp_enqueue_style('cet-wp-portfolio-style', get_parent_theme_file_uri('style.css'), [], wp_get_theme()->get('Version'));
}
add_action('wp_enqueue_scripts', 'cet_wp_portfolio_enqueue_styles');

function cet_wp_portfolio_enable_svg_mime_type($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cet_wp_portfolio_enable_svg_mime_type');

function cet_wp_portfolio_disable_autosave()
{
    wp_deregister_script('autosave');
}
add_action('admin_init', 'cet_wp_portfolio_disable_autosave');
