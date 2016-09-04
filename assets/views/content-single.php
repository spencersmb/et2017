<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.WordPress.org/Template_Hierarchy
 *
 * @package Neat
 */

$css_array = array(
	'container-fluid',
	'aa_single'
);
$thumbnail_id = get_post_thumbnail_id( $post->ID );
$thumbnail_url = wp_get_attachment_url( $thumbnail_id );
$thumbnail_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', 'true');
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($css_array); ?> >

	<h1 class="aa_single__title"><?php the_title(); ?></h1>

	<div class="aa_single__meta">

		<?php neat_posted_on(); ?>

	</div>
	<!-- /.aa_single__meta -->

	<div class="aa_single__content">

		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="aa_pagelinks">' . esc_html__( 'Pages:', 'neat' ),
				'after'  => '</div>',
			) );
		?>

	</div>
	<!-- /.aa_single__content -->

</article>
<!-- /.aa_single -->
