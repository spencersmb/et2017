<?php
global $allowed_html;
?>

<div class="<?php echo et_check_border($border); ?>">
    <div class="et-rd-container">
        <div class="flex-container list <?php echo esc_attr(($reverse_layout == 'reverse') ? 'reverse' : ''); ?>">

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
            
            <div class="et-box bullet-list feature
            <?php echo esc_attr(($reverse_layout == 'reverse') ? 'bullet-list__right' : ''); ?>
            <?php echo esc_attr(($large_image == 'yes') ? 'et-box__large' : ''); ?>
            ">

                <?php if($show_category == 'yes'): ?>
                    <?php if( strtolower($category_type) == 'courses'): ?>
                        <span class="et-cat cat-red" style="margin-bottom: 15px"><a href="<?php echo esc_url(et_get_courses_link()); ?>"><?php echo wp_kses($category_type, 'et-twenty-seventeen'); ?></a></span>
                    <?php else: ?>
                        <span class="et-cat cat-red" style="margin-bottom: 15px"><a href="<?php echo esc_url(et_get_category_link($category_type)); ?>"><?php echo wp_kses($category_type, 'et-twenty-seventeen'); ?></a></span>
                    <?php endif; ?>

                <?php endif; ?>
                <h2><?php echo wp_kses($headline , 'et-twenty-seventeen'); ?></h2>
                <div class="sub-head">
                    <p><?php echo wp_kses($content , $allowed_html ,'et-twenty-seventeen'); ?>
                </div>

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

        </div>
    </div>
</div>