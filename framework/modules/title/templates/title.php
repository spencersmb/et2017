<?php do_action('readanddigest_before_page_title'); ?>
<?php if($show_title_area) { ?>
    <div class="eltdf-grid">
        <div class="eltdf-title eltdf-breadcrumbs-type <?php echo readanddigest_title_classes(); ?>" style="<?php echo esc_attr($title_height); echo esc_attr($title_background_color); echo esc_attr($title_background_image); ?>" data-height="<?php echo esc_attr(intval(preg_replace('/[^0-9]+/', '', $title_height), 10));?>" <?php echo esc_attr($title_background_image_width); ?>>
            <div class="eltdf-title-image"><?php if($title_background_image_src != ""){ ?><img src="<?php echo esc_url($title_background_image_src); ?>" alt="&nbsp;" /> <?php } ?></div>
            <div class="eltdf-title-holder" <?php readanddigest_inline_style($title_holder_height); ?>>
                <div class="eltdf-container clearfix">
                    <div class="eltdf-container-inner">
                        <div class="eltdf-title-subtitle-holder" style="<?php echo esc_attr($title_subtitle_holder_padding); echo esc_attr($title_border_color); ?>">
                            <div class="eltdf-title-subtitle-holder-inner">
                                <div class="eltdf-breadcrumbs-holder"><?php readanddigest_custom_breadcrumbs(); ?></div>
                                <h1 class="eltdf-title-text" <?php readanddigest_inline_style($title_color);?>><?php readanddigest_title_text(); ?></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>
<?php do_action('readanddigest_after_page_title'); ?>