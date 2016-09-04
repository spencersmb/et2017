<?php


function getImgSrcSet( $post_id, $width, $height, $size ){

    $output = '';

    $img_src = wp_get_attachment_image_url( $post_id, $size );
    $img_srcset = wp_get_attachment_image_srcset( $post_id, $size );
    $img_alt = get_post_meta( $post_id, '_wp_attachment_image_alt', 'true');


    $output .= '
        <img width="'.$width.'" 
             height="'.$height.'"
             class="attachment-full size-full wp-post-image"
             src="'.esc_url( $img_src ) .'"
             srcset="'. esc_attr( $img_srcset ).'"
             sizes="(max-width: '.$width.'px) 100vw, '.$width.'px" draggable="false" 
             alt="'. esc_attr($img_alt).'">
        ';

    return $output;


}
function getBlogCategories( $cat_object ){
    $output = '';

    $cat_length = count($cat_object);

    $count = 0;
    foreach($cat_object as $cat){
        $count++;
        $cat_id = $cat->cat_ID;
        $cat_count = $cat->category_count;
        $cat_link = get_category_link( $cat_id );;

        // add comma to all but last element
        if( $cat_count > 1 && $count < $cat_length){
            $output .= '
                    <a href="'. esc_url($cat_link) .'" rel="category tag">'. wp_kses($cat->name, 'et_twenty_seventeen') .'</a>';
            $output .= ", ";
        }else {
            $output .= '
                    <a href="'. esc_url($cat_link) .'" rel="category tag">'. wp_kses($cat->name, 'et_twenty_seventeen') .'</a>';
        }


    }

    return $output;

}
function getLikesHtml($show_like){
    $output = '';

    if( $show_like == 'yes' ){

        $output .= '
                <div class="eltdf-blog-like">'.
            wp_kses(readanddigest_like()->add_like(), array(
                'span' => array(
                    'class' => true,
                    'aria-hidden' => true,
                    'style' => true,
                    'id' => true
                ),
                'a' => array(
                    'href' => true,
                    'class' => true,
                    'id' => true,
                    'title' => true,
                    'style' => true
                )
            )) .'
                </div>';
    }

    return $output;
}

function sprout_ext_get_feature_posts($total, $category) {

    // Initialize
    $sticky = get_option( 'sticky_posts' );

    // extract ids from this and redo arrays the add ids instead of posts
    $args = array( 'post__in' => $sticky );

    //    $args[ 'orderby' ] = 'rand';
    $args[ 'numberposts' ] = $total;

    if ( $category ) $args[ 'category' ] = $category;

    // Get sticky posts
    $posts = get_posts( $args );

    // Are there enough posts?
    if ( count( $posts ) < $total ) {

        // Revise arguments to get remaining non-sticky posts
        $nonstickyTotal = $total - count( $posts );

        // remove items from args
        unset( $args[ 'post__in' ] );
        unset($args[ 'numberposts' ]);

        // Add args to get posts not sticky with updated count after sticky posts found
        $args[ 'post__not_in' ] = $sticky;
        $args[ 'numberposts' ] = $nonstickyTotal;

        // Merge array of data
        $posts = array_merge( $posts, get_posts( $args ) );

    }

    return $posts;

}

