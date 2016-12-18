<?php
//define constants
define('ET2017_ROOT', get_stylesheet_directory_uri());

/*** Child Theme Function  ***/
function eltd_child_theme_enqueue_scripts() {

	if (!is_admin()){
		jquery_mumbo_jumbo();
		blog_scripts();
	}

	de_que_parent_styles();

	wp_register_style( 'parentstyle-vendors', get_stylesheet_directory_uri() . '/vendor.min.css'  );
	wp_enqueue_style( 'parentstyle-vendors' );

	wp_register_style( 'childstyle', get_stylesheet_directory_uri() . '/style.css'  );
	wp_enqueue_style( 'childstyle' );

}
add_action('wp_enqueue_scripts', 'eltd_child_theme_enqueue_scripts', 100);

if(!function_exists('et2017_get_global_variables')) {
	/**
	 * Function that generates global variables and put them in array so they could be used in the theme
	 */
	function et2017_get_global_variables() {

		$global_variables = array();
		$element_appear_amount = -150;

		$global_variables['eltdfAddForAdminBar'] = is_admin_bar_showing() ? 32 : 0;
		$global_variables['eltdfElementAppearAmount'] = readanddigest_options()->getOptionValue('element_appear_amount') !== '' ? readanddigest_options()->getOptionValue('element_appear_amount') : $element_appear_amount;
		$global_variables['eltdfFinishedMessage'] = esc_html__('No more posts', 'readanddigest');
		$global_variables['eltdfMessage'] = esc_html__('Loading new posts...', 'readanddigest');
		$global_variables['eltdfAjaxUrl'] = admin_url('admin-ajax.php');

		$global_variables = apply_filters('readanddigest_js_global_variables', $global_variables);

		wp_localize_script('et2017_vendorsJs', 'eltdfGlobalVars', array(
			'vars' => $global_variables
		));

	}

	add_action('wp_enqueue_scripts', 'et2017_get_global_variables', 101);
}
if(!function_exists('et2017_per_page_js_variables')) {
	function et2017_per_page_js_variables() {
		$per_page_js_vars = apply_filters('readanddigest_per_page_js_vars', array());

		wp_localize_script('et2017_vendorsJs', 'eltdfPerPageVars', array(
			'vars' => $per_page_js_vars
		));
	}

	add_action('wp_enqueue_scripts', 'et2017_per_page_js_variables', 101);
}

/*** Theme JS  ***/
function et_twenty_seventeen_load_scripts() {


	//  webpack stuff - not sure why this is here
	//	wp_register_script('et2017-js', ET2017_ROOT . '/assets/js/bundle.js', 'jquery', '', true);

	//	register font-preview bundle from webpack
	//	wp_register_script('et2017-webpack', 'http://localhost:35729/livereload.js', '', '', true);
	//	wp_enqueue_script('et2017-webpack');
	
	//setup font awesome and remove font awesome from revslider
	wp_register_script('et2017-fontawesome', 'https://use.fontawesome.com/c1013b11d0.js', '', '', true);
	wp_enqueue_script('et2017-fontawesome');

	// et-2016 theme Vendor-JS
	wp_register_script('et2017_vendorsJs', ET2017_ROOT . '/assets/js/bundle-vendors.min.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017_vendorsJs'); // Enqueue it!


	// et-2016 theme JS
	wp_register_script('et2017-js', ET2017_ROOT . '/assets/js/bundle.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017-js'); // Enqueue it!
	
	//localize for products page
	wp_localize_script(
		'et2017-js',
		'et_products',
		array(
			'url' => site_url()
		)
	);

	// font-preview app
	wp_register_script('et2017-font-preview', ET2017_ROOT . '/assets/react/font-preview/assets/js/bundle.js', 'jquery', '', true);

	//enqueue custom fonts
	wp_register_style('et-fonts', get_stylesheet_directory_uri() . '/assets/css/fonts/et-custom-fonts.css');
//	wp_register_style('honeymoon', get_stylesheet_directory_uri() . '/assets/css/fonts/honeymoon.css');
//	wp_register_style('hawthrone', get_stylesheet_directory_uri() . '/assets/css/fonts/hawthorne.css');
//	wp_register_style('tuesday', get_stylesheet_directory_uri() . '/assets/css/fonts/tuesday.css');


	/***
	 *
	 * et-2016 product page css + js
	 *
	 *
	 ***/
	wp_register_script('products-js', get_stylesheet_directory_uri() . '/assets/js/products_2016/products.js', 'jquery', '', true);
	wp_register_style('product-css', get_stylesheet_directory_uri() . '/products.min.css');



	/***
	 *
	 * et-2016 old product page
	 *
	 *
	 ***/

	//	wp_register_style('product-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/products.css');
	//	wp_register_style('sp_style', get_stylesheet_directory_uri() . '/assets/css/products_2016/style.min.css');

	//	if ( is_page_template('page-product.php') ) {
	//
	//		wp_enqueue_script('products-js');
	//		// wp_enqueue_style('sp_style');
	//
	//		// ET styles added
	//		wp_enqueue_style('honeymoon');
	//		wp_enqueue_style('hawthrone');
	//		wp_enqueue_style('tuesday');
	//		//	wp_enqueue_script('bootstrap-js', get_stylesheet_directory_uri() . '/assets/js/products_2016/bootstrap.min.js', 'jquery', '', true);
	//		wp_enqueue_script('gumroad-js', 'https://gumroad.com/js/gumroad.js', true);
	//		 wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/bootstrap.min.css');
	//		wp_enqueue_style('product-css');
	//	}

	/***
	 *
	 * et-2016 react test
	 *
	 *
	 ***/
	if ( is_page_template('page-product-react.php') || is_page('products') ) {

		//react app
		wp_enqueue_script('et2017-font-preview');

		// product js
//		wp_enqueue_script('products-js');

		//gumroad
		wp_enqueue_script('gumroad-js', 'https://gumroad.com/js/gumroad.js', '', '', true);

		// ET styles added
//		wp_enqueue_style('product-css');

		//ET Custom Fonts
		wp_enqueue_style('et-fonts');
	}

	/***
	 *
	 * et-2016 courses page
	 *
	 *
	 ***/
	if ( is_page_template('page-courses.php') ) {

		// old courses page styling
		// wp_enqueue_style('sp_style');
		// wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/js/bootstrap.min.js', 'jquery', '', true);
		// wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/bootstrap.min.css');

		// et-2016 new styling
//		wp_enqueue_style('product-css');

	}

	/***
	 *
	 * add essential grid JS only on resource-page
	 *
	 *
	 ***/
	if(is_page('resource-library')){
		wp_enqueue_script('tp-tools', WP_PLUGIN_URL . '/essential-grid/public/assets/js/jquery.themepunch.tools.min.js', 'jquery', null ,true);
	}

}
add_action( 'wp_enqueue_scripts','et_twenty_seventeen_load_scripts', 100 );

