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

    <div class="eltdf-full-width <?php echo (is_page('products') ? 'et-product-page' : ''); ?>">
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

    <?php if(is_page('products')): ?>
    <!-- Modal for products page-->
    <div class="modal fade" id="et_youtubeModal" tabindex="-1" role="dialog" aria-labelledby="et_youtubeModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="et_youtube_close_modal" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe id="youtube-player" class="you-tube-pop embed-responsive-item" src="" allowfullscreen></iframe>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <?php endif; ?>
<?php get_footer(); ?>