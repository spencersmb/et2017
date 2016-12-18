<?php
// Image Check
if (is_numeric($image)) {
    $main_image_url = wp_get_attachment_url($image);
    $alt_text = get_post_meta($image, '_wp_attachment_image_alt', 'true');
}else{
    $main_image_url = '';
}

global $allowed_html;
?>
<div class="flex-xs flex-sm-4">

    <a href="<?php echo esc_attr(get_page_link($page_link)); ?>">
        <div class="et-linkcard__item shadow-small">
            <div class="et-linkcard__image">
                <img src="<?php echo esc_attr($main_image_url); ?>" alt="<?php echo esc_attr($alt_text); ?>">
            </div>
            <div class="et-linkcard__content">
                <h3 style="color:<?php echo esc_attr($headline_color); ?>">
                    <?php echo wp_kses($headline, $allowed_html, 'et-twenty-seventeen'); ?>
                    <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                </h3>
                <p>
                    <?php echo wp_kses($content, $allowed_html, 'et-twenty-seventeen'); ?>
                </p>
            </div>
        </div>
    </a>
    
</div>
