<?php
/**
 * Template part for displaying posts on index pages.
 *
 * @link https://codex.WordPress.org/Template_Hierarchy
 *
 * @package Neat
 */
$post_classes = array(
	'col-xs-12',
	'col-sm-6',
	'no-padding',
	'post-thumb',
	'aa_content'
);

$cat = false;
$cat_name = get_the_category(); //$cat_name[0]->name
if( !empty($cat_name) ){
	$cat = true;
	$cat_id = $cat_name[0]->cat_ID;
	$cat_link = get_category_link( $cat_id );
}

$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' , false );
?>


<article id="post-<?php the_ID(); ?>" class="<?php echo implode(' ', $post_classes) ?>">

	<h1 class="aa_content__title">
		<a href="<?php esc_url(the_permalink()); ?>">

			<?php the_title(); ?>

		</a>
	</h1>


	<div class="aa_content__content">

		<?php the_excerpt('<span class="more-button">'. esc_html__('Continue Reading', 'neat') .'</span>', 'neat'); ?>
		<?php
			//paginated links inside post
			wp_link_pages( array(
				'before' => '<div class="aa_pagelinks">' . esc_html__( 'Pages:', 'neat' ),
				'after'  => '</div>',
			) );
		?>

	</div>
	<!-- /.aa_content__content -->

</article>
<!-- /.aa_content -->