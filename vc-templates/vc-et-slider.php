<?php


function et_twenty_seventeen_custom_slider_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "ET Custom Slider", "et_twenty_seventeen" ),
        "base"      => "et_slider",
        'icon'        => 'et_slider_icon',
        'description' => esc_html__( 'List of blog posts.', 'et_twenty_seventeen' ),
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
                    'Page' => 'page',
                    'Post' => 'post',
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
                'type' => 'textfield',
                'heading' => 'Carousel Title',
                'param_name' => 'carousel_title',
                'description' => ''
            ),
            array(
                "type" => "dropdown",
                "admin_label" => true,
                "class" => "",
                "heading" => "Sort",
                "param_name" => "sort",
                "value" => readanddigest_get_sort_array(),
                "description" => ""
            ),
            array(
                'type' => 'dropdown',
                'heading' => 'Image Size',
                'param_name' => 'thumb_image_size',
                'value' => array(
                    'Original' => 'original',
                    'Landscape' => 'landscape',
                    'Portrait' => 'portrait',
                    'Square' => 'square',
                    'Custom' => 'custom_size'
                ),
                'save_always' => true,
                'description' => '',
                'group' => 'Post Item'
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Image Width (px)',
                'param_name' => 'thumb_image_width',
                'description' => 'Set custom image width (px)',
                'dependency' => array('element' => 'thumb_image_size', 'value' => array('custom_size')),
                'group' => 'Post Item'
            ),
            array(
                'type' => 'textfield',
                'heading' => 'Image Height (px)',
                'param_name' => 'thumb_image_height',
                'description' => 'Set custom image height (px)',
                'dependency' => array('element' => 'thumb_image_size', 'value' => array('custom_size')),
                'group' => 'Post Item'
            )
        )
    ) );

};
et_twenty_seventeen_custom_slider_vc_func();


// [et_slider]
add_shortcode( 'et_slider', 'et_twenty_seventeen_custom_slider_shortcode' );
function et_twenty_seventeen_custom_slider_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'query_type' => '',
        'number_of_posts' => '',
        'post_in' => '',
        'carousel_title' => '',
        'sort' => '',
        'thumb_image_size' => '',
        'thumb_image_width' => '',
        'thumb_image_height' => '',
        'title_length' => 30,
        'display_category' => 'yes',
        'display_post_type_icon' => 'no',
        'display_featured_icon' => 'no'

    ), $atts ) );

    // Pass through args to inner html
    $args = array(

    );

    $output = '
       <div class="eltdf-bnl-holder eltdf-pc-holder four-posts et-primary-slider" 
     data-base="eltdf_post_carousel" 
     data-extra_class_name="et-primary-slider" 
     data-carousel_layout="four-posts" 
     data-query_type="product" 
     data-number_of_posts="'.esc_attr($number_of_posts).'" 
     data-sort="'.esc_attr($sort).'" 
     data-thumb_image_size="full" 
     data-display_date="no" 
     data-display_category="no" 
     data-display_author="no" 
     data-display_comments="no" 
     data-display_excerpt="no" 
     data-display_navigation="yes" 
     data-display_paging="no"
     data-carousel_title="'. esc_attr($carousel_title) .'"
     data-paged="1" data-max_pages="3">
        <div class="eltdf-bnl-outer" style="opacity: 1;">
            
            <div class="eltdf-pc-title-nav-holder">
                <span class="eltdf-pc-title">'. wp_kses($carousel_title, 'et_twenty_seventeen') .'</span>
            </div>
            
            <div class="flex-viewport">
                <ul class="eltdf-carousel-holder">';

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


            //Create wp_Query
            $args = array(
                'post_type' => $query_type,
                'posts_per_page' => $number_of_posts,
                'orderby'        => $sort,
                'post__in' => $post_in
            );

            $wp_query = new WP_Query($args);

            if( $wp_query->have_posts()): while( $wp_query->have_posts() ): $wp_query->the_post();

                $output .= readanddigest_get_list_shortcode_module_template_part('et-custom-slider', 'templates', '', $atts);

            endwhile;
            endif;

            $output .= '</ul>
            </div>
            
        </div>
    </div>
    ';


    return $output;
}
