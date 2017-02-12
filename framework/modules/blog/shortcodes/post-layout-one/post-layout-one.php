<?php

function et_twenty_seventeen_register_shortcodes_elated(){

    add_shortcode('et2017eltdf_post_layout_one', 'et2017eltdf_layout_one' );
}
add_action('init', 'et_twenty_seventeen_register_shortcodes_elated');

function et2017eltdf_layout_one($args, $atts){
    $default_args = array(
        'title_tag' => 'h3',
        'title_length' => '',
        'post_type' => 'post',
        'post_in' => '',
        'post_not_in' => '',
        'display_date' => 'yes',
        'date_format' => 'd F Y',
        'display_category' => 'yes',
        'display_author' => 'no',
        'display_comments' => 'yes',
        'display_like' => 'no',
        'display_excerpt' => 'yes',
        'excerpt_length' => '20',
        'thumb_image_size' => '',
        'thumb_image_width' => '',
        'thumb_image_height' => '',
        'display_post_type_icon' => '',
        'display_featured_icon' => 'no'
    );
    
//    echo "<pre>";
//    print_r( $args );
//    echo "</pre>";
    
    if(isset($args)){
        $default_args = array_merge($default_args, $args);
    }


    $params = shortcode_atts($default_args, $atts);
    $params['excerpt_length'] = esc_attr($params['excerpt_length']);
    $html = '';

    //split post in and not into comma separated arrays.
    $post_in = explode(",", $default_args['post_in']);
    $post_not = explode(",", $default_args['post_not_in']);

    $args = array(
        'post_type' => $default_args['post_type'],
        'posts_per_page' => '4',
        'post_status' => 'publish',
        'post__in' => $post_in,
        'post__not_in' => $post_not,
    );

    $query = new WP_Query( $args );

    if($query->have_posts()):
        while ($query->have_posts()) : $query->the_post();

            //Get HTML from template
            $html .= readanddigest_get_list_shortcode_module_template_part('post-template-one-nav', 'templates', '', $params);

        endwhile;
    else:
//        $html .= $this->errorMessage();

    endif;
    wp_reset_postdata();

    $extra_link = ($default_args['post_type'] === 'courses') ? "/courses" : "/products";
    $extra_text = ($default_args['post_type'] === 'courses') ? "Courses" : "Products";


    //4th item thats empty placeholder
    $html .= '
    <div class="eltdf-pt-one-item eltdf-post-item eltdf-active-post-page et2017-post-item-outline">
        <div class="eltdf-pt-one-image-holder">
            <div class="eltdf-pt-one-image-inner-holder">
                <a itemprop="url" class="eltdf-pt-one-slide-link eltdf-image-link" href="'. $extra_link .'" target="_self">
                    <span class="et2107-viewall-arrow"></span>
                </a>
            </div>
        </div>
        <div class="eltdf-pt-one-content-holder">
            <div class="eltdf-pt-one-title-holder">
                <h3 class="eltdf-pt-one-title">
                    <a itemprop="url" class="eltdf-pt-link" href="'. $extra_link .'" target="_self">View All '. $extra_text .'</a>
                </h3>
            </div>
        </div>
    </div>
    ';

    return $html;
}