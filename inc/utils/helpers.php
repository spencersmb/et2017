<?php

//Check for Visual Composer Plugin
if(!function_exists('et_twenty_seventeen_visual_composer_installed')) {
    /**
     * Function that checks if visual composer installed
     * @return bool
     */
    function et_twenty_seventeen_visual_composer_installed() {
        //is Visual Composer installed?
        if(class_exists('WPBakeryVisualComposerAbstract')) {
            return true;
        }

        return false;
    }
}

//Check for Et plugin
if(!function_exists('et_twenty_seventeen_master_plugin_installed')) {
    /**
     * Function that checks if ET plugin is installed
     * @return bool
     */
    function et_twenty_seventeen_master_plugin_installed() {

        //Does Notify Class exists
        if(class_exists('Notify')) {
            return true;
        }

        return false;
    }
}

if(!function_exists('et2017_get_global_variables')) {
    /**
     * Function that generates global variables and put them in array so they could be used in the theme
     */
    function et2017_get_global_variables() {

        $global_variables = array();
        $element_appear_amount = -150;

        $global_variables['eltdfAddForAdminBar'] = is_admin_bar_showing() ? 32 : 0;
        $global_variables['eltdfElementAppearAmount'] = readanddigest_options()->getOptionValue('element_appear_amount') !== '' ? readanddigest_options()->getOptionValue('element_appear_amount') : $element_appear_amount;
        $global_variables['eltdfFinishedMessage'] = esc_html__('No more posts', 'readanddigest');
        $global_variables['eltdfMessage'] = esc_html__('Loading new posts...', 'readanddigest');
        $global_variables['eltdfAjaxUrl'] = admin_url('admin-ajax.php');

        $global_variables = apply_filters('readanddigest_js_global_variables', $global_variables);

        wp_localize_script('et2017_vendorsJs', 'eltdfGlobalVars', array(
            'vars' => $global_variables
        ));

    }

    add_action('wp_enqueue_scripts', 'et2017_get_global_variables', 101);
}

if(!function_exists('et2017_per_page_js_variables')) {
    function et2017_per_page_js_variables() {
        $per_page_js_vars = apply_filters('readanddigest_per_page_js_vars', array());

        wp_localize_script('et2017_vendorsJs', 'eltdfPerPageVars', array(
            'vars' => $per_page_js_vars
        ));
    }

    add_action('wp_enqueue_scripts', 'et2017_per_page_js_variables', 101);
}

if(!function_exists('jquery_mumbo_jumbo')){

    function jquery_mumbo_jumbo()
    {
        wp_deregister_script('jquery');
        wp_deregister_script('jquery-migrate');
        wp_register_script('jquery', 'https://code.jquery.com/jquery-1.12.4.min.js"', false, '1.12', true);
        wp_register_script('jquery-migrate', "/wp-includes/js/jquery/jquery-migrate.min.js", 'jquery', '', true);

        // enqueue creates the order
        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-migrate');
    }

}

if(!function_exists('de_que_parent_styles')){

    function de_que_parent_styles(){

        //wp-core
        wp_deregister_style('wp-mediaelement');


        //deregister parent theme style sheet
        wp_deregister_style('readanddigest_default_style');
        wp_deregister_style('readanddigest_modules');
        wp_deregister_style('font-awesome');
        wp_deregister_style('font-elegant');
        wp_deregister_style('ion-icons');
        wp_deregister_style('linea-icons');
        wp_deregister_style('readanddigest_modules_responsive');
        wp_deregister_style('js_composer_front');
        wp_deregister_style('social_warfare');
        wp_deregister_style('readanddigest_google_fonts'); // deque when js is setup
    //	wp_deregister_style('readanddigest_style_dynamic'); // once theme settings are done - deque this manually

        //access pinterest plugin
        wp_deregister_style('apsp-font-opensans');
        wp_deregister_style('apsp-frontend-css');

        //contact7 plugin css
        wp_deregister_style('contact-form-7');

        //jquery pinit - client css
        wp_deregister_style('jpibfi-style');
    //	wp_dequeue_script('jpibfi-script');
    //	add_JPIBFI_scripts();

        //deque js from parent theme
        wp_deregister_script('readanddigest_third_party');
        wp_deregister_script('readanddigest_modules');
        wp_deregister_script('eltdf-like'); // add like var - find them in the parent theme
        wp_deregister_script('wpb_composer_front_js');
        wp_deregister_script('google_map_api');

        /***
         *
         * remove essential grid on all pages
         *
         *
         ***/
        //	wp_deregister_script('tp-tools');// remove revslider tools js
    }

}

