<?php

class et_twenty_seventeen_nav_search_widget extends WP_Widget {

    /**
     * Sets up the widget
     */
    public function __construct() {

        /* Widget settings. */
        $widget_ops = array(
            'classname' => 'et2017_nav_search_widget',
            'description' => esc_html__('A widget that has animated Search bar', 'et2017_nav_search_widget')
        );

        /* Widget control settings. */
        $control_ops = array(
            'width' => 250, 'height' => 350,
            'id_base' => 'et2017_nav_search_widget'
        );

        /* Create the widget. */
        parent::__construct( 'et2017_nav_search_widget', esc_html__('Et2017: Pop out Search', 'et2017_nav_search_widget'), $widget_ops, $control_ops );
    }

    /**
     * How to display the widget on the screen.
     */
    function widget( $args, $instance ) {
        extract( $args );

        /* Before widget (defined by themes). */
        echo $before_widget;

        ?>

        <div class="class-widget">

            <div class="et2017-navsearch">
                <div class="et2017-navsearch__btn">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>
                <div class="et2017-navsearch__bar">
                    <?php echo get_search_form(false); ?>
                </div>
            </div>

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

        return $instance;
    }


    function form( $instance ) {

    }
}