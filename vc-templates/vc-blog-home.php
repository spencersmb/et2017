<?php

function et_twenty_seventee_build_blog_feature(){

    // Set cat object
    $cat_name = get_the_category();
    $postId = get_post_thumbnail_id( $the_query->ID );

    // Setup date
    $date = get_the_date('F j, Y');
    $archive_year  = get_the_time('Y');
    $archive_month = get_the_time('m');
    $archive_day   = get_the_time('d');

    $output = '
    <div class="'.esc_attr($class).'eltdf-bnl-holder eltdf-pl-six-holder eltd-post-columns-1">
        <div class="eltdf-bnl-outer">
            <div class="eltdf-bnl-inner">
    ';

    $output .= '
        <div class="eltdf-pt-six-item eltdf-post-item eltdf-active-post-page">
        
            <div class="eltdf-pt-six-image-holder">
                <div class="eltdf-post-info-category">
                    ' . getBlogCategories($cat_name) .'
                </div>
                <a itemprop="url" class="eltdf-pt-six-slide-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                    '. getImgSrcSet($postId, "1920", "928", "large") .'
                </a>
            </div>
            <!-- ./eltdf-pt-six-image-holder -->
            
            <div class="eltdf-pt-six-content-holder">
                <div class="eltdf-pt-six-title-holder">
                    <h3 class="eltdf-pt-six-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                </div>
                <div class="eltdf-pt-six-excerpt">
                    '.get_the_excerpt().'
                </div>
            </div>
            <!-- ./eltdf-pt-six-content-holder -->
            
            <div class="eltdf-pt-info-section clearfix">
                
                <div class="eltdf-pt-info-section-left">
                    <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                        <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                    </div>

                    '.getLikesHtml($display_like).'

                </div>
                <!-- ./eltdf-pswt-info-section-left -->
                
                <div class="eltdf-pt-info-section-right">
                    <div class="eltdf-post-info-comments-holder">
                        <a class="eltdf-post-info-comments" href="'. esc_url( get_comments_link() ) .'" target="_self">'. get_comments_number_text('0 ' . esc_html__('Comments','readanddigest'), '1 '.esc_html__('Comment','readanddigest'), '% '.esc_html__('Comments','readanddigest') ).'</a>
                    </div>
                </div>
                <!-- ./eltdf-pswt-info-section-right -->
                    
            </div>
            <!-- ./eltdf-pswt-info-section -->
            
        </div>
        <!-- ./eltdf-pt-six-item eltdf-post-item -->
    ';

    $output .= '
            </div><!-- ./ eltdf-bnl-inner -->
        </div><!-- ./ eltdf-bnl-outer -->
    </div><!-- ./eltdf-bnl-holder -->
    ';

    return $output;
}