function jquery_mumbo_jumbo()
{
	wp_deregister_script('jquery');
	wp_deregister_script('jquery-migrate');
//	wp_register_script('jquery', "/wp-includes/js/jquery/jquery.js", false, '1.12', true);
	wp_register_script('jquery', 'https://code.jquery.com/jquery-1.12.4.min.js"', false, '1.12', true);
	wp_register_script('jquery-migrate', "/wp-includes/js/jquery/jquery-migrate.min.js", 'jquery', '', true);

	// enqueue creates the order
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-migrate');
}

function de_que_parent_styles(){

	//wp-core
	wp_deregister_style('wp-mediaelement');


	//deregister parent theme style sheet
	wp_deregister_style('readanddigest_default_style');
	wp_deregister_style('readanddigest_modules');
	wp_deregister_style('font-awesome');
	wp_deregister_style('font-elegant');
	wp_deregister_style('ion-icons');
	wp_deregister_style('linea-icons');
	wp_deregister_style('readanddigest_modules_responsive');
	wp_deregister_style('js_composer_front');
	wp_deregister_style('social_warfare');
	wp_deregister_style('readanddigest_google_fonts'); // deque when js is setup
//	wp_deregister_style('readanddigest_style_dynamic'); // once theme settings are done - deque this manually

	//access pinterest plugin
	wp_deregister_style('apsp-font-opensans');
	wp_deregister_style('apsp-frontend-css');

	//contact7 plugin css
	wp_deregister_style('contact-form-7');
	
	//jquery pinit - client css
	wp_deregister_style('jpibfi-style');
	wp_dequeue_script('jpibfi-script');
	add_JPIBFI_scripts();

	//deque js from parent theme
	wp_deregister_script('readanddigest_third_party');
	wp_deregister_script('readanddigest_modules');
	wp_deregister_script('eltdf-like'); // add like var - find them in the parent theme
	wp_deregister_script('wpb_composer_front_js');

	//	wp_deregister_script('tp-tools');// remove revslider tools js
}

function blog_scripts(){
	//only deque these if on the blog index and blog detail page
	if(!is_home() && !is_single()){
		wp_deregister_style('wp-mediaelement');
		wp_dequeue_script( 'wp-mediaelement');
		wp_deregister_script('social_warfare_script');
		wp_dequeue_script("comment-reply");
		wp_deregister_script( 'wp-embed' );

		// access-pinterest plugin
		wp_dequeue_script( 'masionary-js');
		wp_dequeue_script( 'frontend-js');
		wp_dequeue_script( 'jquery-masonry');
		wp_dequeue_script( 'pinit-js');

		// pinit plugin
		wp_dequeue_script( 'jquery-pin-it-button-script');

	} else if( is_home() ){
		wp_deregister_style('wp-mediaelement');
		wp_dequeue_script( 'wp-mediaelement');
		wp_dequeue_script("comment-reply");
		wp_deregister_script( 'wp-embed' );
	}
}

