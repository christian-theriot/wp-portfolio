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
        add_filter('block_categories_all', [$this, 'register_block_category']);
        add_action('init', [$this, 'register_blocks']);
    }

    public function register_block_category($categories) {
        $new_category = [
            'personal-finance' => [
                'slug' => 'personal-finance',
                'title' => 'Personal Finance'
            ]
        ];

        $position = 2; // after text & media
        $categories = array_slice($categories, 0, $position, true) + $new_category + array_slice($categories, $position, null, true);

        return array_values($categories);
    }

    public function register_blocks() {
        $blocks = [
            'accounts',
            'budget',
            'transactions'
        ];

        foreach ($blocks as $block) {
            register_block_type(__DIR__ . '/blocks/' . $block . '/build');
        }
    }
}

new BlockLibrary();