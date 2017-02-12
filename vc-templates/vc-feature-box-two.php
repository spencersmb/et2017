<?php

function et_twenty_seventeen_feature_box_two_func() {
    $vc_attr = array(
        "name"      => esc_html__( "Feature Box Two", "et-twenty-seventeen" ),
        "base"      => "et_feature_box_two",
        'icon'        => 'et_feature_box_two_icon',
        'description' => esc_html__( 'Feature Product', 'et-twenty-seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et-twenty-seventeen' ),
        "params"    => array(
            array(
                'param_name'  => 'element_type',
                'heading'     => esc_html__( 'Feature: Product or Course?', 'et_twenty_seventeen' ),
                'type'        => 'dropdown',
                'value' => array(
                    'Course' => 'course',
                    'Product' => 'product'
                )
            ),
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
            )
        )
    ) ;

    $course = array(
        array(
            'type' => 'textfield',
            'heading' => 'Headline',
            'param_name' => 'headline',
            'dependency' => array('element' => 'element_type', 'value' => array('course')),
            'description' => '',
            'group' => 'course'
        ),
        array(
            'type' => 'textarea_html',
            'heading' => 'Description',
            'param_name' => 'content',
            'description' => '',
            'dependency' => array('element' => 'element_type', 'value' => array('course')),
            'group' => 'course'
        ),
        array(
            'param_name'  => 'add_button',
            'dependency' => array('element' => 'element_type', 'value' => array('course')),
            'group' => 'course',
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
            'group' => 'course',
            'dependency' => array('element' => 'add_button', 'value' => array('yes'))
        ),
        array(
            'type' => 'textfield',
            'heading' => 'Button Url',
            'param_name' => 'button_url',
            'group' => 'course',
            'dependency' => array('element' => 'add_button', 'value' => array('yes'))
        ),
        array(
            'param_name'  => 'new_window',
            'heading'     => esc_html__( 'Open Link in new window?', 'et_twenty_seventeen' ),
            'type'        => 'dropdown',
            'dependency' => array('element' => 'add_button', 'value' => array('yes')),
            'group' => 'course',
            'value' => array(
                'No' => 'no',
                'Yes' => 'yes'
            )
        )
    );

    $products = array(
        array(
            'type' => 'dropdown',
            'heading' => 'Select Product',
            'param_name' => 'product',
            'dependency' => array('element' => 'element_type', 'value' => array('product')),
            'description' => '',
            'value' => et_getAllPages('product'), //will return post number
            'group' => 'product'
        ),
        array(
            'type' => 'textarea',
            'heading' => 'Product Excerpt',
            'param_name' => 'product_excerpt',
            'dependency' => array('element' => 'element_type', 'value' => array('product')),
            'description' => '',
            'group' => 'product'
        )
    );

    //Add courses content
    foreach ( $course as $array ){
        array_push($vc_attr['params'], $array);
    }

    //Add product content
    foreach ( $products as $array ){
        array_push($vc_attr['params'], $array);
    }

   vc_map($vc_attr);

};
et_twenty_seventeen_feature_box_two_func();

// [et_feature_box_two]
add_shortcode( 'et_feature_box_two', 'et_feature_box_two_shortcode' );
function et_feature_box_two_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'element_type' => '',
        'main_image' => '',
        'headline' => '',
        'add_button' => '',
        'button_text' => '',
        'button_url' => '',
        'new_window' => '',

        'product' => '',
        'product_excerpt' => ''

    ), $atts ) );

    //look at using get_post and see if it returns ACF data in output
    if( is_numeric($product) ){
        
        //Set Global ID for use in other templates
        global $featured_post; 
        $featured_post = new Featured_product($product);
        
        
        $product_id = $product;
        $post = get_post($product_id);

        //Add post to atts array
        $atts['post'] = $post;

        //Build array of ACF values
        $acf_vars = array(
            'gumroad_link' => get_field('gumroad_link', $product_id),
            'price' => get_field('price', $product_id),
            'youtube_link' => get_field('youtube_link', $product_id),
            'has_extended_price' => get_field('has_extended_price', $product_id),
            'extended_price' => get_field('extended_price', $product_id),
            'extended_license_url' => get_field('extended_license_url', $product_id),
            'has_font_preview' => get_field('has_font_preview', $product_id),
            'font_name' => get_field('font_name', $product_id),
            'font_styles' => get_field('font_styles', $product_id),
        );

        //add items to $atts object array
        foreach ( $acf_vars as $key => $value ){
            $atts['acf'][$key] = $value;
        }

        //remove false, empty, or null values
        $atts['acf'] = array_filter($atts['acf']);

    }

    if($element_type == 'product'){
        $output = readanddigest_get_list_shortcode_module_template_part('box-template-two-products', 'templates', '', $atts);
    }else{
        $output = readanddigest_get_list_shortcode_module_template_part('box-template-two', 'templates', '', $atts, $content);
    }

    return $output;
}
