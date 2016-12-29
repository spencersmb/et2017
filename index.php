<?php
/* Template Name: ET2017 Blog */

$sidebar = readanddigest_sidebar_layout(); ?>
<?php get_header(); ?>
<?php readanddigest_get_title(); ?>
<?php get_template_part('slider'); ?>
<?php

$blog_page_range = readanddigest_get_blog_page_range();
$max_number_of_pages = readanddigest_get_max_number_of_pages();

if ( get_query_var('paged') ) { $paged = get_query_var('paged'); }
elseif ( get_query_var('page') ) { $paged = get_query_var('page'); }
else { $paged = 1; }

$current_page = max(1, get_query_var('paged'));

?>
    <div class="eltdf-container">
        <?php do_action('readanddigest_after_container_open'); ?>

        <div class="eltdf-container-inner clearfix">

            <div class="eltdf-two-columns-75-25  eltdf-content-has-sidebar clearfix et2017-blog">

            <?php

                $display_like = 'no';
                if(readanddigest_options()->getOptionValue('blog_list_like') !== ''){
                    $display_like = readanddigest_options()->getOptionValue('blog_list_like');
                }
    
                $params['display_like'] = $display_like;
    
                $count = 0;
            
            ?>

            <div class="eltdf-column1 eltdf-content-left-from-sidebar ">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <?php $count++; ?>
                <?php $postId = get_the_ID(); ?>
                <?php if( $count == 1 && $current_page == 1): ?>

                <?php

                    $thumbnailId = get_post_thumbnail_id( $postId );
                    $url = wp_get_attachment_url( $thumbnailId );

                    $date = get_the_date('F j, Y');
                    $archive_year  = get_the_time('Y');
                    $archive_month = get_the_time('m');
                    $archive_day   = get_the_time('d');
                    ?>

                <div class="et2017-blog-feature-item">
                    <div class="et2017-blog eltdf-bnl-holder eltdf-pl-six-holder eltd-post-columns-1">
                        <div class="eltdf-bnl-outer">
                            <div class="eltdf-bnl-inner">

                                <div class="eltdf-pt-six-item eltdf-post-item eltdf-active-post-page">

                                    <div class="eltdf-pt-six-image-holder">

                                        <a itemprop="url" class="eltdf-pt-six-slide-link eltdf-image-link" href="<?php the_permalink(); ?>" target="_self">
                                            <?php echo et_twenty_seventeen_generate_thumbnail($thumbnailId, $url, 1200, 580, true); ?>
                                        </a>
                                    </div>
                                    <!-- ./eltdf-pt-six-image-holder -->

                                    <div class="eltdf-pt-six-content-holder">
                                        <div class="et2017-post-info-category">
                                            <?php echo et_getBlogCategories(); ?>
                                        </div>
                                        <div class="eltdef-pt-six-title-holder">
                                            <h3 class="eltdf-pt-six-title">
                                                <a itemprop="url" class="eltdf-pt-link" href="<?php the_permalink(); ?>" target="_self"><?php the_title(); ?></a>
                                            </h3>
                                        </div>

                                        <p class="eltdf-pt-six-excerpt">
                                            <?php the_content(); ?>
                                        </p>
                                    </div>
                                    <!-- ./eltdf-pt-six-content-holder -->

                                    <div class="eltdf-pt-info-section clearfix">

                                        <div class="eltdf-pt-info-section-left">
                                            <div itemprop="dateCreated" class="eltdf-post-info-date entry-date updated">
                                                <a itemprop="url" href="<?php get_day_link( $archive_year, $archive_month, $archive_day) ?>"><?php echo wp_kses($date, 'et_twenty_seventeen') ?></a>
                                            </div>
                                        </div>
                                        <!-- ./eltdf-pswt-info-section-left -->

                                        <div class="eltdf-pt-info-section-right">
                                            <div class="eltdf-post-info-comments-holder">
                                                <a class="eltdf-post-info-comments" href="<?php esc_url( get_comments_link() ) ?>" target="_self"><?php echo get_comments_number_text('0 ' . esc_html__('Comments','et_twenty_seventeen'), '1 '.esc_html__('Comment','et_twenty_seventeen'), '% '.esc_html__('Comments','et_twenty_seventeen') ); ?></a>
                                            </div>
                                        </div>
                                        <!-- ./eltdf-pswt-info-section-right -->

                                    </div>
                                    <!-- ./eltdf-pswt-info-section -->

                                </div>
                                <!-- ./eltdf-pt-six-item eltdf-post-item -->

                            </div><!-- ./ eltdf-bnl-inner -->
                        </div><!-- ./ eltdf-bnl-outer -->
                    </div><!-- ./eltdf-bnl-holder -->
                </div>


                <?php else: ?>

                    <?php et_twenty_seventeen_build_blog_list(); ?>

                <?php endif; ?>
                
                
            <?php endwhile; ?>
            <?php endif; ?>


                <?php
                // Pagination
                readanddigest_pagination($max_number_of_pages, $blog_page_range, $paged);
                ?>

            </div><!-- ./eltdf-column1 eltdf-content-left-from-sidebar -->

            <div class="eltdf-column2">
                <div class="eltdf-column-inner">
                    <?php get_sidebar(); ?>
                </div>
            </div>


            </div><!-- ./eltdf-two-columns-66-33 -->
        </div><!-- ./eltdf-container-inner -->
        
        <?php do_action('readanddigest_before_container_close'); ?>
        
    </div><!-- ./eltdf-container -->
<?php get_footer(); ?>