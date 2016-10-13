<?php
/* Template Name: React Product page */

//FEATURED SECTION
//wp_get_attachment_url gets url and pass in a function to get the post thumbnail ID passing in the ID of the post.
$thumbnail_url = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
$featured_image_alt = get_post_meta( get_post_thumbnail_id( $post->ID ), '_wp_attachment_image_alt', true );
$featured_headline = get_field('feature_headline');
$featured_subtext = get_field('feature_text');
$featured_pwyw = get_field('feature_pwyw');
$featured_price = get_field('feature_price');
$featured_price_color = get_field('feature_price_color');
$featured_gumroad_link = get_field('feature_gumroad_link');

//SUB FEATURE ITEMS
//LEFT
$left_img_obj = get_field('sub_left_image');
$left_img = $left_img_obj['url'];
$left_img_alt = $left_img_obj['alt'];
$left_has_price = get_field('sub_left_pwyw');
$left_price = get_field('sub_left_price');
$left_tab_color = get_field('sub_left_color');
$left_url = get_field('sub_left_link');

//Right
$right_img_obj = get_field('sub_right_image');
$right_img = $right_img_obj['url'];
$right_img_alt = $right_img_obj['alt'];
$right_has_price = get_field('sub_right_pwyw');
$right_price = get_field('sub_right_price');
$right_tab_color = get_field('sub_right_color');
$right_url = get_field('sub_right_link');
get_header(); ?>


<div class="app-wrapper">

    <!-- portfolio header -->
    <div class="archive-box products-page">

        <h1>All Products</h1>
        <a href="" class="licenseModal" data-toggle="modal" data-target="#licenseModal"><span class="more-button">View License Info</span></a>

    </div>

    <div class="container product-container product-list">
        <div class="products-content">
            <div class="fullwidth">

                <!-- portfolio items -->
                <div class="flex-row flex-row-md">

                    <!-- custom loop for projects -->
                    <?php
                    $args = array(
                        //matches the name of the CPT we made
                        'post_type' => 'product',
                        'posts_per_page' => 30
                    );
                    //pass args to new WP_Query
                    $the_query = new WP_Query( $args );
                    ?>

                    <?php if( have_posts()): while( $the_query->have_posts() ): $the_query->the_post(); ?>

                        <?php //wp_get_attachment_url gets url and pass in a function to get the post thumbnail ID passing in the ID of the post.
                        $featured_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
                        $gumroad_link = get_field('gumroad_link');
                        $youtube_link = get_field('youtube_link');
                        $price = get_field('price');
                        $has_extended_price = get_field('has_extended_price');
                        $extended_price = get_field('extended_price');
                        $extended_url = get_field('extended_license_url');
                        $has_font_preview = get_field('has_font_preview');
                        $font_name = get_field('font_name');
                        $font_styles = get_field('font_styles');
                        $xtras = false;

                        $styles_string = "";


                        //check if font style
                        //convert styles array to string
                        if($font_styles){
                            foreach ( $font_styles as $key => $value){
                                $styles_string .= $value['style'];

                                if($key == 0 && count($font_styles) > 1){
                                    $styles_string .= ", ";
                                }
                            }
                        }


                        if( $has_font_preview ){
                            $xtras = true;
                        }
                        if( strlen($youtube_link) > 0){
                            $xtras = true;
                        }



                        ?>

                        <div class="flex-xs flex-sm-4 flex-md-6 product-item">
                            <div class="product-content">
                                <!-- echo out our own url for the image -->
                                <div class="product-img">

                                    <a href="<?php echo $gumroad_link; ?>">
                                        <div class="product-hover">
                                            <div class="action"><span class="more-button">View</span></div>
                                            <div class="overlay"></div>
                                        </div>
                                        <img class="img-responsive" src="<?php echo $featured_image; ?>" alt="<?php echo $product['featured_image_src']['alt']; ?>"/>
                                    </a>
                                </div>
                                <div class="product-details">
                                    <?php if($xtras): ?>

                                        <?php if( strlen($youtube_link) > 0 ) : ?>

                                            <div class="youtube">
                                                <a class="youtube-link" data-youtube="<?php echo $youtube_link; ?>" data-toggle="modal" data-target="#myModal">
                                                    <img class="img-responsive" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/products_2016/youtube.jpg" alt="Youtube"/>
                                                </a>
                                            </div>

                                        <?php endif; ?>

                                        <?php if( $has_font_preview) : ?>

                                            <div class="preview-icon">
                                                <a href="" class="preview-link font-preview"
                                                   data-name="<?php echo $font_name; ?>"
                                                   data-styles="<?php echo $styles_string ?>"
                                                >Try it!</a>
                                            </div>

                                        <?php endif; ?>

                                    <?php endif; ?>

                                    <h2><?php the_title(); ?></h2>

                                    <p class="product-price"><?php echo $price; ?></p>

                                    <div class="products-cta">
                                        <div class="license-title">
                                            License Type:
                                        </div>
                                        <?php if( $has_extended_price == 1 ): ?>
                                            <div class="select selected-1" data-type="select">
                                                <ul>
                                                    <li class="stnd" data-link="<?php echo $gumroad_link; ?>?wanted=true&amp;locale=false" data-price="<?php echo $price; ?>" >Standard</li>
                                                    <li class="ext" data-link="<?php echo $extended_url; ?>?wanted=true&amp;locale=false" data-price="<?php echo $extended_price; ?>">Extended</li>
                                                </ul>
                                            </div>
                                        <?php else: ?>
                                            <div class="select selected-1 single">
                                                <ul class="single">
                                                    <li class="stnd" data-link="<?php echo $gumroad_link; ?>?wanted=true&amp;locale=false" data-price="<?php echo $price; ?>" >Standard</li>
                                                </ul>
                                            </div>
                                        <?php endif; ?>
                                        <div class="add-to-cart">
                                            <a href="">Buy Now</a>
                                            <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
                                                <path stroke-dasharray="19.79 19.79" stroke-dashoffset="19.79" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11" style="stroke-dashoffset: 19.79px;"></path>
                                            </svg>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    <?php endwhile; endif; ?>
                </div> <!-- end row -->

            </div> <!-- end main -->
        </div><!-- end content -->
    </div><!-- end container -->

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="close-modal" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe id="youtube-player" class="you-tube-pop embed-responsive-item" src="" allowfullscreen></iframe>
                    </div>
                </div>

            </div>
        </div>
    </div>

<?php $output = "";

$output .= '
    <!-- Modal -->
    <div class="modal fade" id="licenseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs nav-justified" role="tablist">
                        <li role="presentation" class="active"><a href="#standard" aria-controls="standard" role="tab" data-toggle="tab">Standard</a></li>
                        <li role="presentation"><a href="#extended" aria-controls="extended" role="tab" data-toggle="tab">Extended</a></li>

                    </ul>';
global $wp_query;
$postid = $wp_query->post->ID;
$standard = get_post_meta($postid, 'standard_content', true);
$extended = get_post_meta($postid, 'extended', true);
$std = wpautop($standard);
$ext = wpautop($extended);
wp_reset_query();
$output .= '
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade active in" id="standard">
                            '. $std .'
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="extended">
                            '. $ext .'
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    ';
echo $output;
?>
</div>
<?php get_footer(); ?>