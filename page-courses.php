<?php
/* Template Name: Courses page */

get_header(); ?>

<!-- course header -->
<div class="archive-box products-page">

    <h1>Online Courses</h1>

</div>

<div class="container product-container product-list">
    <div class="products-content">
        <div class="fullwidth" ng-controller="ProductListCtrl as vm">

            <!-- portfolio items -->
            <div class="flex-row flex-row-md">

                <!-- custom loop for projects -->
                <?php
                $args = array(
                    //matches the name of the CPT we made
                    'post_type' => 'courses',
//                    'orderby' => 'ASC',
                    'posts_per_page' => 30
                );
                //pass args to new WP_Query
                $the_query = new WP_Query( $args );
                ?>

                <?php if( have_posts()): while( $the_query->have_posts() ): $the_query->the_post(); ?>



                    <?php
                    $course_url = get_field('course_url');
                    $tags = get_field('course_tags');

                    //wp_get_attachment_url gets url and pass in a function to get the post thumbnail ID passing in the ID of the post.
                    $featured_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );

                    ?>

                    <div class="flex-xs flex-sm-4 flex-md-6 product-item">
                        <div class="product-content">
                            <!-- echo out our own url for the image -->
                            <div class="product-img">

                                <a href="<?php echo $course_url; ?>" target="_blank">
                                    <div class="product-hover">

<!--                                        <div class="action"><span class="more-button">View</span></div>-->
                                        <div class="overlay"></div>
                                        <div class="play-btn">
                                            <i class="fa fa-play-circle fa-4x"></i>
                                        </div>
                                    </div>
                                    <img class="img-responsive" src="<?php echo $featured_image; ?>" alt="<?php echo $product['featured_image_src']['alt']; ?>"/>
                                </a>
                            </div>
                            <div class="product-details course-desc">

                                <h2><?php the_title(); ?></h2>

                                <div class="course-tags">
                                    <ul>
                                        <?php


                                        $tags_count = count($tags);
                                        $curr_tag = 0;

                                        while ($curr_tag < $tags_count):

                                            $tag = $tags[$curr_tag]['tag'];

                                            echo '

                                                <li>
                                                    '. $tag .'
                                                </li>
                                            ';

                                            $curr_tag++;
                                        endwhile;
                                        ?>

                                    </ul>
                                </div>

                                <div class="products-cta">
                                    <!-- View course btn-->
                                    <a href="<?php echo $course_url; ?>" target="_blank">
                                        <span class="more-button" style="width:auto;">View Course</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                <?php endwhile; endif; ?>
            </div> <!-- end row -->

        </div> <!-- end main -->
    </div><!-- end content -->
</div><!-- end container -->

<?php get_footer(); ?>