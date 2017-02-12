<?php

/***** Set params for posts on 404 page *****/

$params = '';

$number_of_posts = 6;
$params .= ' number_of_posts="'.$number_of_posts.'"';

$column_number = 3;
$params .= ' column_number="'.$column_number.'"';

$display_excerpt = 'yes';
$params .= ' display_excerpt="'.$display_excerpt.'"';
?>
<?php get_header(); ?>

    <div class="eltdf-container">
        <?php do_action('readanddigest_after_container_open'); ?>
        <div class="eltdf-container-inner eltdf-404-page">
            <div class="eltdf-page-not-found">
                <h1>
                    <?php if(readanddigest_options()->getOptionValue('404_title')){
                        echo esc_html(readanddigest_options()->getOptionValue('404_title'));
                    } else {
                        esc_html_e('Sorry.......404 Error Page', 'readanddigest');
                    } ?>
                </h1>
                <h3>
                    <?php if(readanddigest_options()->getOptionValue('404_text')){
                        echo esc_html(readanddigest_options()->getOptionValue('404_text'));
                    } else {
                        esc_html_e("Sorry, but the page you are looking for doesn't exist.", "et-twenty-seventeen");
                    } ?>
                </h3>
                <?php
                $button_params = array();
                if (readanddigest_options()->getOptionValue('404_back_to_home')){
                    $button_params['text'] = readanddigest_options()->getOptionValue('404_back_to_home');
                } else {
                    $button_params['text'] = "Back To Home Page";
                }
                $button_params['type'] = 'solid';
                $button_params['size'] = 'large';
                $button_params['link'] = esc_url(home_url('/'));
                $button_params['target'] = '_self';
                //  echo readanddigest_execute_shortcode('eltdf_button', $button_params);
                
                ?>

                <div
                    style="margin-top:40px;"
                    class="btn-padding-lg text-center wpb_column vc_column_container vc_col-sm-12">
                    <div class="vc_column-inner ">
                        <div class="wpb_wrapper">
                            <a href="/blog" target="_self" class="eltdf-btn eltdf-btn-medium eltdf-btn-outline et-btn-round-vc">
                                <span class="eltdf-btn-text">Back To Home Page</span>
                            </a>
                        </div>
                    </div>
                </div>


            </div>
            <?php echo do_shortcode("[eltdf_post_layout_one $params]"); ?>
        </div>
        <?php do_action('readanddigest_before_container_close'); ?>
    </div>
<?php get_footer(); ?>