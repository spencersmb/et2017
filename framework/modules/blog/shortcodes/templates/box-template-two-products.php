<?php
if(!isset($button_url)){
    $button_url = '';
}

$url = wp_get_attachment_url( $main_image );

$has_font_preview = false;
$has_youtube_link = false;

if(isset($acf)){

    if(isset($acf['has_font_preview']) && $acf['has_font_preview']){

        $has_font_preview = true;
        
        //convert font styles to string for output
        $font_names = et_array_to_string($acf['font_styles']);

    }

    if(isset($acf['youtube_link']) && $acf['youtube_link']){
        $has_youtube_link = true;
    }

}

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

                    <?php if($has_font_preview): ?>
                        <div class="et-font-preview">
                            <a href="" class="et-font-preview__link et-btn-round"
                               data-name="<?php echo esc_attr($acf['font_name']); ?>"
                               data-styles="<?php echo esc_attr($font_names); ?>"
                            ><?php echo esc_html__('Try it!', 'et-twenty-seventeen') ?></a>
                        </div>
                    <?php endif; ?>

                    <?php if($has_youtube_link): ?>
                        <div class="youtube">
                            <a class="youtube-link" data-youtube="<?php echo esc_url($acf['youtube_link']); ?>" data-toggle="modal" data-target="#myModal">
                                <img class="img-responsive" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/products_2016/youtube.jpg" alt="Youtube"/>
                            </a>
                        </div>
                    <?php endif; ?>

                    <h1 class="eltdf-pswt-title">
                        <a itemprop="url" href="<?php echo esc_url($acf['gumroad_link']); ?>" target="_self"><?php echo wp_kses($post->post_title, 'et_twenty_seventeen') ?></a>
                    </h1>

                    <div class="product-price">
                        <span><?php echo wp_kses($acf['price'], 'et-twenty-seventeen'); ?></span>
                    </div>

                    <div class="eltdf-pt-three-excerpt">
                        <p><?php echo wp_kses($product_excerpt, 'et-twenty-seventeen'); ?></p>
                    </div>
                    <a itemprop="url" href="<?php echo esc_url($button_url); ?>" target="_self" class="et-btn-round"><?php echo esc_html__('View', 'et_twenty_seventeen') ?></a>

                </div>

            </div><!-- ./eltdf-pswt-content -->
        </div>

    </div>
</div>
<!-- ./feature-box-two -->
