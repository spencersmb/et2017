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
                <?php if( $count == 1 && $current_page == 1): ?>

                <div class="et2017-blog-feature-item">
                    <?php et_twenty_seventeen_build_blog_feature(); ?>
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