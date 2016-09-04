<?php
/* Template Name: Product page */
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
    <!-- angular files -->
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/products_2016/products-app/scripts/angular.js"></script>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/products_2016/products-app/scripts/angular-animate.js"></script>

    <!-- app files -->
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/products_2016/products-app/dist/app-min.js"></script>

    <!-- working files -->
<!--     <script src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/js/products-app/js/app.js"></script>-->
<!--     <script src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/js/products-app/js/mainCtrl/mainCtrl.js"></script>-->
<!--     <script src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/js/products-app/js/productsListCtrl/productsListCtrl.js"></script>-->
<!--     <script src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/js/products-app/js/common/common.services.js"></script>-->
<!--     <script src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/js/products-app/js/common/fontServices.js"></script>-->

<div class="app-wrapper" ng-app="fontPreviewer">
    <div ng-controller="FontPreviewCtrl as vm"
         class="container-fullwidth font-preview-module"
         data-ng-class="{'active' : vm.isActive }">


        <div class="products-content">
            <div class="fullwidth">

                <div>
                    <div class="">
                        <div class="fp-container">

                            <div class="blog-header">
                                <div class="fp-close">
                                    <a ng-click="vm.close()"><span>Close</span></a>
                                </div>
                                <!-- insert font name -->
                                <h1>{{vm.fontTitle}}<small>Font preview</small></h1>

                                <div class="ng-scope">

                                    <div class="fp-module">

                                        <div class="fp-input-container">

                                            <div class="form-group">
                                                <label for="fontInput">Enter your text here</label>
                                                <input id="fontInput" type="text" class="" font-name="{{vm.fontTitle}} Font Preview" data-ng-model="vm.etFont">
                                            </div><!-- end form -->

                                        </div><!-- end input container -->

                                        <div class="fp-btn-wrapper">

                                            <a href="" class="animate0"
                                               data-ng-class="{'active' : vm.selectedSize === 36}"
                                               ng-click="vm.font36()">36pt</a>

                                            <a href="" class="animate1"
                                               data-ng-class="{'active' : vm.selectedSize === 48}"
                                               ng-click="vm.font48()">48pt</a>

                                            <a href="" class="active animate2"
                                               data-ng-class="{'active' : vm.selectedSize === 72}"
                                               ng-click="vm.font72()">72pt</a>

