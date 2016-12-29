<?php $sidebar = readanddigest_sidebar_layout(); ?>
<?php get_header(); ?>
<?php
$blog_page_range = readanddigest_get_blog_page_range();
$max_number_of_pages = readanddigest_get_max_number_of_pages();

if ( get_query_var('paged') ) { $paged = get_query_var('paged'); }
elseif ( get_query_var('page') ) { $paged = get_query_var('page'); }
else { $paged = 1; }

//$enable_search_page_sidebar = true;
//if(readanddigest_options()->getOptionValue('enable_search_page_sidebar') === "no"){
//    $enable_search_page_sidebar = false;
//}
?>
<?php readanddigest_get_title(); ?>
    <div class="eltdf-container">
        <?php do_action('readanddigest_after_container_open'); ?>
        <div class="eltdf-container-inner clearfix">
            <div class="eltdf-container">
                <?php do_action('readanddigest_after_container_open'); ?>
                <div class="eltdf-container-inner">
                    <div class="eltdf-search-page-holder">

                        <div class="eltdf-bnl-holder eltdf-pl-one-holder  eltd-post-columns-3" data-base="eltdf_post_layout_one" data-number_of_posts="3" data-column_number="3" data-category_id="4" data-sort="latest" data-thumb_image_size="custom_size" data-thumb_image_width="384" data-thumb_image_height="261" data-display_excerpt="yes" data-excerpt_length="13" data-display_pagination="no" data-paged="1" data-max_pages="5">
                            <div class="eltdf-bnl-outer">
                                <div class="eltdf-bnl-inner">

                                    <?php if(have_posts()) : while ( have_posts() ) : the_post(); ?>

                                        <?php
                                        //setup
                                        $postId = get_the_ID();
                                        $thumbnailId = get_post_thumbnail_id( $postId );
                                        $url = wp_get_attachment_url( $thumbnailId );

                                        $date = get_the_date('F j, Y');
                                        $archive_year  = get_the_time('Y');
                                        $archive_month = get_the_time('m');
                                        $archive_day   = get_the_time('d');

                                        ?>
                                        <div class="eltdf-pt-one-item eltdf-post-item eltdf-active-post-page">
                                            <div class="et-post-item__inner">
                                                <div class="eltdf-pt-one-image-holder">
                                                    <div class="eltdf-pt-one-image-inner-holder">
                                                        <a itemprop="url" class="eltdf-pt-link" href="<?php the_permalink(); ?>" target="_self">
                                                            <?php echo et_twenty_seventeen_generate_thumbnail($thumbnailId, $url, 384, 261, true); ?>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="eltdf-pt-one-content-holder">
                                                    <div class="eltdf-pt-one-title-holder">
                                                        <h3 class="eltdf-pt-one-title">
                                                            <a itemprop="url" class="eltdf-pt-link" href="<?php the_permalink(); ?>" target="_self"><?php the_title(); ?></a>
                                                        </h3>
                                                    </div>
                                                    <div class="eltdf-pt-one-excerpt">
                                                        <?php echo et_twenty_seventeen_getExcerpt( 30 ); ?>
                                                    </div>
                                                </div>
                                                <div class="eltdf-pt-info-section clearfix">
                                                    <div class="eltdf-pt-info-section-left">
                                                        <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                                                            <a itemprop="url" href="<?php echo get_day_link( $archive_year, $archive_month, $archive_day); ?>"><?php echo wp_kses($date, 'et_twenty_seventeen'); ?></a>
                                                        </div>
                                                    </div>
                                                    <div class="eltdf-pt-info-section-right">
                                                        <div class="eltdf-post-info-comments-holder">
                                                            <a class="eltdf-post-info-comments" href="<?php echo esc_url( get_comments_link() ); ?>" target="_self"><?php echo get_comments_number_text('0 ' . esc_html__('Comments','et_twenty_seventeen'), '1 '.esc_html__('Comment','et_twenty_seventeen'), '% '.esc_html__('Comments','et_twenty_seventeen') ) ?></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endwhile; ?>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>

                        <div class="et2017-blog">
                            <?php
                            // Pagination
                            readanddigest_pagination($max_number_of_pages, $blog_page_range, $paged);
                            ?>
                        </div>
                    </div>
                    <?php do_action('readanddigest_page_after_content'); ?>
                    <?php do_action('readanddigest_before_container_close'); ?>
                </div>
            </div>
        </div>
        <?php do_action('readanddigest_before_container_close'); ?>
    </div>
<?php get_footer(); ?>