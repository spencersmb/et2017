<?php
/**
 * REACT Font Previewer
 *
 *
 * Short-code
 * [livetype name="Hawthorne" title="Script" style-1="Regular"]
 */

// enqueue css onto page
function et_twenty_seventeen_load_font($name){
    wp_register_style( $name .'-css' , ET2017_ROOT . '/assets/css/fonts/'. $name .'.css', '', 'all' );
    wp_enqueue_style($name .'-css');
}

function et_twenty_seventeen_register_shortcodes(){

    add_shortcode('font_preview', 'et_twenty_seventeen_font_preview' );
}
add_action('init', 'et_twenty_seventeen_register_shortcodes');

function et_twenty_seventeen_font_preview( $args, $content="" ){

    // define variables
    $font_name = ''; // matching .css file name
    $file_name = ''; // matching .css file name
    $font_styles =''; // Full name of font
    $output = '';
    $style = array();
    $stringtocheck = 'style';


    //check for $args
    if( isset($args['name']) ): $font_name = $args['name']; endif;
    if( isset($args['file_name']) ): $file_name = $args['file_name']; endif;
    if( isset($args['styles']) ): $font_styles = $args['styles']; endif;

    // enqueue react scripts
    wp_register_script('et2017-font-preview', ET2017_ROOT . '/assets/react/font-preview/assets/js/bundle.js', 'jquery', '', true);
    wp_enqueue_script('et2017-font-preview');
    
    // enqueue font
    if(strlen($file_name)){
        et_twenty_seventeen_load_font($file_name);
    }

    $output .= '
    
        <div
            id="app"
            data-name="'. esc_attr($font_name) .'"
            data-placeholder="'. esc_attr($font_name) .' Font preview"
            data-styles="'. esc_attr($font_styles) .'">
        </div>
    ';

    return $output;
}