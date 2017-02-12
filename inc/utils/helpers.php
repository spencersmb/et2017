<?php
function et2017_page_checker(){
    $my_pages = [
        'products',
        'courses',
        'contact'
    ];

    $classes = array();

    foreach ($my_pages as $my_page){
        if(is_page($my_page)) array_push($classes, $my_page);
    }

    return $classes;

}

class Featured_product{
    
    public $id;
    
    public function __construct ( $id ){
        $this->id = $id;
    }
    
    public function set_id ( $id ){
        $this->id = $id;
    }

    public function get_id (){
        return $this->id;
    }
}

function et2017_get_all_post_types(){
    $post_types_array = array(
        'page' => 'Page',
        'posts' => 'Posts',
        'courses' => 'Courses',
        'product' => 'Products'
    );

    return $post_types_array;
}

//how to check for courses in the nav
function et2017_check_post_type_nav($post_type){
    if($post_type == 'courses') {
        return et2017_get_url_nav_drop_down_courses();
    }elseif ($post_type =='product'){
        return et2017_get_url_nav_drop_down_products();
    }
}

function et2017_get_url_nav_drop_down_courses(){
    //return url
    $needle = 'courses.every-tuesday.com';
    $url = get_field('course_url'); // acf url
    $exploded_url = explode("/", $url);

    if(!in_array($needle, $exploded_url)){
        $url = '/courses';
    }

    return $url;
}

function et2017_get_url_nav_drop_down_products(){
    return '/products';
}

function et_twenty_seventeen_blog_image(){
    $output = '';
    do_action('readanddigest_before_page_title');

    // Set cat object
    $postId = get_post_thumbnail_id( get_the_ID() );
    $url = wp_get_attachment_url( $postId );

    // Setup date
    $date = get_the_date('F j, Y');
    $archive_year  = get_the_time('Y');
    $archive_month = get_the_time('m');
    $archive_day   = get_the_time('d');

    $output .= '
        <div class="eltdf-grid">
            <div class="eltdf-pt-six-item eltdf-post-item eltdf-active-post-page et2017-post">
        
                <div class="eltdf-pt-six-image-holder">
        
                    <a itemprop="url" class="eltdf-pt-six-slide-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                        '. et_twenty_seventeen_generate_thumbnail($postId, $url, 1200, 580, true).'
                    </a>
                    
                </div>
                <!-- ./eltdf-pt-six-image-holder -->
                <div class="et2017-post-info-category">
                        ' . et_getBlogCategories() .'
                </div>
                
                <h3 class="et2017-post-title">
                    <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                </h3>
                
                
                <div itemprop="dateCreated" class="et2017-post-date">
                    <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                </div>
                
            
            </div>
            <!-- ./eltdf-pt-six-item eltdf-post-item -->
        </div>
    ';

    echo $output;
    do_action('readanddigest_after_page_title');
}
