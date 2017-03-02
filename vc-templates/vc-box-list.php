<?php


function et_twenty_seventeen_box_list_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "ET Box list", "et_twenty_seventeen" ),
        "base"      => "et_box_list",
        'icon'        => 'et_box_list_icon',
        'description' => esc_html__( 'List of products or courses.', 'et_twenty_seventeen' ),
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
                'type' => 'dropdown',
                'heading' => 'Query Type',
                'param_name' => 'query_type',
                'value' => array(
                    'Products' => 'product',
                    'Courses' => 'courses',
                    'Courses & Products' => 'both'
                ),
                'save_always' => true,
                'description' => '',
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Number of Posts',
                'param_name' => 'number_of_posts',
                'description' => '',
                'value' => '6',
                'save_always'   => true
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Include Posts',
                'param_name' => 'post_in',
                'description' => 'Enter the IDs of the posts you want to display',
            ),
            array(
                "type" => "dropdown",
                "admin_label" => true,
                "class" => "",
                "heading" => "Sort",
                "param_name" => "sort",
                "value" => readanddigest_get_sort_array(),
                "description" => ""
            )
        )
    ) );

};
et_twenty_seventeen_box_list_vc_func();


// [et_box_list]
add_shortcode( 'et_box_list', 'et_twenty_seventeen_box_list_shortcode' );
function et_twenty_seventeen_box_list_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'query_type' => '',
        'number_of_posts' => '',
        'post_in' => '',
        'carousel_title' => '',
        'sort' => ''

    ), $atts ) );

    //check for both queries
    if( $query_type == 'both'){
        $query_type = array(
            'courses',
            'product'
        );
    }

    //check for post__in
    if(strlen($post_in > 0)){
        $post_in = convert_string_comma_to_array($post_in);

        $sort = 'post__in';
    }

    global $featured_post;

    // If post is selected as feature do not display in the list
    //        'post__not_in' => [$not_in]
    //    $not_in = '';
    //    if(isset($featured_post)){
    //        $not_in = $featured_post->get_id();
    //    }

    //Create wp_Query
    $args = array(
        'post_type' => $query_type,
        'posts_per_page' => $number_of_posts,
        'orderby'        => $sort,
        'post__in' => $post_in,

    );

    $output = '
        <div class="et-box-list">';


    // Check if products page to place license button
    if( $query_type == 'product' ){
        $output .= '
            <div class="licenseModal-wrapper">
                <a href=""
                   class="licenseModal-btn et-btn-round" 
                   data-target="#licenseModal">
                    <span class="more-button">'. esc_html__('View License Info', 'et-twenty-seventeen') .'</span>
                </a>
            </div>
        ';
    }

    $output .='
        <!-- course items -->
        <div class="flex-row flex-row-md">
    ';


    $wp_query = new WP_Query($args);

    if( $wp_query->have_posts()): while( $wp_query->have_posts() ): $wp_query->the_post();

        if( $query_type == 'courses' ){

            $output .= readanddigest_get_list_shortcode_module_template_part('et-box-list--courses', 'templates', '', $atts);

        }else if( $query_type == 'product' ){

            $output .= readanddigest_get_list_shortcode_module_template_part('et-box-list--products', 'templates', '', $atts);

        }

    endwhile;
    endif;

    $output .= '
            </div>
        </div>
    ';

    return $output;
}
