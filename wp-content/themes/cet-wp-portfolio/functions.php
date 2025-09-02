<?php

/**
 * CET WP Portfolio functions and definitions
 * 
 * @package WordPress
 * @subpackage CET_WP_Portfolio
 * @since CET WP Portfolio 1.0.0
 */

class Theme
{
    public string $name;

    /**
     * Build an OOP representation of this theme, as much as is possible within the WP framework
     * 
     * @param string $name The name of the theme, in dash-case
     */
    function __construct(string $name)
    {
        $this->name = $name;
    }

    /**
     * Register the default stylesheet, i.e. style.css using relative paths from the parent theme
     */
    function enqueue_default_stylesheet(): void
    {
        wp_enqueue_style($this->name . '-style', get_parent_theme_file_uri('style.css'), [], wp_get_theme()->get('Version'));
    }

    /**
     * Register SVG as a valid upload mime type
     * 
     * @param array $mimes The list of acceptable mime types
     * 
     * @return array The new list of acceptable mime types (including SVG)
     */
    function enable_svg_uploads(array $mimes): array
    {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

    /**
     * Disable autosaves of pages, as this seems to slow down performance
     */
    function disable_autosave(): void
    {
        wp_deregister_script('autosave');
    }

    /**
     * Enable dashicons in the frontend
     */
    function enable_dashicons(): void
    {
        wp_enqueue_style('dashicons');
    }

    function setup_actions(): void
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_default_stylesheet']);
        add_action('wp_enqueue_scripts', [$this, 'enable_dashicons']);
        add_action('admin_init', [$this, 'disable_autosave']);
    }

    function setup_filters(): void
    {
        add_filter('upload_mimes', [$this, 'enable_svg_uploads']);
    }
}

$cet_wp_portfolio = new Theme('cet-wp-portfolio');

$cet_wp_portfolio->setup_actions();
$cet_wp_portfolio->setup_filters();
