<div class="eltdf-pt-one-item eltdf-post-item">
    <?php if ( has_post_thumbnail() ) { ?>
        <div class="eltdf-pt-one-image-holder">
            <?php
            readanddigest_post_info_category(array(
                'category' => $display_category
            )); ?>
            <div class="eltdf-pt-one-image-inner-holder">
                <a itemprop="url" class="eltdf-pt-one-slide-link eltdf-image-link" href="<?php echo esc_url(get_permalink()); ?>" target="_self">
                    <?php
                    if($thumb_image_size != 'custom_size') {
                        echo get_the_post_thumbnail(get_the_ID(), $thumb_image_size);
                    }
                    elseif($thumb_image_width != '' && $thumb_image_height != ''){
                        echo readanddigest_generate_thumbnail(get_post_thumbnail_id(get_the_ID()),null,$thumb_image_width,$thumb_image_height);
                    }
                    if($display_post_type_icon == 'yes') {
                        readanddigest_post_info_type(array(
                            'icon' => 'yes',
                        ));
                    }

                    if($display_featured_icon == 'yes' && get_post_meta(get_the_ID(), "eltdf_show_featured_post", true) == "yes") {
                        ?>
                        <span class="eltdf-bnl-featured-icon"><span class="icon_star_alt"></span></span>
                    <?php } ?>
                </a>
            </div>
        </div>
    <?php } ?>
    <div class="eltdf-pt-one-content-holder">
        <div class="et2017-tabs-date">
            <?php
            //new date format
                $month = get_the_time('m');
                $year = get_the_time('Y');
                $date_format_et = __( 'd F' );
            ?>
            <div class="et2017-tabs-date__wrapper">
                <a itemprop="url" href="<?php echo get_month_link($year, $month); ?>">
                    <span class="et2017-tabs-date__day"><?php the_time('d'); ?></span>
                    <span class="et2017-tabs-date__month"><?php the_time('F'); ?></span>
                </a>
            </div>

        </div>
        <div class="eltdf-pt-one-title-holder">
            <<?php echo esc_html($title_tag)?> class="eltdf-pt-one-title">
            <a itemprop="url" class="eltdf-pt-link" href="<?php echo esc_url(get_permalink()); ?>" target="_self"><?php echo readanddigest_get_title_substring(get_the_title(), $title_length) ?></a>
        </<?php echo esc_html($title_tag) ?>>
    </div>
        <?php if($display_excerpt == 'yes'){ ?>
            <div class="eltdf-pt-one-excerpt">
                <?php echo et_twenty_seventeen_getExcerpt($excerpt_length); ?>
                <?php //readanddigest_excerpt($excerpt_length); ?>
            </div>
        <?php } ?>
        <div class="et2017-tabs-link">
            <a itemprop="url" href="<?php echo esc_url(get_permalink()); ?>">
               <?php echo esc_html__("Read more", 'et_twenty_seventeen'); ?>
                <span></span>
            </a>
        </div>
    </div>
    <div class="et2016-tabs-border-bot"></div>

</div>