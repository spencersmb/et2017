<?php

function et_twenty_seventeen_bio_cards_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Bio Cards", "et_twenty_seventeen" ),
        "base"      => "et_bio_cards",
        'icon'        => 'et_bio_cards_icon',
        "as_parent" => array('only' => 'et_bio_card'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "is_container" => true,
        "js_view" => 'VcColumnView',
        'description' => esc_html__( 'Bio Card Element', 'et_twenty_seventeen' ),
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
        "name"      => esc_html__( "Bio Card", "et_twenty_seventeen" ),
        "base"      => "et_bio_card",
        'icon'        => 'et_bio_card_icon',
        "as_child" => array('only' => 'et_bio_cards'),
        'description' => esc_html__( 'Add an item to the Link Card Container.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Profile Image', 'et_twenty_seventeen'),
                "param_name" => "profile_image"
            ),
            array(
                "type" => "attach_image",
                "holder" => "div",
                "class" => "hide_in_vc_editor",
                "admin_label" => false,
                "heading" => esc_html__('Signature Image', 'et_twenty_seventeen'),
                "param_name" => "signature_image"
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__('User Name', 'et_twenty_seventeen'),
                'param_name' => 'name',
                'description' => '',
                'save_always'   => true
            ),
            array(
                'type' => 'textfield',
                'heading' => esc_html__('User Title', 'et_twenty_seventeen'),
                'param_name' => 'title',
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
        )
    ) );

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_et_bio_cards extends WPBakeryShortCodesContainer {
        }
    }

};
et_twenty_seventeen_bio_cards_vc_func();


// [et_bio_cards]
add_shortcode( 'et_bio_cards', 'et_twenty_seventeen_bio_cards_shortcode' );
function et_twenty_seventeen_bio_cards_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',

    ), $atts ) );



    //Inner content
    $content = do_shortcode($content);

    // Build Output
    $output = '
    <div class="et-rd-container '.esc_attr($class).'" style="">
        <div class="flex-row flex-row-md flex-bio-card">
        
            '.$content;

    $output .= '
        </div> <!-- ./flex-container -->
    </div><!-- ./et_grid_one container -->
    ';

    return $output;
}

// [et_bio_card]
add_shortcode( 'et_bio_card', 'et_twenty_seventeen_et_bio_card_func' );
function et_twenty_seventeen_et_bio_card_func( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'profile_image' => '',
        'signature_image' => '',
        'name' => '',
        'title' => '',
        'class' => ''


    ), $atts ) );

    // Build Output
    $output = readanddigest_get_list_shortcode_module_template_part('et-bio-card', 'templates', '', $atts, $content);

    return $output;
}