function sprout_ext_build_featured_posts(){

    $output = '';

    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 1,
    );

    $the_query = new WP_Query($args);

    // Show likes or not
    $display_like = 'no';
    if(readanddigest_options()->getOptionValue('blog_list_like') !== ''){
        $display_like = readanddigest_options()->getOptionValue('blog_list_like');
    }

    $params['display_like'] = $display_like;

    if( $the_query->have_posts()): while( $the_query->have_posts() ): $the_query->the_post();

    // Set post image Id
    $postId = get_post_thumbnail_id( $the_query->ID );


    // build main image
    $output .= '
        <div class="eltdf-pswt-image">
              '. getImgSrcSet($postId, 1920, 928, "large") .'
             <a itemprop="url" class="eltdf-pswt-link" href="'.get_the_permalink().'" target="_self">
            </a>
        </div> <!-- end image -->
    ';

    // Set cat object
    $cat_name = get_the_category();

    // Setup date
    $date = get_the_date('F j, Y');
    $archive_year  = get_the_time('Y');
    $archive_month = get_the_time('m');
    $archive_day   = get_the_time('d');

    $output .= '
        <div class="eltdf-pswt-content">
        
            <div class="eltdf-post-info-category">
            ' . getBlogCategories($cat_name) .'
            </div>
            
            <h1 class="eltdf-pswt-title">
                <a itemprop="url" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
            </h1>
            
            <div class="eltdf-pswt-info">
                <div class="eltdf-pswt-info-section clearfix">
                
                    <div class="eltdf-pswt-info-section-left">
                        <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                            <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                            <meta itemprop="interactionCount" content="UserComments: 0">
                        </div>

                        '.getLikesHtml($display_like).'

                    </div><!-- ./eltdf-pswt-info-section-left -->
                    
                    <div class="eltdf-pswt-info-section-right">
                        <div class="eltdf-post-info-comments-holder">
                            <a class="eltdf-post-info-comments" href="'. esc_url( get_comments_link() ) .'" target="_self">'. get_comments_number_text('0 ' . esc_html__('Comments','readanddigest'), '1 '.esc_html__('Comment','readanddigest'), '% '.esc_html__('Comments','readanddigest') ).'</a></div>
                            
                        </div>
                    </div><!-- ./eltdf-pswt-info-section-right -->
                    
                </div><!-- ./eltdf-pswt-info-section -->
            </div><!-- ./eltdf-pswt-info -->
            
        </div><!-- ./eltdf-pswt-content -->
    ';


    endwhile;
    endif;

    return $output;

}

function et_twenty_seventeen_getAllPages($type){
    // return assoc array with Name and post ID
    global $post;

    $args = array(
        'post_type' => $type,
        'posts_per_page' => -1,
    );

    $listings = new WP_Query($args);

    $page_array = array();
    $string_names = '';
    if ( $listings->have_posts() ) {

        while ( $listings->have_posts() ) {

            $listings->the_post();

            $page_title = html_entity_decode(get_the_title($post->ID));
            $page_array[$page_title] = $post->ID;

        }
    }

    wp_reset_postdata();
    return $page_array;
}

function sprout_ext_blog_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Feature Blog List", "sprout_ext" ),
        "base"      => "blog",
        'icon'        => 'blog_icon',
        'description' => esc_html__( 'List of feature blog posts.', 'sprout_ext' ),
        'admin_enqueue_js' => array(plugin_dir_url(__FILE__) .'/slideshow-admin.js'),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'sprout_ext' ),
        "params"    => array(
            array(
                'param_name'  => 'blog_home_page',
                'heading'     => esc_html__( 'Add Custom Blog Homepage Link?', 'sprout_ext' ),
                'description' => esc_html__( 'If you are using a custom front page, check this box to add the new blog homepage url. Leave unchecked if using Wordpress default homepage.', 'sprout_ext' ),
                'type'        => 'checkbox',
                "value"			=> ''
            ),
            array(
                'param_name'  => 'selected_blog',
                'dependency' => array(
                    'element' => 'blog_home_page',
                    'value' => array('true')
                ),
                'heading'     => esc_html__( 'Select Blog Page', 'sprout_ext' ),
                'description' => esc_html__( 'Use dropdown to select custom blog url', 'sprout_ext' ),
                'type'        => 'dropdown',
                "value"			=> et_twenty_seventeen_getAllPages('page')
            ),
            array(
                'param_name'  => 'class',
                'heading'     => esc_html__( 'Class', 'sprout_ext' ),
                'description' => esc_html__( '(Optional) Enter a unique class name.', 'sprout_ext' ),
                'type'        => 'textfield',
                'holder'      => 'div'
            )
        )
    ) );

};
sprout_ext_blog_vc_func();

// [blog]
add_shortcode( 'blog', 'sprout_ext_blog_shortcode' );
function sprout_ext_blog_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'selected_blog' => '',
        'blog_home_page' => ''

    ), $atts ) );

    $output = '
    <div class="'.esc_attr($class).' et-feature-container">
    ';

    // Pass through args to inner html
    $args = array(
        'blog_home_page' => $blog_home_page,
        'selected_blog' => $selected_blog
    );
    $output .= '<div class="et-feature-slide">';
    $output .= sprout_ext_build_featured_posts();

    $output .= '
        </div>
    </div>
    <!-- end blog container -->
    ';

    return $output;
}
