<?php
/**
 * The template part for displaying a message that posts cannot be found.
 *
 * @package Neat
 */
?>

<section class="aa_no_results">

	<?php esc_html__( 'Nothing Found', 'neat' ); ?>

	<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

		<div class="single-headline">
			<h2><?php  esc_html__( 'Ready to publish your first post?', 'neat')?> <a href="<?php esc_url( admin_url( 'post-new.php' ) ) ?>"><?php esc_html__('Get started here', 'neat') ?></a></h2>
		</div>
		
	<?php elseif ( is_search() ) : ?>

		<div class="single-headline">
			<h2><?php esc_html__( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'neat' ); ?></h2>
		</div>
		<?php get_search_form(); ?>

	<?php else : ?>
		<div class="single-headline">
			<h2><?php esc_html__( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'neat' ); ?></h2>
		</div>
		<?php get_search_form(); ?>

	<?php endif; ?>


</section>
<!-- /.aa_no_results -->
