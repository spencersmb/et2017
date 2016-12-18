<?php
// Image Check
if (is_numeric($main_image)) {
    $main_image_url = wp_get_attachment_url($main_image);
    $alt_text = get_post_meta($main_image, '_wp_attachment_image_alt', 'true');
}

global $allowed_html;
?>

<div class="et-rd-container">
    <div class="flex-container list et-box-intro">

        <div class="et-box bullet-list feature">
            <h2><?php echo wp_kses($headline, 'et-twenty-seventeen'); ?></h2>
            <p><?php echo wp_kses($content, $allowed_html, 'et-twenty-seventeen'); ?>
        </div>

        <div class="et-box-float-images">

            <?php
            $image_url = get_stylesheet_directory_uri();
            ?>

            <div class="top-images">
                <img class="img-responsive palette-round" src="<?php echo $image_url; ?>/assets/images/about/round-tray.jpg" alt="Beautiful Watercolor Greeting Card">
                <img class="img-responsive eyedroppers" src="<?php echo $image_url; ?>/assets/images/about/eye-droppers.jpg" alt="Beautiful Watercolor Greeting Card">
            </div>
            <div class="left">
                <!--            <div class="eyedroppers">-->
                <!---->
                <!--            </div>-->
                <div class="design-card">
                    <img class="img-responsive" src="<?php echo $image_url; ?>/assets/images/about/card.jpg" alt="Beautiful Watercolor Greeting Card">
                </div>
            </div>
            <!--        <div class="right">-->
            <!--            <div class="palette-tall">-->
            <!--                <img class="img-responsive" src="--><?php //echo $image_url; ?><!--/assets/images/about/tray-tall.jpg" alt="Beautiful Watercolor Greeting Card">-->
            <!--            </div>-->
            <!--        </div>-->



        </div>

    </div>
</div>

