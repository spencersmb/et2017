<?php
function et_twenty_seventeen_grid_one_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Grid One", "et_twenty_seventeen" ),
        "base"      => "et_grid_one",
        'icon'        => 'et_grid_one_icon',
        "as_parent" => array('only' => 'et_grid_one_item'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Create a et_grid_one Map. Add up to six items', 'et_twenty_seventeen' ),
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
    ) );
    vc_map( array(
        "name"      => esc_html__( "Grid One: Item", "et_twenty_seventeen" ),
        "base"      => "et_grid_one_item",
        'icon'        => 'et_grid_one_item_icon',
        "as_child" => array('only' => 'et_grid_one'),
        'description' => esc_html__( 'Add an item to the Grid.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(

            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Headline", "et_twenty_seventeen" ),
                "param_name" => "item_headline_text",
                "value" => ''
            ),
            array(
                "type" => "textarea_html",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Text", "et_twenty_seventeen" ),
                "param_name" => "content",
                "value" => '',
            ),
            array(
                "type" => "textfield",
                "holder" => "div",
                "class" => "",
                "heading" => esc_html__( "Link Text", "et_twenty_seventeen" ),
                "param_name" => "link_text",
                "value" => ''
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Choose Link',
                'param_name' => 'page_link',
                'value' => et_getAllPages('page'),
                'save_always' => true
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Headline color", "et_twenty_seventeen" ),
                "param_name" => "headline_color",
                "value" => '#727272'

            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Icon color", "et_twenty_seventeen" ),
                "param_name" => "icon_color",
                "value" => '#fff'

            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Icon background color", "et_twenty_seventeen" ),
                "param_name" => "icon_bg_color",
                "value" => '#727272'
            ),
            array(
                "type" 			=> "icon",
                "class" 		=> "hide_in_vc_editor",
                "admin_label" 	=> true,
                "heading" 		=> "Icon",
                "param_name" 	=> "fa_icon",
                "admin_label" 	=> false,
                "value" 		=> "fa-wheelchair"
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
        class WPBakeryShortCode_et_grid_one extends WPBakeryShortCodesContainer {
        }
    }
};
et_twenty_seventeen_grid_one_vc_func();

// [et_grid_one]
add_shortcode( 'et_grid_one', 'et_twenty_seventeen_grid_one_func' );
function et_twenty_seventeen_grid_one_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => ''

    ), $atts ) );

    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="et-rd-container '.esc_attr($class).'" style="">
        <div class="flex-row flex-row-md et-grid-one">
        
            '.$content;

    $output .= '
        </div> <!-- ./flex-container -->
    </div><!-- ./et_grid_one container -->
    ';

    return $output;
}

// [et_grid_one_item]
add_shortcode( 'et_grid_one_item', 'et_twenty_seventeen_grid_one_item_func' );
function et_twenty_seventeen_grid_one_item_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'fa_icon' => '',
        'item_headline_text' => '',
        'link_text' => '',
        'page_link' => '',
        'icon_bg_color' => '#727272',
        'icon_color' => '#fff',
        'headline_color' => '#727272'


    ), $atts ) );

    // Build Output
    $output = readanddigest_get_list_shortcode_module_template_part('et-grid-one-item', 'templates', '', $atts, $content);

    return $output;
}
