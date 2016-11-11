<?php
// Image Check
if (is_numeric($main_image)) {
    $main_image_url = wp_get_attachment_url($main_image);
    $alt_text = get_post_meta($main_image, '_wp_attachment_image_alt', 'true');
}
?>

<div class="et-header-sm">

    <div class="et-header-sm--inner">
        <div class="et-header-sm--content">
            <h1></h1>
            <p></p>
        </div>
        
    </div>

</div>