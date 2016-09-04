<?php
/*
Template Name: Full Width
*/
?>
<?php
$sidebar = readanddigest_sidebar_layout(); ?>

<?php get_header(); ?>

<?php if(!is_front_page()): ?>
    <?php readanddigest_get_title(); ?>
<?php endif; ?>

<?php get_template_part('slider'); ?>

    <div class="eltdf-full-width">
        <div class="eltdf-full-width-inner">
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
    </div>
<?php get_footer(); ?>