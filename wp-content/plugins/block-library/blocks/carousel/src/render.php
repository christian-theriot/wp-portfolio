<?php
if ($attributes['_settings_debug']) {
    error_log(json_encode([
        'block' => 'carousel',
        'attributes' => $attributes,
        'content' => $content
    ]));
}
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="slider" data-num-cards=<?php echo esc_attr($attributes['_settings_num_cards']); ?>>
        <div class="dashicons dashicons-arrow-left-alt2"></div>
        <?php echo $content; ?>
        <div class="dashicons dashicons-arrow-right-alt2"></div>
    </div>
</div>