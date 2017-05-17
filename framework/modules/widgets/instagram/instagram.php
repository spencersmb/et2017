<?php
/**
 * Plugin Name: ET2017 Instagram
 */

/**
 * load widget scripts.
 */
function et_twenty_seventeen_instagram_scripts() {
    wp_register_script('et2017-instagram', ET2017_ROOT . '/assets/react/instagram-widget/assets/js/bundle.js', 'jquery', '', true);
    wp_enqueue_script('et2017-instagram'); // Enqueue it!
}

class et_twenty_seventeen_instagram_widget extends WP_Widget {


    /**
     * Sets up the widget
     */
    public function __construct() {

        /* Widget settings. */
        $widget_ops = array(
            'classname' => 'et_twenty_seventeen_instagram_widget',
            'description' => esc_html__('A widget that displays course instagram', 'et_twenty_seventeen_instagram_widget')
        );

        /* Widget control settings. */
        $control_ops = array(
            'width' => 250, 'height' => 350,
            'id_base' => 'et_twenty_seventeen_instagram_widget'
        );

        /* Create the widget. */
        parent::__construct( 'et_twenty_seventeen_instagram_widget', esc_html__('Et2017: Instagram', 'et_twenty_seventeen_instagram_widget'), $widget_ops, $control_ops );
    }



    /**
     * How to display the widget on the screen.
     */
    function widget( $args, $instance ) {
        extract( $args );
        et_twenty_seventeen_instagram_scripts();

        /* Before widget (defined by themes). */
        echo $before_widget;

        ?>

        <div id="instaApp" class="class-widget-instagram" data-path="<?php echo esc_url(ET2017_ROOT . '/assets/react/instagram-widget/assets/') ?>">

        </div>

        <?php

        /* After widget (defined by themes). */
        echo $after_widget;
    }

    /**
     * Update the widget settings.
     */
    function update( $new_instance, $old_instance ) {

    }


    function form( $instance ) {

    }
}