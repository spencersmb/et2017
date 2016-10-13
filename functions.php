<?php
//define constants
define('ET2017_ROOT', get_stylesheet_directory_uri());

/*** Child Theme Function  ***/
function eltd_child_theme_enqueue_scripts() {
	wp_register_style( 'childstyle', get_stylesheet_directory_uri() . '/style.css'  );
	wp_enqueue_style( 'childstyle' );
}
add_action('wp_enqueue_scripts', 'eltd_child_theme_enqueue_scripts', 100);


/*** Admin Styles  ***/
function et_twenty_seventeen_load_scripts() {

	//  webpack stuff
	//	wp_register_script('et2017-js', ET2017_ROOT . '/assets/js/bundle.js', 'jquery', '', true);

	//	register font-preview bundle from webpack

	//
	wp_register_script('et2017-webpack', 'http://localhost:35729/livereload.js', '', '', true);
	wp_enqueue_script('et2017-webpack');

	wp_register_script('et2017_vendorsJs', ET2017_ROOT . '/assets/js/bundle-vendors.min.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017_vendorsJs'); // Enqueue it!


	wp_register_script('et2017-js', ET2017_ROOT . '/assets/js/bundle.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017-js'); // Enqueue it!

	wp_register_script('et2017-font-preview', ET2017_ROOT . '/assets/react/font-preview/assets/js/bundle.js', 'jquery', '', true);

	//enqueue fonts
	wp_register_style('honeymoon', get_stylesheet_directory_uri() . '/assets/css/fonts/honeymoon.css');
	wp_register_style('hawthrone', get_stylesheet_directory_uri() . '/assets/css/fonts/hawthorne.css');
	wp_register_style('tuesday', get_stylesheet_directory_uri() . '/assets/css/fonts/tuesday.css');


	/***
	 *
	 * et-2016 old product page
	 *
	 *
	 ***/
	wp_register_script('products-js', get_stylesheet_directory_uri() . '/assets/js/products_2016/products.js', 'jquery', '', true);
//	wp_register_style('product-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/products.css');

	// NEW PRODUCTS CSS LINK
	wp_register_style('product-css', get_stylesheet_directory_uri() . '/products.min.css');
//	wp_register_style('sp_style', get_stylesheet_directory_uri() . '/assets/css/products_2016/style.min.css');

	if ( is_page_template('page-product.php') ) {

		wp_enqueue_script('products-js');
//		wp_enqueue_style('sp_style');

		// ET styles added
		wp_enqueue_style('honeymoon');
		wp_enqueue_style('hawthrone');
		wp_enqueue_style('tuesday');
		//	wp_enqueue_script('bootstrap-js', get_stylesheet_directory_uri() . '/assets/js/products_2016/bootstrap.min.js', 'jquery', '', true);
		wp_enqueue_script('gumroad-js', 'https://gumroad.com/js/gumroad.js', true);
		wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/bootstrap.min.css');
		wp_enqueue_style('product-css');
	}

	/***
	 *
	 * et-2016 react test
	 *
	 *
	 ***/
	if ( is_page_template('page-product-react.php') ) {
		wp_enqueue_script('et2017-font-preview');
		wp_enqueue_script('products-js');

		// ET styles added
		wp_enqueue_style('honeymoon');
		wp_enqueue_style('hawthrone');
		wp_enqueue_style('tuesday');
		//	wp_enqueue_script('bootstrap-js', get_stylesheet_directory_uri() . '/assets/js/products_2016/bootstrap.min.js', 'jquery', '', true);
		wp_enqueue_script('gumroad-js', 'https://gumroad.com/js/gumroad.js', true);
//		wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/bootstrap.min.css');
		wp_enqueue_style('product-css');
	}

	/***
	 *
	 * et-2016 old courses page
	 *
	 *
	 ***/
	if ( is_page_template('page-courses.php') ) {
		wp_enqueue_style('sp_style');
//		wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/js/bootstrap.min.js', 'jquery', '', true);
		wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/bootstrap.min.css');
		wp_enqueue_style('product-css');
	}


}
add_action( 'wp_enqueue_scripts','et_twenty_seventeen_load_scripts' );

/*** Admin Styles  ***/
function enqueue_parent_styles_wp_admin_style() {
	wp_register_style( 'et_twenty_seventeen_admin_styles', get_stylesheet_directory_uri() . '/assets/css/wp-core/et2017-admin.css');
	wp_enqueue_style( 'et_twenty_seventeen_admin_styles' );
}
add_action( 'admin_enqueue_scripts', 'enqueue_parent_styles_wp_admin_style' );

