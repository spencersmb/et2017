<?php get_header(); ?>
<?php 

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
} ?>


<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <?php get_template_part('slider'); ?>
        <?php et_twenty_seventeen_blog_image(); ?>
        <div class="eltdf-container">
            <?php do_action('readanddigest_after_container_open'); ?>
            <div class="eltdf-container-inner">
                <?php readanddigest_get_blog_single(); ?>
            </div>
            <?php do_action('readanddigest_before_container_close'); ?>
        </div>
    <?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>