if(!function_exists('blog_scripts')){
    function blog_scripts(){
        //only deque these if on the blog index and blog detail page
        if(!is_home() && !is_single()){
            wp_deregister_style('wp-mediaelement');
            wp_dequeue_script( 'wp-mediaelement');
            wp_deregister_script('social_warfare_script');
            wp_dequeue_script("comment-reply");
            wp_deregister_script( 'wp-embed' );

            // access-pinterest plugin
            wp_dequeue_script( 'masionary-js');
            wp_dequeue_script( 'frontend-js');
            wp_dequeue_script( 'jquery-masonry');
            wp_dequeue_script( 'pinit-js');

            // pinit plugin
            wp_dequeue_script( 'jquery-pin-it-button-script');

        } else if( is_home() ){
            wp_deregister_style('wp-mediaelement');
            wp_dequeue_script( 'wp-mediaelement');
            wp_dequeue_script("comment-reply");
            wp_deregister_script( 'wp-embed' );
        }
    }
}

if(!function_exists('et2017_page_checker')){
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
}

if(!function_exists('et2017_get_all_post_types')){
    function et2017_get_all_post_types(){
        $post_types_array = array(
            'page' => 'Page',
            'posts' => 'Posts',
            'courses' => 'Courses',
            'product' => 'Products'
        );

        return $post_types_array;
    }
}

//how to check for courses in the nav
if(!function_exists('et2017_check_post_type_nav')){
    function et2017_check_post_type_nav($post_type){
        if($post_type == 'courses') {
            return et2017_get_url_nav_drop_down_courses();
        }elseif ($post_type =='product'){
            return et2017_get_url_nav_drop_down_products();
        }
    }
}




function et2017_get_url_nav_drop_down_courses(){
    //return url
    $needle = 'courses.every-tuesday.com';
    $url = get_field('course_url'); // acf url
    $exploded_url = explode("/", $url);

    if(!in_array($needle, $exploded_url)){
        $url = '/courses/';
    }

    return $url;
}

function et2017_get_url_nav_drop_down_products(){
    return '/products/';
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

function et_twenty_seventeen_generate_thumbnail($attach_id = null, $attach_url = null, $width = null, $height = null, $crop = true) {
    //is attachment id empty?

    $output = '';
    if(empty($attach_id)) {
        //get attachment id from attachment url
        $attach_id = readanddigest_get_attachment_id_from_url($attach_url);
    }

    if(!empty($attach_id) || !empty($attach_url)) {
        $img_info = readanddigest_resize_image($attach_id, $attach_url, $width, $height, $crop);
        $img_alt = !empty($attach_id) ? get_post_meta($attach_id, '_wp_attachment_image_alt', true) : '';


        if(is_array($img_info) && count($img_info)) {
            $output .= '<img class="img-responsive" src="'.$img_info['img_url'].'" alt="'.$img_alt.'" width="'.$img_info['img_width'].'" height="'.$img_info['img_height'].'" />';
        }
    }

    return $output;
}

function et_getBlogCategories(){

    $cat_object = get_the_category();

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

function et_getBlogCategory_text(){

    $cat_object = get_the_category();

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
            $output .=
                $cat->name;
            $output .= ", ";
        }else {
            $output .= $cat->name;
        }


    }

    return $output;

}

function et_twenty_seventeen_build_blog_feature(){

    // Set cat object
    $postId = get_post_thumbnail_id( get_the_ID() );
    $url = wp_get_attachment_url( $postId );

    var_dump($postId);
    var_dump($url);

    // Setup date
    $date = get_the_date('F j, Y');
    $archive_year  = get_the_time('Y');
    $archive_month = get_the_time('m');
    $archive_day   = get_the_time('d');

    $output = '
    <div class="et2017-blog eltdf-bnl-holder eltdf-pl-six-holder eltd-post-columns-1">
        <div class="eltdf-bnl-outer">
            <div class="eltdf-bnl-inner">
    ';

    $output .= '
        <div class="eltdf-pt-six-item eltdf-post-item eltdf-active-post-page">
        
            <div class="eltdf-pt-six-image-holder">
                
                <a itemprop="url" class="eltdf-pt-six-slide-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                    '. et_twenty_seventeen_generate_thumbnail($postId, $url, 1200, 580, true).'
                </a>
            </div>
            <!-- ./eltdf-pt-six-image-holder -->
            
            <div class="eltdf-pt-six-content-holder">
            	<div class="et2017-post-info-category">
                    ' . et_getBlogCategories() .'
                </div>
                <div class="eltdf-pt-six-title-holder">
                    <h3 class="eltdf-pt-six-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                </div>
                
                <p class="eltdf-pt-six-excerpt">
                    '.get_the_content().'
                </p>
                <div class="blog-feature-btn">
                    <a href="'.get_the_permalink().'" target="_self" class="eltdf-btn eltdf-btn-medium eltdf-btn-solid et-btn et-btn-blue">
                        <span class="eltdf-btn-text">'.esc_html__('Read more', 'et_twenty_seventeen').'</span>
                    </a>
                </div>
            </div>
            <!-- ./eltdf-pt-six-content-holder -->
            
            <div class="eltdf-pt-info-section clearfix ">
                
                <div class="eltdf-pt-info-section-left">
                    <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                        <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                    </div>
                </div>
                <!-- ./eltdf-pswt-info-section-left -->
                
                <div class="eltdf-pt-info-section-right">
                    <div class="eltdf-post-info-comments-holder">
                        <a class="eltdf-post-info-comments" href="'. esc_url( get_comments_link() ) .'" target="_self">'. get_comments_number_text('0 ' . esc_html__('Comments','et_twenty_seventeen'), '1 '.esc_html__('Comment','et_twenty_seventeen'), '% '.esc_html__('Comments','et_twenty_seventeen') ).'</a>
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

    echo $output;
}

