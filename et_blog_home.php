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

?>
    <div class="eltdf-container">
        <?php do_action('readanddigest_after_container_open'); ?>
        <div class="eltdf-container-inner clearfix">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <?php if(($sidebar == 'default')||($sidebar == '')) : ?>
                    <?php the_content(); ?>
                    <?php do_action('readanddigest_page_after_content'); ?>
                <?php elseif($sidebar == 'sidebar-33-right' || $sidebar == 'sidebar-25-right'): ?>
                    <div <?php echo readanddigest_sidebar_columns_class(); ?>>
                        <div class="eltdf-column1 eltdf-content-left-from-sidebar">
                            <div class="eltdf-column-inner">
                                <?php the_content(); ?>
                                <?php do_action('readanddigest_page_after_content'); ?>
                            </div>
                        </div>
                        <div class="eltdf-column2">
                            <?php get_sidebar(); ?>
                        </div>
                    </div>
                <?php elseif($sidebar == 'sidebar-33-left' || $sidebar == 'sidebar-25-left'): ?>
                    <div <?php echo readanddigest_sidebar_columns_class(); ?>>
                        <div class="eltdf-column1">
                            <?php get_sidebar(); ?>
                        </div>
                        <div class="eltdf-column2 eltdf-content-right-from-sidebar">
                            <div class="eltdf-column-inner">
                                <?php the_content(); ?>
                                <?php do_action('readanddigest_page_after_content'); ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endwhile; ?>
            <?php endif; ?>
        </div>
        <?php
            readanddigest_pagination($max_number_of_pages, $blog_page_range, $paged);
        ?>
        <?php do_action('readanddigest_before_container_close'); ?>
    </div>
<?php get_footer(); ?>