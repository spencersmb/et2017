<li class="eltdf-carousel-item">
    <div class="eltdf-pt-one-item eltdf-post-item eltdf-active-post-page">
        <div class="eltdf-pt-one-image-holder">
            <span class="et-slider-cat cat-<?php echo esc_attr( strtolower( et_getBlogCategory_text() ) ); ?>"><?php echo et_getBlogCategories(); ?></span>
            <div class="eltdf-pt-one-image-inner-holder">
                <a itemprop="url" class="eltdf-pt-one-slide-link eltdf-image-link" href="<?php echo esc_url(get_permalink()); ?>" target="_self">
                    <?php
                    if($thumb_image_size != 'custom_size') {
                        echo get_the_post_thumbnail(get_the_ID(), $thumb_image_size);
                    }
                    elseif($thumb_image_width != '' && $thumb_image_height != ''){
                        echo readanddigest_generate_thumbnail(get_post_thumbnail_id(get_the_ID()),null,$thumb_image_width,$thumb_image_height);
                    }
                    ?>
                </a>
            </div>
        </div>
        <div class="eltdf-pt-one-content-holder">

            <div class="eltdf-pt-one-title-holder">
                <h3 class="eltdf-pt-one-title">
                    <a itemprop="url" class="eltdf-pt-link" href="<?php echo esc_url(get_permalink()); ?>" target="_self"><?php the_title() ?></a>
                </h3>
            </div>
            
        </div>

        <div class="et2016-tabs-border-bot"></div>
    </div>
</li>