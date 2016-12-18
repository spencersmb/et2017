<?php

function et_twenty_seventeen_box_gallery_one_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Gallery Box One", "et_twenty_seventeen" ),
        "base"      => "et_box_gallery_one",
        'icon'        => 'et_box_gallery_one_icon',
        'description' => esc_html__( '2 Large box images', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Image 1', 'et_twenty_seventeen'),
                "param_name" => "image_1"
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Image 2', 'et_twenty_seventeen'),
                "param_name" => "image_2"
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
et_twenty_seventeen_box_gallery_one_vc_func();


// [et_box_gallery_one]
add_shortcode( 'et_box_gallery_one', 'et_twenty_seventeen_box_gallery_one_shortcode' );
function et_twenty_seventeen_box_gallery_one_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'image_1' => '',
        'image_2' => '',
        'class' => ''

    ), $atts ) );

    $output = readanddigest_get_list_shortcode_module_template_part('box-gallery-one', 'templates', '', $atts, $content);

    return $output;
}
