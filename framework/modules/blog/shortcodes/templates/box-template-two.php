<?php
    if(!isset($button_url)){
        $button_url = '';
    }

    $url = wp_get_attachment_url( $main_image );

?>



<div class="feature-box-two__outer">
    <div class="et-feature-slide box-two shadow-medium">

        <div class="box-two-inner">
            <div class="eltdf-pswt-image"
                 style="background-image: url( <?php echo et_twenty_seventeen_generate_background_img($main_image, $url, 933, 660, true); ?>)">
                <span class="et-cat cat-red"><?php echo esc_html__('New', 'et_twenty_seventeen') ?></span>
            </div> <!-- end image -->

            <div class="eltdf-pswt-content">

                <div class="eltdf-pswt-content-inner">

                    <h1 class="eltdf-pswt-title">
                        <a itemprop="url" href="<?php echo esc_url($button_url); ?>" target="_self"><?php echo wp_kses($headline, 'et_twenty_seventeen') ?></a>
                    </h1>
                    <div class="eltdf-pt-three-excerpt">
                        <?php echo $content; ?>
                    </div>
                    <a itemprop="url" href="<?php echo esc_url($button_url); ?>" target="_self" class="et-btn-round"><?php echo wp_kses($button_text, 'et_twenty_seventeen') ?></a>

                </div>

            </div><!-- ./eltdf-pswt-content -->
        </div>

    </div>
</div>
<!-- end blog container -->
