<?php
if ($attributes['_settings_debug']) {
    error_log(json_encode([
        'block' => 'carousel-card',
        'attributes' => $attributes,
        'content' => $content
    ]));
}

if (!function_exists('block_library_carousel_card_rich_text')) {
    function block_library_carousel_card_rich_text(string $text): string
    {
        return wp_kses($text, ['strong' => [], 'em' => []]);
    }
}
?>

<div class="wp-block-block-library-carousel-card">
    <div class="card">
        <div class="card-header">
            <?php if (isset($attributes['media']) && isset($attributes['media']['id']) && $attributes['media']['id'] != 0): ?>
                <div class="hero">
                    <img src="<?php echo wp_get_attachment_image_url($attributes['media']['id']); ?>" />
                </div>
            <?php endif; ?>
            <div class="card-title">
                <h3><?php echo block_library_carousel_card_rich_text($attributes['title']); ?></h3>
            </div>
        </div>
        <div class="card-body">
            <?php echo block_library_carousel_card_rich_text($attributes['body']); ?>
        </div>
    </div>
</div>