function et_twenty_seventee_build_blog_list(){

    // Set post image Id
    $postId = get_post_thumbnail_id( $the_query->ID );
    $url = wp_get_attachment_url( $postId );

    // Setup date
    $date = get_the_date('F j, Y');
    $archive_year  = get_the_time('Y');
    $archive_month = get_the_time('m');
    $archive_day   = get_the_time('d');

    $output = '

<div class="eltdf-bnl-holder eltdf-pl-three-holder eltd-post-columns-1" >
    <div class="eltdf-bnl-outer">
        <div class="eltdf-bnl-inner">
';

    $output .= '
    <div class="eltdf-pt-three-item eltdf-post-item eltdf-active-post-page">
        <div class="eltdf-pt-three-item-inner">
            <div class="eltdf-pt-three-item-inner2">
            
                <div class="eltdf-pt-three-image-holder">
                    <a itemprop="url" class="eltdf-pt-three-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                     '. et_twenty_seventeen_generate_thumbnail($postId, $url, 520, 400, true).'
                    </a>
                </div>
                
                <div class="eltdf-pt-three-content-holder">
                
                    <h3 class="eltdf-pt-three-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                    <div class="eltdf-pt-three-excerpt">
                    '.et_twenty_seventeen_getExcerpt( 30 ).'
                    </div>
                    
                    <div class="eltdf-pt-info-section clearfix">
                
                        <div class="eltdf-pt-info-section-left">
                            <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                                <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                            </div>
                        </div>
                        <!-- ./eltdf-pswt-info-section-left -->
                        
                        <div class="eltdf-pt-info-section-right">
                            <div class="eltdf-post-info-comments-holder">
                                <a class="eltdf-post-info-comments" href="'. esc_url( get_comments_link() ) .'" target="_self">'. get_comments_number_text('0 ' . esc_html__('Comments','readanddigest'), '1 '.esc_html__('Comment','readanddigest'), '% '.esc_html__('Comments','readanddigest') ).'</a>
                            </div>
                        </div>
                        <!-- ./eltdf-pswt-info-section-right -->
                    
                    </div>
                    <!-- ./eltdf-pswt-info-section -->
                    
                </div>
                <!-- ./eltdf-pt-three-content-holder -->
                
                
            </div><!-- ./eltdf-pt-three-item-inner2 -->
        </div><!-- ./eltdf-pt-three-item-inner -->
    </div><!-- ./eltdf-pt-three-item eltdf-post-item eltdf-active-post-page -->
    ';

    $output .= '
            </div><!-- ./ eltdf-bnl-inner -->
        </div><!-- ./ eltdf-bnl-outer -->
    </div><!-- ./eltdf-bnl-holder -->
    ';

    return $output;
}

function et_twenty_seventeen_build_posts(){

    $output = '';

    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 10,
    );

    $the_query = new WP_Query($args);

    // Show likes or not
    $display_like = 'no';
    if(readanddigest_options()->getOptionValue('blog_list_like') !== ''){
        $display_like = readanddigest_options()->getOptionValue('blog_list_like');
    }

    $params['display_like'] = $display_like;

    $count = 0;

    if( $the_query->have_posts()): while( $the_query->have_posts() ): $the_query->the_post();
        $count++;

//        echo "<pre>";
//        print_r($the_query);
//        echo "</pre>";

        if( $count == 1){
            $output .= '
                <div class="et2017-blog-feature-item">
                '.et_twenty_seventeen_build_blog_feature().'
                </div>
            ';
        } else {
            $output .= et_twenty_seventeen_build_blog_list();
        }

    endwhile;
    endif;

    return $output;

}

function et_twenty_seventeen_blog_vc_func() {
    vc_map( array(
        "name"      => esc_html__( "Blog Home Page", "et_twenty_seventeen" ),
        "base"      => "blog_home",
        'icon'        => 'blog_icon',
        'description' => esc_html__( 'List of blog posts.', 'et_twenty_seventeen' ),
        "wrapper_class" => "clearfix",
        "category" => esc_html__( 'Content', 'et_twenty_seventeen' ),
        "params"    => array(
            array(
                'param_name'  => 'excerpt_length',
                'heading'     => esc_html__( 'Excerpt Length', 'et_twenty_seventeen' ),
                'description' => esc_html__( 'Set the word count for the excerpt', 'et_twenty_seventeen' ),
                'type'        => 'textfield',
                'holder'      => 'div'
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

};
et_twenty_seventeen_blog_vc_func();

// [blog]
add_shortcode( 'blog_home', 'et_twenty_seventeen_blog_shortcode' );
function et_twenty_seventeen_blog_shortcode( $atts, $content = null ) { // New function parameter $content is added!
    extract( shortcode_atts( array(
        'class' => '',
        'selected_blog' => '',
        'blog_home_layout' => ''

    ), $atts ) );

    // Pass through args to inner html
    $args = array(
        'blog_home_page' => $blog_home_page,
        'selected_blog' => $selected_blog
    );

    $output = '
        <div class="'. esc_attr($class) .'">
            '.et_twenty_seventeen_build_posts().'
        </div>
    ';


    return $output;
}