function home_page_scripts(){

//	if(is_front_page()){
//		wp_dequeue_script( 'masionary-js');
//		wp_dequeue_script( 'frontend-js');
//		wp_dequeue_script( 'jquery-masonry');
//	}
}

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
			$output .= '<img class="img-responsive" src="'.$img_info['img_url'].'" alt="'.$img_alt.'" width="'.$img_info['img_width'].'" height="'.$img_info['img_height'].'" />';
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

function et_getBlogCategory_text(){

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
			$output .=
                    $cat->name;
			$output .= ", ";
		}else {
			$output .= $cat->name;
		}


	}

	return $output;

}

function et_twenty_seventeen_build_blog_feature(){

	// Set cat object
	$postId = get_post_thumbnail_id( get_the_ID() );
	$url = wp_get_attachment_url( $postId );

	var_dump($postId);
	var_dump($url);

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
                    '.get_the_content().'
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

function et_twenty_seventeen_generate_background_img($attach_id = null, $attach_url = null, $width = null, $height = null, $crop = true) {
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
			$output .= $img_info['img_url'];
		}
	}

	return $output;
}

function et_getAllCategories(){
	$output = array();

	$categories = get_categories( array(
		'orderby' => 'name',
		'order'   => 'ASC'
	) );

	foreach( $categories as $category ) {

		array_push($output, $category->name);

	}

	return $output;
}

function getImgSrcSet( $attach_id, $width, $height, $size ){

	$output = '';

	$img_src = wp_get_attachment_image_url( $attach_id, $size );
	$img_src_large = wp_get_attachment_image_url( $attach_id, 'large' );
	$img_src_small = wp_get_attachment_image_url( $attach_id, 'thumbnail' );
	$img_srcset = wp_get_attachment_image_srcset( $attach_id, $size );
	$img_alt = get_post_meta( $attach_id, '_wp_attachment_image_alt', 'true');


	$output .= '
        <img width="'.$width.'" 
             height="'.$height.'"
             class="attachment-full size-full wp-post-image"
             src="'.esc_url( $img_src ) .'"
             srcset="'. esc_attr( $img_srcset ).'"
             sizes="(max-width: '.$width.'px) 100vw, '.$width.'px" draggable="false" 
             alt="'. esc_attr($img_alt).'">
        ';

	return $output;


}

function et_getAllPages($type){
	// return assoc array with Name and post ID
	global $post;

	$args = array(
		'post_type' => $type,
		'posts_per_page' => -1,
	);

	$listings = new WP_Query($args);

	$page_array = array();
	$string_names = '';
	if ( $listings->have_posts() ) {

		while ( $listings->have_posts() ) {

			$listings->the_post();

			$page_title = html_entity_decode(get_the_title($post->ID));
			$page_array[$page_title] = $post->ID;

		}
	}

	wp_reset_postdata();
	return $page_array;
}

function et_array_to_string($array){
	
	$output = '';
	$curr = 0;
	if( is_array($array) ){
		foreach ( $array as $key => $value){

			$output .= $value['style'];
			$curr = $curr + 1;
			
			if(count($array) > 1 && $curr != count($array)){
				$output .= ", ";
			}

		}

		return $output;
	} else {
		echo 'sorry thats not an array';
	}
}

function et_get_category_link($slug){
	
	$category_id = get_cat_ID($slug);
	
	return get_category_link($category_id);
}

function et_get_courses_link(){

	$pageObject = get_page_by_path( 'courses' );

	$pageId = $pageObject->ID;

	return get_page_link($pageId);
}

