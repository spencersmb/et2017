<div class="<?php echo et_check_border($border); ?>">
    <div class="et-container-inner">
        <div class="flex-container list <?php echo esc_attr(($reverse_layout == 'reverse') ? 'reverse' : ''); ?>">

            <div class="et-box bullet-list feature <?php echo esc_attr(($reverse_layout == 'reverse') ? 'bullet-list__right' : ''); ?>">

                <h2><?php echo wp_kses($headline , 'et-twenty-seventeen'); ?></h2>
                <p class="sub-head">
                    <?php echo wp_kses($description , 'et-twenty-seventeen'); ?>
                </p>

                <?php if($add_button == 'yes'): ?>
                    <div class="button-wrapper">
                        <a
                            class="et-btn-round et-btn-enroll et-outline et-outline__black beg-level-btn"
                            <?php echo esc_attr(($new_window == 'yes') ? 'target=_blank' : ''); ?>
                            href="<?php echo esc_url($button_url); ?>">
                                <?php echo wp_kses( $button_text, 'et-twenty-seventeen'); ?>
                        </a>
                    </div>
                <?php endif; ?>

            </div>

            <div class="et-box image feature-image <?php echo esc_attr(($image_type == 'hoz') ? 'feature-image-horizontal' : ''); ?>">

                <?php
                // Image Check
                if (is_numeric($main_image)) {
                    $main_image_url = wp_get_attachment_url($main_image);
                    $alt_text = get_post_meta($main_image, '_wp_attachment_image_alt', 'true');
                }
                ?>
                <img class="img-responsive" src="<?php echo esc_url($main_image_url); ?>" alt="<?php echo $alt_text; ?>" />

            </div>

        </div>
    </div>
</div>