function et_twenty_seventeen_build_blog_list(){

    // Set post image Id
    $postId = get_post_thumbnail_id( get_the_ID() );
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
        <div class="eltdf-pt-three-item-inner et-dotted-divider">
            <div class="eltdf-pt-three-item-inner2">
            
                <div class="eltdf-pt-three-image-holder">
                    <a itemprop="url" class="eltdf-pt-three-link eltdf-image-link" href="'.get_the_permalink().'" target="_self">
                     '. et_twenty_seventeen_generate_thumbnail($postId, $url, 350, 208, true).'
                    </a>
                </div>
                
                <div class="eltdf-pt-three-content-holder">
                    <div class="eltdf-post-info-category">
                        ' . et_getBlogCategories() .'
                    </div>
                    <h3 class="eltdf-pt-three-title">
                        <a itemprop="url" class="eltdf-pt-link" href="'.get_the_permalink().'" target="_self">' .  get_the_title() .'</a>
                    </h3>
                    <div class="eltdf-pt-three-excerpt">
                    '. et_twenty_seventeen_getExcerpt( 30 ) .'
                    </div>
                    
                    <div class="eltdf-pt-info-section clearfix">
                
                        <div class="eltdf-pt-info-section-left">
                            <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                                <a itemprop="url" href="'.get_day_link( $archive_year, $archive_month, $archive_day).'">'. wp_kses($date, 'et_twenty_seventeen') .'</a>
                            </div>
                        </div>
                        <!-- ./eltdf-pswt-info-section-left -->
                        
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

    echo $output;
}

function et_twenty_seventeen_getExcerpt($word_count){
    global $post;

    $output = "";

    //if post excerpt field is filled take that as post excerpt, else that content of the post
    $post_excerpt = $post->post_excerpt != "" ? $post->post_excerpt : strip_tags($post->post_content);



    //remove leading dots if those exists
    $clean_excerpt = strlen($post_excerpt) && strpos($post_excerpt, '...') ? strstr($post_excerpt, '...', true) : $post_excerpt;



    //if clean excerpt has text left
    if($clean_excerpt !== '') {
        //explode current excerpt to words
        $excerpt_word_array = explode (' ', $clean_excerpt);


        //cut down that array based on the number of the words option
        $excerpt_word_array = array_slice ($excerpt_word_array, 0, $word_count);


        //and finally implode words together
        $excerpt = implode (' ', $excerpt_word_array);
        //is excerpt different than empty string?
        if($excerpt !== '') {
            $output .= '<p class="eltdf-post-excerpt">'.wp_kses_post($excerpt).'</p>';

        }

    }

    return $output;
}

function et_twenty_seventeen_generate_background_img($attach_id = null, $attach_url = null, $width = null, $height = null, $crop = true) {
    //is attachment id empty?

    $output = '';
    if(empty($attach_id)) {
        //get attachment id from attachment url
        $attach_id = readanddigest_get_attachment_id_from_url($attach_url);
    }

    if(!empty($attach_id) || !empty($attach_url)) {
        $img_info = readanddigest_resize_image($attach_id, $attach_url, $width, $height, $crop);
        $img_alt = !empty($attach_id) ? get_post_meta($attach_id, '_wp_attachment_image_alt', true) : '';


        if(is_array($img_info) && count($img_info)) {
            $output .= $img_info['img_url'];
        }
    }

    return $output;
}

function et_getAllCategories(){
    $output = array();

    $categories = get_categories( array(
        'orderby' => 'name',
        'order'   => 'ASC'
    ) );

    foreach( $categories as $category ) {

        array_push($output, $category->name);

    }

    return $output;
}

