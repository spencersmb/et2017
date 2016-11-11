
<?php
//VARIABLES
$course_url = get_field('course_url');
$tags = get_field('course_tags');

//wp_get_attachment_url gets url and pass in a function to get the post thumbnail ID passing in the ID of the post.
$image_id = get_post_thumbnail_id( get_the_ID() );
$featured_image = wp_get_attachment_url( get_post_thumbnail_id( get_the_ID() ) );
$image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);

?>

<div class="flex-xs flex-sm-4 flex-md-6 et-box-item">
    <div class="et-box-item__inner">

        <div class="et-box-item__content courses">
            <a href="<?php echo esc_url($course_url); ?>" target="_blank">
                <div class="et-box-item__img">

                    <img class="img-responsive" src="<?php echo esc_url($featured_image); ?>" alt="<?php echo esc_attr($image_alt); ?>"/>

                </div><!-- ./image -->

                <div class="et-box-item__description">

                    <h2><?php the_title(); ?></h2>

                    <div class="et-box-item__cta">
                        <!-- View course btn-->

                            <span class="more-button" style="width:auto;"><?php echo esc_html__('View Course', 'et-twenty-seventeen') ?></span>
                    </div>
                </div>
            </a>
        </div>

    </div>

</div>