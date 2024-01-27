<?php
/**
 * Plugin Name: WiFi Password Manager
 * Author: Christian Theriot
 * Author URI: https://github.com/christian-theriot/christian-theriot.git
 * Version: 1.0
 * Description: A simple plugin that stores your wifi password in an admin menu, allowing you to configure it anytime. You can access this panel via Settings > WiFi Password.
 */

class WifiPasswordOptionsPage {
    public function __construct() {
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('admin_init', [$this, 'register_wifi_password']);
    }

    public function register_wifi_password() {
        $args = [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => ''
        ];

        register_setting('wifi-password', 'wifi-password', $args);
    }

    public function admin_menu() {
        add_options_page(
            __('WiFi Password Configuration'),
            __('WiFi Password'),
            'manage_options',
            'wifi-password',
            [
                $this,
                'render_callback'
            ]
        );
    }

    public function render_callback() {
        ?>
            <form method="POST" action="options.php">
                <?php settings_fields('wifi-password'); ?>
                <?php do_settings_sections('wifi-password'); ?>
                <fieldset>
                    <label>WiFi Password:</label>
                    <input type="text" name="wifi-password" value="<?php echo esc_attr(get_option('wifi-password')); ?>" />
                </fieldset>
                <?php submit_button(esc_html__('Save Changes')); ?>
            </form>
        <?php
    }
}

new WifiPasswordOptionsPage();