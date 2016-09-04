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
	//	wp_register_script('et2017-webpack', 'http://localhost:35729/livereload.js', '', '', true);

	wp_register_script('et2017_vendorsJs', ET2017_ROOT . '/assets/js/bundle-vendors.min.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017_vendorsJs'); // Enqueue it!


	wp_register_script('et2017-js', ET2017_ROOT . '/assets/js/bundle.js', array('jquery'), '1.1', true); // Custom scripts
	wp_enqueue_script('et2017-js'); // Enqueue it!

	wp_register_script('et2017-font-preview', ET2017_ROOT . '/assets/react/font-preview/assets/js/bundle.js', 'jquery', '', true);
	wp_enqueue_script('et2017-font-preview');

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
	wp_register_style('product-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/products.css');
	wp_register_style('sp_style', get_stylesheet_directory_uri() . '/assets/css/products_2016/style.min.css');
	wp_register_style('et-2016-css', get_stylesheet_directory_uri() . '/assets/css/products_2016/et_styles.css');

	if ( is_page_template('page-product.php') ) {

		wp_enqueue_script('products-js');
		wp_enqueue_style('sp_style');

		// ET styles added
		wp_enqueue_style('et-2016-css');
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

		wp_enqueue_style('sp_style');

		// ET styles added
		wp_enqueue_style('et-2016-css');
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
//function enqueue_parent_styles_wp_admin_style() {
//	wp_register_style( 'et_twenty_seventeen_admin_styles', get_stylesheet_directory_uri() . '/assets/css/shave-admin-style.css');
//	//	wp_enqueue_style( 'et_twenty_seventeen_admin_styles' );
//}
//add_action( 'admin_enqueue_scripts', 'enqueue_parent_styles_wp_admin_style' );

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
}

// Register footer menus
function et_twenty_seventeen_register_my_menu() {
	register_nav_menu('footer-menu-1', esc_html__( 'Footer Menu 1', 'et_twenty_seventeen' ));
	register_nav_menu('footer-menu-2', esc_html__( 'Footer Menu 2', 'et_twenty_seventeen' ));
}
add_action( 'init', 'et_twenty_seventeen_register_my_menu' );

// Link Widget init
include  get_stylesheet_directory() . '/widgets/link_widget.php';
