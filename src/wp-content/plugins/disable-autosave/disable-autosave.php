<?php
/**
 * Plugin Name: Disable Autosave
 * Author: Christian Theriot
 * Author URI: https://github.com/christian-theriot/christian-theriot.git
 * Version: 1.0
 */

function disable_autosave() {
    wp_deregister_script('autosave');
}
add_action('admin_init', 'disable_autosave');