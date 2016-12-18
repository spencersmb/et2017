<?php

function et_twenty_seventeen_link_card_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Link Card", "et_twenty_seventeen" ),
        "base"      => "et_link_card",
        'icon'        => 'et_link_card_icon',
        "as_parent" => array('only' => 'et_link_card_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
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
        "name"      => esc_html__( "Link Card: Item", "et_twenty_seventeen" ),
        "base"      => "et_link_card_item",
        'icon'        => 'et_link_card_item_icon',
        "as_child" => array('only' => 'et_grid_one'),
        'description' => esc_html__( 'Add an item to the Link Card Container.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Image', 'et_twenty_seventeen'),
                "param_name" => "image"
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__('Headline', 'et_twenty_seventeen'),
                'param_name' => 'headline',
                'description' => '',
                'save_always'   => true
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Headline color", "et_twenty_seventeen" ),
                "param_name" => "headline_color",
                "value" => '#3A3D40'

            ),
            array(
                'type' => 'textarea_html',
                'heading' => esc_html__('Description', 'et_twenty_seventeen'),
                'param_name' => 'content',
                'description' => ''
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Choose Link',
                'param_name' => 'page_link',
                'value' => et_getAllPages('page'),
                'save_always' => true
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'et_twenty_seventeen' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'et_twenty_seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ) );

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_et_link_card extends WPBakeryShortCodesContainer {
        }
    }

};
et_twenty_seventeen_link_card_vc_func();


// [et_link_card]
add_shortcode( 'et_link_card', 'et_twenty_seventeen_link_card_shortcode' );
function et_twenty_seventeen_link_card_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',

    ), $atts ) );



    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="et-container-full-width '.esc_attr($class).'" style="">
        <div class="flex-row flex-row-md et-linkcard">
        
            '.$content;

    $output .= '
        </div> <!-- ./flex-container -->
    </div><!-- ./et_grid_one container -->
    ';

    return $output;
}

// [et_link_card_item]
add_shortcode( 'et_link_card_item', 'et_twenty_seventeen_et_link_card_item_func' );
function et_twenty_seventeen_et_link_card_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'image' => '',
        'headline' => '',
        'headline_color' => '#3A3D40',
        'page_link' => '',
        'class' => '',


    ), $atts ) );

    // Build Output
    $output = readanddigest_get_list_shortcode_module_template_part('et-link-card', 'templates', '', $atts, $content);

    return $output;
}
