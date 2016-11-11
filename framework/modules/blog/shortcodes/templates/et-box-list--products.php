<?php

    $image_id = get_post_thumbnail_id( get_the_ID() );
    $featured_image = wp_get_attachment_url( get_post_thumbnail_id( get_the_ID() ) );
    $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);
    $gumroad_link = get_field('gumroad_link');
    $price = get_field('price');
    
    $youtube_link = get_field('youtube_link');
    
    $has_extended_price = get_field('has_extended_price');
    $extended_price = get_field('extended_price');
    $extended_url = get_field('extended_license_url');
    
    $has_font_preview = get_field('has_font_preview');
    $font_name = get_field('font_name');
    $font_styles = get_field('font_styles');
    $styles_string = "";

    if($font_styles){
        $styles_string = et_array_to_string($font_styles);
    }

?>

<div class="flex-xs flex-sm-4 flex-md-6 et-box-item">
    <div class="et-box-item__inner">

        <div class="et-box-item__content products">
                <div class="et-box-item__img">

                    <a href="<?php echo esc_url($gumroad_link); ?>" target="_blank">
                        <div class="et-box-item__play">
                            <div class="et-box-item__view">
                                <span class="et-btn-round"><?php echo esc_html__('View', 'et-twenty-seventeen'); ?></span>
                            </div>
                            <div class="overlay"></div>
                        </div>
                        <img class="img-responsive" src="<?php echo esc_url($featured_image); ?>" alt="<?php echo esc_attr($image_alt); ?>"/>
                    </a>

                </div><!-- ./image -->

                <div class="et-box-item__description">

                    <?php if( strlen($youtube_link) > 0 ) : ?>

                        <div class="et-box-item__youtube">

                            <a class="youtube-link" data-youtube="<?php echo esc_url($youtube_link); ?>" data-toggle="modal" data-target="#et_youtubeModal">
                                <img class="img-responsive" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/products_2016/youtube.jpg" alt="Youtube"/>
                            </a>

                        </div>

                    <?php endif; ?>

                    <?php if( $has_font_preview) : ?>

                        <div class="et-font-preview">
                            <a href="" class="et-font-preview__link et-btn-round"
                               data-name="<?php echo esc_attr($font_name); ?>"
                               data-styles="<?php echo esc_attr($styles_string); ?>"
                            ><?php echo wp_kses('Try it!', 'et-twenty-seventeen'); ?></a>
                        </div>

                    <?php endif; ?>

                    <h2><?php the_title(); ?></h2>

                    <span class="product-price"><?php echo $price; ?></span>

                    <div class="products-cta">
                        <div class="license-title">
                            License Type:
                        </div>
                        <?php if( $has_extended_price == 1 ): ?>
                        <div class="select selected-1" data-type="select">
                            <ul>
                                <li class="stnd" data-link="<?php echo esc_url($gumroad_link); ?>?wanted=true&amp;locale=false" data-price="<?php echo esc_attr($price); ?>" ><?php echo esc_html__('Standard', 'et-twenty-seventeen'); ?></li>
                                <li class="ext" data-link="<?php echo esc_url($extended_url); ?>?wanted=true&amp;locale=false" data-price="<?php echo esc_attr($extended_price); ?>"><?php echo esc_html__('Extended', 'et-twenty-seventeen'); ?></li>
                            </ul>
                        </div>
                        <?php else: ?>
                        <div class="select selected-1 single">
                            <ul class="single">
                                <li class="stnd" data-link="<?php echo esc_url($gumroad_link); ?>?wanted=true&amp;locale=false" data-price="<?php echo esc_attr($price); ?>" ><?php echo esc_html__('Standard', 'et-twenty-seventeen'); ?></li>
                            </ul>
                        </div>
                        <?php endif; ?>
                        <div class="add-to-cart">
                            <a href="">
                                <span><?php echo esc_html__('Buy Now', 'et-twenty-seventeen'); ?></span>
                            </a>
                            <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                                <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11" style="stroke-dashoffset: 19.79px;"></path>
                            </svg>

                        </div>

                    </div>

                </div>
        </div>

    </div>

</div>