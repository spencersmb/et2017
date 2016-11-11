<?php


function et_twenty_seventeen_header_sm_func() {
    vc_map( array(
        "name"      => esc_html__( "ET Header-sm", "et_twenty_seventeen" ),
        "base"      => "et_header_sm",
        'icon'        => 'et_header_sm_icon',
        'description' => esc_html__( 'Small Page Header.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'et_twenty_seventeen' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'et_twenty_seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Header Title',
                'param_name' => 'header_title',
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Header Sub-Title',
                'param_name' => 'header_sub_title',
                'description' => ''
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => "Main Image",
                "param_name" => "main_image",
            ),

        )
    ) );

};
et_twenty_seventeen_header_sm_func();


// [et_header_sm]
add_shortcode( 'et_header_sm', 'et_twenty_seventeen_header_sm_shortcode' );
function et_twenty_seventeen_header_sm_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'header_title' => '',
        'header_sub_title' => '',
        'main_image' => '',
        

    ), $atts ) );


    $output = readanddigest_get_list_shortcode_module_template_part('et-header-sm', 'templates', '', $atts);



    return $output;
}
