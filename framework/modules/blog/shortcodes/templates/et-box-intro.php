<?php
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
                <img class="img-responsive palette-round" src="<?php echo esc_url($image_url); ?>/assets/images/about/round-tray.jpg" alt="Every-Tuesday Watercolor Tools">
                <img class="img-responsive eyedroppers" src="<?php echo esc_url($image_url); ?>/assets/images/about/eye-droppers.jpg" alt="Every-Tuesday Color Inspiration">
            </div>
            <div class="left">
                <!--            <div class="eyedroppers">-->
                <!---->
                <!--            </div>-->
                <div class="design-card">
<!--                    <img class="img-responsive" src="--><?php //echo esc_url($image_url); ?><!--/assets/images/about/card.jpg" alt="Beautiful Watercolor Greeting Card">-->
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

