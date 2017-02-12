<?php
// Image Check
if (isset($profile_image) && is_numeric($profile_image)) {
    $profile_image_url = wp_get_attachment_url($profile_image);
    $profile_image_alt_text = get_post_meta($profile_image, '_wp_attachment_image_alt', 'true');
}else{
    $profile_image_url = '';
    $profile_image_alt_text = '';
}

if (isset($signature_image) && is_numeric($signature_image)) {
    $signature_image_url = wp_get_attachment_url($signature_image);
    $signature_image_alt_text = get_post_meta($signature_image, '_wp_attachment_image_alt', 'true');
}else{
    $signature_image_url = '';
    $signature_image_alt_text = '';
}

global $allowed_html;
?>

<div class="flex-xs flex-sm-4 flex-md-6 flex-et-biocard">
    <div class="et-biocard shadow-small">
        <div class="et-biocard__image">
            <img class="img-responsive" src="<?php echo esc_url($profile_image_url); ?>" alt="<?php echo esc_attr($profile_image_alt_text); ?>">
        </div>
        <div class="et-biocard__content">
            <h3><?php echo wp_kses( $name, $allowed_html, 'et-twenty-seventeen' ); ?></h3>
            <h6><?php echo wp_kses( $title, $allowed_html, 'et-twenty-seventeen' ); ?></h6>
        </div>
        <div class="et-biocard__divider">
            <div class="et-dotted-divider"></div>
        </div>
        <div class="et-biocard__signature">
            <div class="et-biocard__signature--img">
                <img class="img-responsive" src="<?php echo esc_url($signature_image_url) ?>" alt="<?php echo esc_attr($profile_image_alt_text); ?>">
            </div>
            <div class="et-biocard__signature--desc">
                <?php echo wp_kses_post( $content, 'et-twenty-seventeen' ); ?>
            </div>
        </div>
    </div>
</div>
