<?php
/**
 * Plugin Name: Class Link
 */

class et_twenty_seventeen_link_widget extends WP_Widget {

    /**
     * Sets up the widget
     */
    public function __construct() {

        /* Widget settings. */
        $widget_ops = array(
            'classname' => 'et_twenty_seventeen_link_widget',
            'description' => esc_html__('A widget that displays course link', 'et_twenty_seventeen_link_widget')
        );

        /* Widget control settings. */
        $control_ops = array(
            'width' => 250, 'height' => 350,
            'id_base' => 'et_twenty_seventeen_link_widget'
        );

        /* Create the widget. */
        parent::__construct( 'et_twenty_seventeen_link_widget', esc_html__('Et2017: Link', 'et_twenty_seventeen_link_widget'), $widget_ops, $control_ops );
    }

    /**
     * How to display the widget on the screen.
     */
    function widget( $args, $instance ) {
        extract( $args );

        $shortcode_args = array(
            'li' => array(
                'style'=> array(),
                'class'=> array()
            ),
            'i' => array(
                'style'=> array(),
                'class'=> array()
            ),
            'a' => array(
                'style'=> array(),
                'class'=> array()
            ),
            'span' => array(
                'style'=> array(),
                'class'=> array()
            )
        );

        /* Our variables from the widget settings. */
        $title = apply_filters('widget_title', $instance['title'] );
        $url = $instance['url'];

        /* Before widget (defined by themes). */
        echo $before_widget;

        ?>

        <div class="class-widget">

            <?php if($url) : ?>
                <div class="class-widget-link">
                    <a href="<?php echo esc_url($url); ?>"><span class="class-link-image"><img src="<?php echo ET2017_ROOT ?>/assets/images/video_play.png" alt="Watch"></span><span class="class-link-text"><?php echo wp_kses($title, 'et_twenty_seventeen_link_widget'); ?></span></a>
                </div>
            <?php endif; ?>

        </div>

        <?php

        /* After widget (defined by themes). */
        echo $after_widget;
    }

    /**
     * Update the widget settings.
     */
    function update( $new_instance, $old_instance ) {
        $instance = $old_instance;

        /* Strip tags for title and name to remove HTML (important for text inputs). */
        $instance['title'] = strip_tags( $new_instance['title'] );
        $instance['url'] = $new_instance['url'];

        return $instance;
    }


    function form( $instance ) {

        /* Set up some default widget settings. */
        $defaults = array(
            'title' => '',
            'url' => '',
        );

        $instance = wp_parse_args( (array) $instance, $defaults ); ?>

        <!-- Widget Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php echo wp_kses('Title of class:', 'et_twenty_seventeen_link_widget') ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" style="width:96%;" />
        </p>

        <!-- url -->
        <p>
            <label for="<?php echo $this->get_field_id( 'url' ); ?>"><?php echo wp_kses('Link Url to class', 'et_twenty_seventeen_link_widget') ?></label>
            <input id="<?php echo $this->get_field_id( 'url' ); ?>" name="<?php echo $this->get_field_name( 'url' ); ?>" value="<?php echo $instance['url']; ?>" style="width:96%;" />
        </p>

        <?php
    }
}