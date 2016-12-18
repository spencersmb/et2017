<?php

function et_twenty_seventeen_2col_list_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "2 Col List", "et_twenty_seventeen" ),
        "base"      => "et_2col_list",
        'icon'        => 'et_2col_list_icon',
        "as_parent" => array('only' => 'et_2col_list_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Single box with image + text', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'et_twenty_seventeen' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'et_twenty_seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ));

    vc_map( array(
        "name"      => esc_html__( "List Item", "et_twenty_seventeen" ),
        "base"      => "et_2col_list_item",
        'icon'        => 'et_2col_list_item_icon',
        "as_child" => array('only' => 'et_grid_one'),
        'description' => esc_html__( 'Add an item to the Link Card Container.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                'type' => 'textfield',
                'heading' => esc_html__('Text', 'et_twenty_seventeen'),
                'param_name' => 'text',
                'description' => '',
                'save_always'   => true
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Icon color", "et_twenty_seventeen" ),
                "param_name" => "icon_color",
                "value" => '#3A3D40'
            )
        )
    ) );

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_et_2col_list extends WPBakeryShortCodesContainer {
        }
    }

};
et_twenty_seventeen_2col_list_vc_func();


// [et_2col_list]
add_shortcode( 'et_2col_list', 'et_twenty_seventeen_2col_list_shortcode' );
function et_twenty_seventeen_2col_list_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',

    ), $atts ) );

    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="et-flex-list list-wrap'.esc_attr($class).'">
        <ul>
        
            '.$content;

    $output .= '
        </ul> <!-- ./flex-container -->
    </div> <!-- ./flex-container -->
    ';

    return $output;
}

// [et_2col_list_item]
add_shortcode( 'et_2col_list_item', 'et_twenty_seventeen_et_2col_list_item_func' );
function et_twenty_seventeen_et_2col_list_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'text' => '',
        'icon_color' => ''


    ), $atts ) );

    // Build Output
    $output = readanddigest_get_list_shortcode_module_template_part('et-2col-list', 'templates', '', $atts, $content);

    return $output;
}
