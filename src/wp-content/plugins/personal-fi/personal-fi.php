<?php
/**
 * Plugin Name: Personal FI
 * Author: Christian Theriot
 * Author URI: https://github.com/christian-theriot/christian-theriot.git
 * Description: A plugin with many features to help you achieve FI (financial independence). Includes software for: budgeting, paying off debts, visualizing mortgage payments, and assessing your investments and overall net worth.
 * Version: 1.0
 */

namespace PersonalFI;

if (!defined('ABSPATH')) {
    die;
}

class BlockLibrary {
    public function __construct() {
        add_action('init', [$this, 'register_blocks']);
    }

    public function register_blocks() {
        register_block_type(__DIR__ . '/blocks/budget/build');
    }
}

new BlockLibrary();