if(!function_exists('convert_string_comma_to_array')){
	function convert_string_comma_to_array($string){
		$array = explode(",", $string);
		return $array;
	}
}
if(!function_exists('readanddigest_get_sort_array')) {
	/**
	 * Function that returns array of sort properties for list shortcode formatted for Visual Composer
	 *
	 * @return array of sort properties for formatted for Visual Composer
	 *
	 */
	function readanddigest_get_sort_array() {
		$sort_array = array(
			""	=> "",
			"Latest" => "latest",
			"Random" => "random",
			"Random Posts Today" => "random_today",
			"Random in Last 7 Days" => "random_seven_days",
			"Most Commented" => "comments",
			"Title" => "title",
			"Popular" => "popular",
			"Featured Posts First" => "featured_first"
		);
		return $sort_array;
	}
}
if(!function_exists('readanddigest_get_list_shortcode_module_template_part')) {
	/**
	 * Loads module template part.
	 *
	 * @param string $template name of the template to load
	 * @param string $module name of the module folder
	 * @param string $slug
	 * @param array $params array of parameters to pass to template
	 * @return html
	 * @see readanddigest_get_template_part()
	 */
	function readanddigest_get_list_shortcode_module_template_part($template, $module, $slug = '', $params = array(), $content = null) {

		//HTML Content from template
		$html = '';
		$template_path = 'framework/modules/blog/shortcodes/'.$module;

		$temp = $template_path.'/'.$template;

		if(is_array($params) && count($params)) {
			extract($params);
		}

		$templates = array();

		if($temp !== '') {
			if($slug !== '') {
				$templates[] = "{$temp}-{$slug}.php";
			}

			$templates[] = $temp.'.php';
		}
		$located = locate_template($templates);
		if($located) {
			ob_start();
			include($located);
			$html = ob_get_clean();
		}

		return $html;
	}
}
if(!function_exists('et_check_border')){
	/*
     * $param = 'string'
     *
     */
	function et_check_border($param){

		$css_name = '';

		if($param == 'top'){
			return $css_name = 'divider-top';
		} else if($param == 'bottom'){
			return $css_name = 'divider-bottom';
		} else if($param == 'both'){
			return $css_name = 'divider-bottom-top';
		} else{
			return;
		}
	}
}
if (!function_exists('et2017_modify_read_more_link')) {

	/**
	 * Function that modifies read more link output.
	 * Hooks to the_content_more_link
	 * @return string modified output
	 */
	function et2017_modify_read_more_link() {
		$link = '<div class="eltdf-more-link-container et2017-more-link">';
		$link .= readanddigest_get_button_html(array(
			'link' => get_permalink().'#more-'.get_the_ID(),
			'text' => esc_html__('Continue reading', 'readanddigest')
		));

		$link .= '</div>';

		return $link;
	}

	add_filter( 'the_content_more_link', 'et2017_modify_read_more_link', 100);
}


if( et_twenty_seventeen_visual_composer_installed() ){
	include  get_stylesheet_directory() . '/vc-templates/vc-blog-feature.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-single-licence.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-et-slider.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-feature-box-one.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-feature-box-two.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-box-list.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-header-sm.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-box-intro.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-grid-one.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-link-card.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-box-gallery-one.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-bio-card.php';
	include  get_stylesheet_directory() . '/vc-templates/vc-2col-list.php';
}



class et_register_endpoints{

	function __construct()
	{
		// this gets called automatically when a class gets created
		add_action('rest_api_init', array($this, 'register_routes' ) );
	}

	function et_license_callback( WP_REST_Request $request ){

		$url = get_site_url();
		$postid = url_to_postid( $url . '/products' );
		$standard_data = get_field('standard_content', $postid);
		$extended_data = get_field('extended', $postid);

		$standard_string = str_replace(array("\r\n", "\r", "\n"), "", $standard_data);
		$extended_string = str_replace(array("\r\n", "\r", "\n"), "", $extended_data);

		$test = array(
			'standard' => wp_kses_post($standard_string),
			'extended' => wp_kses_post($extended_string)
		);

		return $test;
	}

	public function register_routes(){
		register_rest_route(
			'product-licenses/v1',
			'/license/',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'et_license_callback' )
			)
		);

	}

	function init(){

	}

}

global $et_rest_endpoints;
$et_rest_endpoints = new et_register_endpoints();

global $allowed_html;
$allowed_html = array(
	'a' => array(
		'href' => array(),
		'title' => array()
	),
	'br' => array(),
	'p' => array(),
	'em' => array(),
	'strong' => array(),
);

//put emojies in the footer
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
//	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
//	remove_action( 'wp_print_styles', 'print_emoji_styles' );
//	remove_action( 'admin_print_styles', 'print_emoji_styles' );
//	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
//	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
//	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
//	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
	add_action( 'wp_footer', 'print_emoji_detection_script' );
}
add_action( 'init', 'disable_emojis' );


function add_JPIBFI_scripts(){

	if(class_exists(JPIBFI_Client)){

		$current_page = get_post_type( get_the_ID() );

		$show_on_str = get_option( 'jpibfi_selection_options' )['show_on'];

		$replace_characters = ['[', ']'];
		$show_on_str = str_replace($replace_characters,'', $show_on_str);

		$show_on_array = explode(',', $show_on_str);
//		var_dump(in_array($current_page, $show_on_array));

		if(!in_array($current_page, $show_on_array)){
			wp_enqueue_script('jpibfi-script', WP_PLUGIN_URL . '/jquery-pin-it-button-for-images/js/jpibfi.client.js', 'jquery', null ,true);
		}

	}

}
