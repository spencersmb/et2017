<?php

function et_twenty_seventeen_feature_box_one_func() {
    vc_map( array(
        "name"      => esc_html__( "Feature Box one", "et-twenty-seventeen" ),
        "base"      => "et_feature_box_one",
        'icon'        => 'et_feature_box_one_icon',
        'description' => esc_html__( 'Feature Product.', 'et-twenty-seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et-twenty-seventeen' ),
        "params"    => array(
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'et-twenty-seventeen' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'et-twenty-seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => "Main Image",
                "param_name" => "main_image",
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Large Image',
                'param_name' => 'large_image',
                'value' => array(
                    'No' => 'no',
                    'Yes' => 'yes',
                ),
                'save_always' => true
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Image Type',
                'param_name' => 'image_type',
                'value' => array(
                    'Horizontal' => 'hoz',
                    'Vertical' => 'vert',
                ),
                'save_always' => true
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Reverse Layout',
                'param_name' => 'reverse_layout',
                'value' => array(
                    'Normal' => 'normal',
                    'Reverse' => 'reverse',
                ),
                'save_always' => true
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Show Category',
                'param_name' => 'show_category',
                'value' => array(
                    'Yes' => 'yes',
                    'No' => 'no'
                ),
                'save_always' => true
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Category Type',
                'param_name' => 'category_type',
                'dependency' => array('element' => 'show_category', 'value' => array('yes')),
                'value' => et_getAllCategories(),
                'save_always' => true
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Headline',
                'param_name' => 'headline',
                'description' => ''
            ),
            array(
                'type' => 'textarea_html',
                'heading' => 'Description',
                'param_name' => 'content',
                'description' => ''
            ),
            array(
                'param_name'  => 'add_button',
                "admin_label" => false,
                'heading'     => esc_html__( 'Add Button', 'et_twenty_seventeen' ),
                'type'        => 'checkbox',
                'value' => array(
                    'Yes' => 'yes',
                    'No' => 'no',
                ),
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Button Text',
                'param_name' => 'button_text',
                'dependency' => array('element' => 'add_button', 'value' => array('yes'))
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Button Url',
                'param_name' => 'button_url',
                'dependency' => array('element' => 'add_button', 'value' => array('yes'))
            ),
            array(
                'param_name'  => 'new_window',
                'heading'     => esc_html__( 'Open Link in new window?', 'et_twenty_seventeen' ),
                'type'        => 'dropdown',
                'dependency' => array('element' => 'add_button', 'value' => array('yes')),
                'value' => array(
                    'No' => 'no',
                    'Yes' => 'yes'
                ),
            ),
            array(
                'param_name'  => 'border',
                "admin_label" => false,
                'heading'     => esc_html__( 'Add Border', 'et_twenty_seventeen' ),
                'type'        => 'dropdown',
                'value' => array(
                    'No Border' => 'none',
                    'Border Top' => 'top',
                    'Border Bottom' => 'bottom',
                    'Border Top & Bottom' => 'both',
                ),
            ),
        )
    ) );

};
et_twenty_seventeen_feature_box_one_func();

// [et_feature_box_one]
add_shortcode( 'et_feature_box_one', 'et_feature_box_one_shortcode' );
function et_feature_box_one_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'main_image' => '',
        'image_type' => '',
        'large_image' => '',
        'reverse_layout' => '',
        'category_type' => '',
        'show_category' => '',
        'headline' => '',
        'add_button' => '',
        'border' => '',
        'button_text' => '',
        'button_url' => '',
        'new_window' => ''

    ), $atts ) );

    $output = readanddigest_get_list_shortcode_module_template_part('box-template-one', 'templates', '', $atts, $content);

    return $output;
}