if(!function_exists('et_twenty_seventeen_visual_composer_installed')) {
    /**
     * Function that checks if visual composer installed
     * @return bool
     */
    function et_twenty_seventeen_visual_composer_installed() {
        //is Visual Composer installed?
        if(class_exists('WPBakeryVisualComposerAbstract')) {
            return true;
        }

        return false;
    }
}

if( et_twenty_seventeen_visual_composer_installed() ){
	include  get_stylesheet_directory() . '/vc-templates/vc-blog-feature.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-single-licence.php';
}

// Register footer menus
function et_twenty_seventeen_register_my_menu() {
	register_nav_menu('footer-menu-1', esc_html__( 'Footer Menu 1', 'et_twenty_seventeen' ));
	register_nav_menu('footer-menu-2', esc_html__( 'Footer Menu 2', 'et_twenty_seventeen' ));
}
add_action( 'init', 'et_twenty_seventeen_register_my_menu' );

// Widget init
include  get_stylesheet_directory() . '/widgets/link_widget.php';
include  get_stylesheet_directory() . '/widgets/about_widget.php';
include  get_stylesheet_directory() . '/widgets/instagram-widget.php';

// Link Shortcodes init
include  get_stylesheet_directory() . '/shortcodes/react-font-preview.php';

//custom functions
function et_twenty_seventeen_generate_thumbnail($attach_id = null, $attach_url = null, $width = null, $height = null, $crop = true) {
	//is attachment id empty?

	$output = '';
	if(empty($attach_id)) {
		//get attachment id from attachment url
		$attach_id = readanddigest_get_attachment_id_from_url($attach_url);
	}

	if(!empty($attach_id) || !empty($attach_url)) {
		$img_info = readanddigest_resize_image($attach_id, $attach_url, $width, $height, $crop);
		$img_alt = !empty($attach_id) ? get_post_meta($attach_id, '_wp_attachment_image_alt', true) : '';


		if(is_array($img_info) && count($img_info)) {
			$output .= '<img src="'.$img_info['img_url'].'" alt="'.$img_alt.'" width="'.$img_info['img_width'].'" height="'.$img_info['img_height'].'" />';
		}
	}

	return $output;
}

function et_getBlogCategories(){

	$cat_object = get_the_category();

	$output = '';

	$cat_length = count($cat_object);

	$count = 0;

	foreach($cat_object as $cat){
		$count++;
		$cat_id = $cat->cat_ID;
		$cat_count = $cat->category_count;
		$cat_link = get_category_link( $cat_id );;

		// add comma to all but last element
		if( $cat_count > 1 && $count < $cat_length){
			$output .= '
                    <a href="'. esc_url($cat_link) .'" rel="category tag">'. wp_kses($cat->name, 'et_twenty_seventeen') .'</a>';
			$output .= ", ";
		}else {
			$output .= '
                    <a href="'. esc_url($cat_link) .'" rel="category tag">'. wp_kses($cat->name, 'et_twenty_seventeen') .'</a>';
		}


	}

	return $output;

}

function et_twenty_seventeen_build_blog_feature(){

	// Set cat object
	$postId = get_post_thumbnail_id( get_the_ID() );
	$url = wp_get_attachment_url( $postId );

	// Setup date
	$date = get_the_date('F j, Y');
	$archive_year  = get_the_time('Y');
	$archive_month = get_the_time('m');
	$archive_day   = get_the_time('d');

	$output = '
    <div class="et2017-blog eltdf-bnl-holder eltdf-pl-six-holder eltd-post-columns-1">
        <div class="eltdf-bnl-outer">
            <div class="eltdf-bnl-inner">
    ';

	$output .= '
        <div class="eltdf-pt-six-item eltdf-post-item eltdf-active-post-page">
        
            <div class="eltdf-pt-six-image-holder">
                
                <a itemprop="url" class="eltdf-pt-six-slide-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                    '. et_twenty_seventeen_generate_thumbnail($postId, $url, 1200, 580, true).'
                </a>
            </div>
            <!-- ./eltdf-pt-six-image-holder -->
            
            <div class="eltdf-pt-six-content-holder">
            	<div class="et2017-post-info-category">
                    ' . et_getBlogCategories() .'
                </div>
                <div class="eltdf-pt-six-title-holder">
                    <h3 class="eltdf-pt-six-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                </div>
                
                <p class="eltdf-pt-six-excerpt">
                    '.get_the_excerpt().'
                </p>
                <div class="blog-feature-btn">
                    <a href="'.get_the_permalink().'" target="_self" class="eltdf-btn eltdf-btn-medium eltdf-btn-solid et-btn et-btn-blue">
                        <span class="eltdf-btn-text">'.esc_html__('Read more', 'et_twenty_seventeen').'</span>
                    </a>
                </div>
            </div>
            <!-- ./eltdf-pt-six-content-holder -->
            
            <div class="eltdf-pt-info-section clearfix">
                
                <div class="eltdf-pt-info-section-left">
                    <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                        <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                    </div>
                </div>
                <!-- ./eltdf-pswt-info-section-left -->
                
                <div class="eltdf-pt-info-section-right">
                    <div class="eltdf-post-info-comments-holder">
                        <a class="eltdf-post-info-comments" href="'. esc_url( get_comments_link() ) .'" target="_self">'. get_comments_number_text('0 ' . esc_html__('Comments','et_twenty_seventeen'), '1 '.esc_html__('Comment','et_twenty_seventeen'), '% '.esc_html__('Comments','et_twenty_seventeen') ).'</a>
                    </div>
                </div>
                <!-- ./eltdf-pswt-info-section-right -->
                    
            </div>
            <!-- ./eltdf-pswt-info-section -->
            
        </div>
        <!-- ./eltdf-pt-six-item eltdf-post-item -->
    ';

	$output .= '
            </div><!-- ./ eltdf-bnl-inner -->
        </div><!-- ./ eltdf-bnl-outer -->
    </div><!-- ./eltdf-bnl-holder -->
    ';

	echo $output;
}

