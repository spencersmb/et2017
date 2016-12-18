<?php
// Image Check
if (is_numeric($image_1)) {
    $image_1_url = wp_get_attachment_url($image_1);
    $image_1_alt_text = get_post_meta($image_1, '_wp_attachment_image_alt', 'true');
}

// Image Check
if (is_numeric($image_2)) {
    $image_2_url = wp_get_attachment_url($image_2);
    $image_2_alt_text = get_post_meta($image_2, '_wp_attachment_image_alt', 'true');
}
?>


<div class="et-rd-container">

    <div class="flex-container no-margin et-gallery-lg">

        <div class="et-gallery-image__main">
            <img class="img-responsive" src="<?php echo esc_url($image_1_url);  ?>" alt="<?php echo esc_attr($image_1_alt_text); ?>">
        </div>

        <div class="et-gallery-image__sidebar">
            <div class="et-gallery-siderbar__item">
                <img class="img-responsive" src="<?php echo esc_url($image_2_url);  ?>" alt="<?php echo esc_attr($image_2_alt_text); ?>">
            </div>

        </div>

    </div>

</div>