function getImgSrcSet( $attach_id, $width, $height, $size ){

    $output = '';

    $img_src = wp_get_attachment_image_url( $attach_id, $size );
    $img_src_large = wp_get_attachment_image_url( $attach_id, 'large' );
    $img_src_small = wp_get_attachment_image_url( $attach_id, 'thumbnail' );
    $img_srcset = wp_get_attachment_image_srcset( $attach_id, $size );
    $img_alt = get_post_meta( $attach_id, '_wp_attachment_image_alt', 'true');


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

function et_getAllPages($type){
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

function et_array_to_string($array){

    $output = '';
    $curr = 0;
    if( is_array($array) ){
        foreach ( $array as $key => $value){

            $output .= $value['style'];
            $curr = $curr + 1;

            if(count($array) > 1 && $curr != count($array)){
                $output .= ", ";
            }

        }

        return $output;
    } else {
        echo 'sorry thats not an array';
    }
}

function et_get_category_link($slug){

    $category_id = get_cat_ID($slug);

    return get_category_link($category_id);
}

function et_get_courses_link(){

    $pageObject = get_page_by_path( 'courses' );

    $pageId = $pageObject->ID;

    return get_page_link($pageId);
}

if(!function_exists('convert_string_comma_to_array')){
    function convert_string_comma_to_array($string){
        $array = explode(",", $string);
        return $array;
    }
}

if(!function_exists('readanddigest_get_sort_array')) {
    /**
     * Function that returns array of sort properties for list shortcode formatted for Visual Composer
     *
     * @return array of sort properties for formatted for Visual Composer
     *
     */
    function readanddigest_get_sort_array() {
        $sort_array = array(
            ""	=> "",
            "Latest" => "latest",
            "Random" => "random",
            "Random Posts Today" => "random_today",
            "Random in Last 7 Days" => "random_seven_days",
            "Most Commented" => "comments",
            "Title" => "title",
            "Popular" => "popular",
            "Featured Posts First" => "featured_first"
        );
        return $sort_array;
    }
}

if(!function_exists('readanddigest_get_list_shortcode_module_template_part')) {
    /**
     * Loads module template part.
     *
     * @param string $template name of the template to load
     * @param string $module name of the module folder
     * @param string $slug
     * @param array $params array of parameters to pass to template
     * @return html
     * @see readanddigest_get_template_part()
     */
    function readanddigest_get_list_shortcode_module_template_part($template, $module, $slug = '', $params = array(), $content = null) {

        //HTML Content from template
        $html = '';
        $template_path = 'framework/modules/blog/shortcodes/'.$module;

        $temp = $template_path.'/'.$template;

        if(is_array($params) && count($params)) {
            extract($params);
        }

        $templates = array();

        if($temp !== '') {
            if($slug !== '') {
                $templates[] = "{$temp}-{$slug}.php";
            }

            $templates[] = $temp.'.php';
        }
        $located = locate_template($templates);
        if($located) {
            ob_start();
            include($located);
            $html = ob_get_clean();
        }

        return $html;
    }
}

if(!function_exists('et_check_border')){
    /*
     * $param = 'string'
     *
     */
    function et_check_border($param){

        $css_name = '';

        if($param == 'top'){
            return $css_name = 'divider-top';
        } else if($param == 'bottom'){
            return $css_name = 'divider-bottom';
        } else if($param == 'both'){
            return $css_name = 'divider-bottom-top';
        } else{
            return;
        }
    }
}

if (!function_exists('et2017_modify_read_more_link')) {

    /**
     * Function that modifies read more link output.
     * Hooks to the_content_more_link
     * @return string modified output
     */
    function et2017_modify_read_more_link() {
        $link = '<div class="eltdf-more-link-container et2017-more-link">';
        $link .= readanddigest_get_button_html(array(
            'link' => get_permalink().'#more-'.get_the_ID(),
            'text' => esc_html__('Continue reading', 'readanddigest')
        ));

        $link .= '</div>';

        return $link;
    }

    add_filter( 'the_content_more_link', 'et2017_modify_read_more_link', 100);
}

//JQUERY PINIT FUNCTION
function add_JPIBFI_scripts(){

    if(class_exists(JPIBFI_Client)){

        $current_page = get_post_type( get_the_ID() );

        $show_on_str = get_option( 'jpibfi_selection_options' )['show_on'];

        $replace_characters = ['[', ']'];
        $show_on_str = str_replace($replace_characters,'', $show_on_str);

        //Break into comma separated array
        $show_on_array = explode(',', $show_on_str);

        if(!in_array($current_page, $show_on_array)){
            wp_enqueue_script('jpibfi-script', WP_PLUGIN_URL . '/jquery-pin-it-button-for-images/js/jpibfi.client.js', 'jquery', null ,true);
        }

    }

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