function et_twenty_seventeen_build_blog_list(){

	// Set post image Id
	$postId = get_post_thumbnail_id( get_the_ID() );
	$url = wp_get_attachment_url( $postId );

	// Setup date
	$date = get_the_date('F j, Y');
	$archive_year  = get_the_time('Y');
	$archive_month = get_the_time('m');
	$archive_day   = get_the_time('d');

	$output = '

<div class="eltdf-bnl-holder eltdf-pl-three-holder eltd-post-columns-1" >
    <div class="eltdf-bnl-outer">
        <div class="eltdf-bnl-inner">
';

	$output .= '
    <div class="eltdf-pt-three-item eltdf-post-item eltdf-active-post-page">
        <div class="eltdf-pt-three-item-inner">
            <div class="eltdf-pt-three-item-inner2">
            
                <div class="eltdf-pt-three-image-holder">
                    <a itemprop="url" class="eltdf-pt-three-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                     '. et_twenty_seventeen_generate_thumbnail($postId, $url, 350, 208, true).'
                    </a>
                </div>
                
                <div class="eltdf-pt-three-content-holder">
                    <div class="eltdf-post-info-category">
                        ' . et_getBlogCategories() .'
                    </div>
                    <h3 class="eltdf-pt-three-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                    <div class="eltdf-pt-three-excerpt">
                    '. et_twenty_seventeen_getExcerpt( 30 ) .'
                    </div>
                    
                    <div class="eltdf-pt-info-section clearfix">
                
                        <div class="eltdf-pt-info-section-left">
                            <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                                <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                            </div>
                        </div>
                        <!-- ./eltdf-pswt-info-section-left -->
                        
                    </div>
                    <!-- ./eltdf-pswt-info-section -->
                    
                </div>
                <!-- ./eltdf-pt-three-content-holder -->
                
                
            </div><!-- ./eltdf-pt-three-item-inner2 -->
        </div><!-- ./eltdf-pt-three-item-inner -->
    </div><!-- ./eltdf-pt-three-item eltdf-post-item eltdf-active-post-page -->
    ';

	$output .= '
            </div><!-- ./ eltdf-bnl-inner -->
        </div><!-- ./ eltdf-bnl-outer -->
    </div><!-- ./eltdf-bnl-holder -->
    ';

	echo $output;
}

function et_twenty_seventeen_getExcerpt($word_count){
	global $post;

	$output = "";

	//if post excerpt field is filled take that as post excerpt, else that content of the post
	$post_excerpt = $post->post_excerpt != "" ? $post->post_excerpt : strip_tags($post->post_content);



	//remove leading dots if those exists
	$clean_excerpt = strlen($post_excerpt) && strpos($post_excerpt, '...') ? strstr($post_excerpt, '...', true) : $post_excerpt;



	//if clean excerpt has text left
	if($clean_excerpt !== '') {
		//explode current excerpt to words
		$excerpt_word_array = explode (' ', $clean_excerpt);


		//cut down that array based on the number of the words option
		$excerpt_word_array = array_slice ($excerpt_word_array, 0, $word_count);


		//and finally implode words together
		$excerpt = implode (' ', $excerpt_word_array);
		//is excerpt different than empty string?
		if($excerpt !== '') {
			$output .= '<p class="eltdf-post-excerpt">'.wp_kses_post($excerpt).'</p>';

		}

	}

	return $output;
}
