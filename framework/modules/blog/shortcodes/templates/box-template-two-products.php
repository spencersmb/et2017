<?php
if(!isset($button_url)){
    $button_url = '';
}

$url = wp_get_attachment_url( $main_image );

$has_font_preview = false;
$has_youtube_link = false;
$gumroad_link = '';
$has_extended_price = '';
$extended_price = '';
$extended_url = '';
$price = '';

if(isset($acf)){

    if(isset($acf['has_font_preview']) && $acf['has_font_preview']){

        $has_font_preview = true;
        
        //convert font styles to string for output
        $font_names = et_array_to_string($acf['font_styles']);

    }

    if(isset($acf['youtube_link']) && $acf['youtube_link']){
        $has_youtube_link = true;
    }

    if(isset($acf['price']) && $acf['price']){
        $price = $acf['price'];
    }

    if(isset($acf['has_extended_price']) && $acf['has_extended_price']){
        $has_extended_price = $acf['has_extended_price'];
    }

    if(isset($acf['extended_price']) && $acf['extended_price']){
        $extended_price = $acf['extended_price'];
    }

    if(isset($acf['extended_license_url']) && $acf['extended_license_url']){
        $extended_url = $acf['extended_license_url'];
    }

    if(isset($acf['gumroad_link']) && $acf['gumroad_link']){
        $gumroad_link = $acf['gumroad_link'];
    }

}

?>



<div class="feature-box-two__outer">
    <div class="et-feature-slide box-two shadow-medium">

        <div class="box-two-inner">
            <div class="eltdf-pswt-image"
                 style="background-image: url( <?php echo esc_url(et_twenty_seventeen_generate_background_img($main_image, $url, 933, 660, true)); ?>)">
                <span class="et-cat cat-red"><?php echo esc_html__('New', 'et_twenty_seventeen') ?></span>
            </div> <!-- end image -->

            <div class="eltdf-pswt-content">

                <div class="eltdf-pswt-content-inner et-box-item__description">

                    <?php if($has_font_preview): ?>
                        <div class="et-font-preview">
                            <a href="" class="et-font-preview__link et-btn-round"
                               data-name="<?php echo esc_attr($acf['font_name']); ?>"
                               data-styles="<?php echo esc_attr($font_names); ?>"
                            ><?php echo esc_html__('Try it!', 'et-twenty-seventeen') ?></a>
                        </div>
                    <?php endif; ?>

                    <?php if($has_youtube_link): ?>
                        <div class="et-box-item__youtube">
                            <a class="youtube-link" data-youtube="<?php echo esc_url($acf['youtube_link']); ?>" data-toggle="modal" data-target="#et_youtubeModal">
                                <img class="img-responsive" src="<?php echo get_stylesheet_directory_uri() . esc_attr('/assets/images/products_2016/youtube.jpg'); ?>" alt="Youtube"/>
                            </a>
                        </div>
                    <?php endif; ?>

                    <h1 class="eltdf-pswt-title">
                        <a itemprop="url" href="<?php echo esc_url($gumroad_link); ?>" target="_self"><?php echo wp_kses($post->post_title, 'et_twenty_seventeen') ?></a>
                    </h1>

                    <div class="product-price">
                        <?php echo wp_kses($price, 'et-twenty-seventeen'); ?>
                    </div>

                    <div class="eltdf-pt-three-excerpt">
                        <p class="text-center"><?php echo wp_kses($product_excerpt, 'et-twenty-seventeen'); ?></p>
                    </div>

                    <div class="products-cta">
                        <div class="license-title">
                            <?php echo esc_html__('License Type:'); ?>
                        </div>
                        <?php ($has_extended_price == 1) ? $ul_class_list = "select selected-1" : $ul_class_list = "select selected-1 single"; ?>

                        <div class="<?php echo wp_kses($ul_class_list, 'et-twenty-seventeen'); ?>" <?php echo ($has_extended_price == 1) ? esc_html__('data-type=select') : ''; ?>>
                            <ul <?php echo ($has_extended_price !== 1) ? esc_html__('class=single') : ''; ?>>
                                <li class="stnd" data-link="<?php echo esc_url($gumroad_link); ?>?wanted=true&amp;locale=false" data-price="<?php echo esc_attr($price); ?>" ><?php echo esc_html__('Standard', 'et-twenty-seventeen'); ?></li>

                                <?php if( $has_extended_price == 1 ): ?>
                                    <li class="ext" data-link="<?php echo esc_url($extended_url); ?>?wanted=true&amp;locale=false" data-price="<?php echo esc_attr($extended_price); ?>"><?php echo esc_html__('Extended', 'et-twenty-seventeen'); ?></li>
                                <?php endif; ?>
                            </ul>
                        </div>
                        <div class="add-to-cart">
                            <a href="https://gumroad.com/l/watercolor3?wanted=true&amp;locale=false" target="_blank">
                                <span><?php echo esc_html__('Buy Now', 'et-twenty-seventeen')?></span>
                            </a>
                            <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                                <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11" style="stroke-dashoffset: 19.79px;"></path>
                            </svg>

                        </div>

                    </div>

                </div>

            </div><!-- ./eltdf-pswt-content -->
        </div>

    </div>
</div>
<!-- ./feature-box-two -->
