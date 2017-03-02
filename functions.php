<?php
//define constants
define('ET2017_ROOT', get_stylesheet_directory_uri());
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

	//Production asset
	wp_register_style( 'et2017-styles', asset_path('styles/main.css')  );
	wp_enqueue_style( 'et2017-styles' );

}
add_action('wp_enqueue_scripts', 'eltd_child_theme_enqueue_scripts', 100);

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

	//GSAP
	wp_register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js', '', '1.2.3', true);
//        wp_register_script('gsap', get_template_directory_uri() . '/node_modules/gsap/src/minified/TweenMax.min.js', '', '1.2.3', true);
	wp_enqueue_script('gsap'); // Enqueue it!

	// et-2016 theme Vendor-JS
	wp_register_script('et2017_vendorsJs', ET2017_ROOT . '/assets/js/bundle-vendors.min.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017_vendorsJs'); // Enqueue it!

	// Main JS file
	wp_register_script('et2017-js', asset_path('scripts/main.js'), array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017-js'); // Enqueue it!

	// Convert Kit pop-up script
	wp_register_script('et2017-convert-kit-js', 'https://assets.convertkit.com/assets/CKJS4.js?v=21', array(), '21', true); // Custom scripts
	wp_enqueue_script('et2017-convert-kit-js'); // Enqueue it!


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
	wp_register_style('et-fonts', get_stylesheet_directory_uri() . '/assets/fonts/et-custom-fonts.css');
//	wp_register_style('honeymoon', get_stylesheet_directory_uri() . '/assets/css/fonts/honeymoon.css');
//	wp_register_style('hawthrone', get_stylesheet_directory_uri() . '/assets/css/fonts/hawthorne.css');
//	wp_register_style('tuesday', get_stylesheet_directory_uri() . '/assets/css/fonts/tuesday.css');


	/***
	 *
	 * et-2016 react test
	 *
	 *
	 ***/
	if ( is_page_template('page-product-react.php') || is_page('products') ) {

		//react app
		wp_enqueue_script('et2017-font-preview');

		//gumroad
		wp_enqueue_script('gumroad-js', 'https://gumroad.com/js/gumroad.js', '', '', true);

		//ET Custom Fonts
		wp_enqueue_style('et-fonts');
	}

	/***
	 *
	 * add essential grid JS only on resource-page if we deque it in de_que_parent_styles()
	 *
	 *
	 ***/
	if(is_page('resource-library')){
//		wp_enqueue_script('tp-tools', WP_PLUGIN_URL . '/essential-grid/public/assets/js/jquery.themepunch.tools.min.js', 'jquery', null ,true);
	}

}
add_action( 'wp_enqueue_scripts','et_twenty_seventeen_load_scripts', 100 );

/*** Admin Styles  ***/
function enqueue_parent_styles_wp_admin_style() {
	wp_register_style( 'et_twenty_seventeen_admin_styles', get_stylesheet_directory_uri() . '/assets/admin/css/et2017-admin.css');
	wp_enqueue_style( 'et_twenty_seventeen_admin_styles' );
}
add_action( 'admin_enqueue_scripts', 'enqueue_parent_styles_wp_admin_style' );

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
include  get_stylesheet_directory() . '/widgets/nav-search.php';
include  get_stylesheet_directory().'/framework/modules/widgets/custom-nav/et2017_nav_custom.php';
include  get_stylesheet_directory().'/includes/nav-mobile/mobile-navigation-walker.php';
include  get_stylesheet_directory().'/framework/modules/widgets/search-form/search-form.php';

// Link Shortcodes init
include  get_stylesheet_directory() . '/shortcodes/react-font-preview.php';
include  get_stylesheet_directory() . '/framework/modules/blog/shortcodes/post-layout-one/post-layout-one.php';

//HELPERS
if ( file_exists(get_stylesheet_directory() . '/inc/utils/helpers.php') ) {
	require_once( get_stylesheet_directory() . '/inc/utils/helpers.php' );
}

//REST ENDPOINTS
if ( file_exists(get_stylesheet_directory() . '/inc/rest/restapi.php') ) {
	require_once( get_stylesheet_directory() . '/inc/rest/restapi.php' );
}

//SAGE ASSET CHECK
if ( file_exists(get_stylesheet_directory() . '/inc/sage/assets.php') ) {
	require_once( get_stylesheet_directory() . '/inc/sage/assets.php' );
}

//VISUAL COMPOSER CHECK
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

//ADD Custom Excerpts to Pages
add_action( 'init', 'my_add_excerpts_to_pages' );
function my_add_excerpts_to_pages() {
	add_post_type_support( 'page', 'excerpt' );
}

//Set posts per page on Search page
add_action( 'pre_get_posts',  'set_posts_per_page'  );
function set_posts_per_page( $query ) {

	global $wp_the_query;

	if ( ( ! is_admin() ) && ( $query === $wp_the_query ) && ( $query->is_search() ) ) {
		$query->set( 'posts_per_page', 12 );
	}
	elseif ( ( ! is_admin() ) && ( $query === $wp_the_query ) && ( $query->is_archive() ) ) {
		$query->set( 'posts_per_page', 12 );
	}
	// Etc..

	return $query;
}

//Exclude pages from search
function SearchFilter($query) {
	$frontpage_id = get_option( 'page_on_front' );
	$blog_id = get_option( 'page_for_posts' );



	$exclude = array(
		$frontpage_id,
		$blog_id,
		'1837', // one_more_thing
		'5575', // updated pref
		'1705', // success
		'3555', // success-2
		'5208', // unsubscribe
		'7510' // Freebie is on its way
	);

	if ($query->is_search) {
		$query->set('post__not_in', $exclude);
}
	return $query;
}
add_filter('pre_get_posts','SearchFilter');

// 1. Add global ACF path for parent and child themes
//add_filter('acf/settings/load_json', function($paths) {
//
//	$paths = array(get_stylesheet_directory() . '/acf-json');
//
//	return $paths;
//});

// 3. Hide ACF field group menu item
//add_filter('acf/settings/show_admin', '__return_false');

//Edit Design with this for the pass word protected post



/***
 *
 * Resource Library Filters
 *
 *
 ***/
function resource_lib_password_form() {

	if(is_page('resource-library')){

		return preg_replace('#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', build_resource_library_form());

	}

}
add_filter( 'the_password_form', 'resource_lib_password_form' );

function build_resource_library_form(){

	global $post;

	$label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
	
	$atts = array(
		'label' => $label
	);

	$output = readanddigest_get_list_shortcode_module_template_part('et-resource-library-form', 'templates', '', $atts);

	$spencer = preg_replace('#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $output);

	return $spencer;

}

//add_filter( string $tag, callable $function_to_add, int $priority = 10, int $accepted_args = 1 )
// Add the filter to manage the p tags
add_filter('the_content', 'remove_empty_p', 20, 1);

function remove_empty_p($content){

	if(is_page('resource-library')){
		$content = preg_replace("/<br[^>]+\>/i", "", $content);
		$content = force_balance_tags( $content );
		$content = preg_replace( '~\s?<p>(\s|&nbsp;)+</p>\s?~', '', $content );
	}

	return $content;
}