<!--                                            <a href="" class=" animate3"-->
<!--                                               data-ng-class="{'active' : vm.selectedSize === 120}"-->
<!--                                               ng-click="vm.font120()">120pt</a>-->

                                        </div><!-- end btn-wrapper -->

                                    </div><!-- end fp-module -->

                                    <div class="">
                                        <div>
                                            <h6>{{vm.fontTitle}} regular</h6>
                                            <p class="font-settings"
                                               data-ng-class="{
                                                    honeymoon : vm.itemName == 'Honeymoon',
                                                    tuesday : vm.itemName == 'Tuesday',
                                                    hawthorne : vm.itemName == 'Hawthorne'
                                                }"
                                               ng-style="vm.myStyle">{{vm.etFont}}</p>
                                        </div>
                                    </div>

                                </div>

                            </div><!-- blog header -->

                        </div><!-- fp-container -->

                    </div><!-- end ng-controller -->

                </div><!-- end app -->

            </div> <!-- end fullwidth -->
        </div><!-- end content -->
    </div><!-- end container -->


    <div class="container product-container">
        <div id="content" class="products-content">

            <div id="main" class="fullwidth">

                <div class="featured-wrapper">

                    <div class="featured-image">

                        <a href="<?php echo $featured_gumroad_link; ?>">
                            <img class="img-responsive"
                                 src="<?php echo $thumbnail_url; ?>"
                                 alt="<?php echo $featured_image_alt; ?>"/>

                            <?php if($featured_pwyw): ?>

                                <?php if($featured_price_color == 'white'): ?>
                                    <div class="product-price-round white-price"
                                         style="background-image: url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-white.png);">
                                        $<?php echo $featured_price ?>
                                    </div>
                                <?php else: ?>
                                    <div class="product-price-round"
                                         style="background-image: url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-black.png);">
                                        $<?php echo $featured_price ?>
                                    </div>
                                <?php endif; ?>

                            <?php else: ?>
                                <?php if($featured_price_color == 'white'): ?>
                                    <div class="product-price-round white-price"
                                         style="background-image: url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-white.png);">
                                        Pay What You Want!
                                    </div>
                                <?php else: ?>
                                    <div class="product-price-round"
                                         style="background-image: url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-black.png);">
                                        Pay What You Want!
                                    </div>
                                <?php endif; ?>
                            <?php endif; ?>
                        </a>
                    </div>

                    <!-- <div class="feature-desc">
                        <h2><?php echo $featured_headline; ?></h2>
                        <p><?php echo $featured_subtext; ?></p>
                        <a class="view-btn" href="<?php echo $featured_gumroad_link; ?>"><span class="more-button">View</span></a>
                    </div> -->

                </div>

                <div class="sub-products">
                    <div class="row">
                        <div class="col-sm-6 sub-item">
                            <div class="sub-product">
                                <div class="sub-product-img">
                                    <a href="<?php echo $left_url; ?>">
                                        <img class="img-responsive"
                                             src="<?php echo $left_img; ?>"
                                             alt="<?php echo $left_img_alt; ?>"/>

                                        <?php if($left_has_price): ?>

                                            <?php if($left_tab_color == 'white'): ?>
                                                <div class="product-price-round white-price"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-white.png);">
                                                    $<?php echo $left_price; ?>
                                                </div>
                                            <?php else: ?>
                                                <div class="product-price-round"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-black.png);">
                                                    $<?php echo $left_price; ?>
                                                </div>
                                            <?php endif; ?>

                                        <?php else: ?>
                                            <?php if($left_tab_color == 'white'): ?>
                                                <div class="product-price-round white-price"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-white.png);">
                                                    Pay What You Want!
                                                </div>
                                            <?php else: ?>
                                                <div class="product-price-round"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-black.png);">
                                                    Pay What You Want!
                                                </div>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 sub-item">
                            <div class="sub-product">
                                <div class="sub-product-img">
                                    <a href="<?php echo $right_url; ?>">
                                        <img class="img-responsive"
                                             src="<?php echo $right_img; ?>"
                                             alt="<?php echo $right_alt; ?>"/>

                                        <?php if($right_has_price): ?>

                                            <?php if($right_tab_color == 'white'): ?>
                                                <div class="product-price-round white-price"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-white.png);">
                                                    $<?php echo $right_price; ?>
                                                </div>
                                            <?php else: ?>
                                                <div class="product-price-round"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-tag-black.png);">
                                                    $<?php echo $right_price; ?>
                                                </div>
                                            <?php endif; ?>

                                        <?php else: ?>
                                            <?php if($right_tab_color == 'white'): ?>
                                                <div class="product-price-round white-price"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-white.png);">
                                                    Pay What You Want!
                                                </div>
                                            <?php else: ?>
                                                <div class="product-price-round"
                                                     style="background-image:
                                                         url(<?php echo get_stylesheet_directory_uri() ?>/assets/images/products_2016/price-pwyw-black.png);">
                                                    Pay What You Want!
                                                </div>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- end main -->
        </div><!-- end content -->
    </div><!-- end container -->

    <!-- portfolio header -->
    <div class="archive-box products-page">

        <h1>All Products</h1>
        <a href="" class="licenseModal" data-toggle="modal" data-target="#licenseModal"><span class="more-button">View License Info</span></a>

    </div>

    <div class="container product-container product-list">
        <div class="products-content">
            <div class="fullwidth" ng-controller="ProductListCtrl as vm">

                <!-- portfolio items -->
                <div class="row">

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
                        $font_title = get_field('font_title');
                        $xtras = false;

                        if( $has_font_preview ){
                            $xtras = true;
                        }
                        if( strlen($youtube_link) > 0){
                            $xtras = true;
                        }
                        ?>

                        <div class="col-sm-6 col-md-4 product-item">
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
                                                <a href="" class="preview-link"
                                                   ng-click="vm.setEvent.isOpen($event);"
                                                   data-name="<?php echo $font_name; ?>"
                                                   data-title="<?php echo $font_title; ?>" >
                                                    Try it!
                                                </a>
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