<?php

function et_twenty_seventeen_box_intro_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "ET Box Intro", "et_twenty_seventeen" ),
        "base"      => "et_box_intro",
        'icon'        => 'et_box_intro_icon',
        'description' => esc_html__( 'Intro Box with diagnol image.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Icon Image', 'et_twenty_seventeen'),
                "param_name" => "icon_image"
            ),
            array(
                "type" 			=> "icon",
                "class" 		=> "hide_in_vc_editor",
                "heading" 		=> esc_html__('Icon', 'et_twenty_seventeen'),
                "param_name" 	=> "fa_icon",
                "admin_label" 	=> false,
                "value" 		=> "fa-wheelchair"
            ),
            array(
                "type" => "colorpicker",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "heading" => esc_html__( "Icon color", "et_twenty_seventeen" ),
                "param_name" => "icon_color",
                "value" => '#727272'

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
                'type' => 'textfield',
                'heading' => esc_html__('Headline', 'et_twenty_seventeen'),
                'param_name' => 'headline',
                'description' => '',
                'save_always'   => true
            ),
            array(
                'type' => 'textarea_html',
                'heading' => esc_html__('Description', 'et_twenty_seventeen'),
                'param_name' => 'content',
                'description' => ''
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'et_twenty_seventeen' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'et_twenty_seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
        )
    ) ));

};
et_twenty_seventeen_box_intro_vc_func();


// [et_box_intro]
add_shortcode( 'et_box_intro', 'et_twenty_seventeen_box_intro_shortcode' );
function et_twenty_seventeen_box_intro_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'icon_image' => '',
        'headline' => '',
        'class' => '',
        'icon_bg_color' => '#727272',
        'icon_color' => '#727272',
        'fa_icon' => ''

    ), $atts ) );

    $output = readanddigest_get_list_shortcode_module_template_part('et-box-intro', 'templates', '', $atts, $content);

    return $output;
}
