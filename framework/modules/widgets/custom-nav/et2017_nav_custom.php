<?php

/**
 * Widget that adds post layout six
 *
 * Class PostLayoutOne
 */

require get_template_directory() . '/framework/lib/eltd.layout.inc';
require get_template_directory() . '/framework/lib/eltd.framework.inc';
require get_template_directory() . '/framework/modules/widgets/lib/widget-class.php';

add_action( 'widgets_init', 'et_twenty_seventeen_post_layout_load_widget' );

function et_twenty_seventeen_post_layout_load_widget() {
    register_widget( 'ET2017PostLayoutOne' );
}



class ET2017PostLayoutOne extends ReadAndDigestWidget {
    /**
     * Set basic widget options and call parent class construct
     */
    public function __construct() {
        parent::__construct(
            'et2017_post_layout_one_widget', // Base ID
            'ET2017 Post Layout One Widget' // Name
        );

        $this->setParams();
    }

    /**
     * Sets widget options
     */
    protected function setParams() {
        $this->params = array(
            array(
                'type' => 'textfield',
                'title' => 'Widget Title',
                'name' => 'widget_title'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Style',
                'name' => 'general_style',
                'options' => array(
                    '' => 'Default',
                    'dark' => 'Dark',
                    'light' => 'Light',
                ),
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => 'Number of Posts',
                'name' => 'number_of_posts'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Number of Columns',
                'name' => 'column_number',
                'options' => array(
                    '' => 'Default',
                    1 => 'One Column',
                    2 => 'Two Columns',
                    3 => 'Three Columns',
                    4 => 'Four Columns',
                    5 => 'Five Columns'
                ),
                'description' => ''
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Post Type',
                'name' => 'post_type',
                'options' => et2017_get_all_post_types(),
                'description' => ''
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Category',
                'name' => 'category_id',
                'options' => array_flip(readanddigest_get_post_categories_VC()),
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => 'Category Slug',
                'name' => 'category_slug',
                'description' => 'Leave empty for all or use comma for list'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Choose Author',
                'name' => 'author_id',
                'options' => array_flip(readanddigest_get_authors_VC()),
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => 'Tag Slug',
                'name' => 'tag_slug',
                'description' => 'Leave empty for all or use comma for list'
            ),
            array(
                'type' => 'textfield',
                'title' => 'Include Posts',
                'name' => 'post_in',
                'description' => 'Enter the IDs of the posts you want to display'
            ),
            array(
                'type' => 'textfield',
                'title' => 'Exclude Posts',
                'name' => 'post_not_in',
                'description' => 'Enter the IDs of the posts you want to exclude'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Sort',
                'name' => 'sort',
                'options' => array_flip(readanddigest_get_sort_array()),
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => 'Image Width (px)',
                'name' => 'thumb_image_width',
                'description' => 'Set custom image width (px)',
            ),
            array(
                'type' => 'textfield',
                'title' => 'Image Height (px)',
                'name' => 'thumb_image_height',
                'description' => 'Set custom image height (px)',
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Title Tag',
                'name' => 'title_tag',
                'options' => array(
                    'h3' => 'h3',
                    'h2' => 'h2',
                    'h4' => 'h4',
                    'h5' => 'h5',
                    'h6' => 'h6'
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Date',
                'name' => 'display_date',
                'options' => array(
                    'yes' => 'Yes',
                    'no' => 'No'
                )
            ),
            array(
                'type' => 'textfield',
                'title' => 'Date Format',
                'name' => 'date_format',
                'description' => 'Enter the date format that you want to display'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Category',
                'name' => 'display_category',
                'options' => array(
                    'yes' => 'Yes',
                    'no' => 'No',
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Author',
                'name' => 'display_author',
                'options' => array(
                    'no' => 'No',
                    'yes' => 'Yes',
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Comments',
                'name' => 'display_comments',
                'options' => array(
                    'no' => 'No',
                    'yes' => 'Yes',
                ),
                'description' => '',
                'group' => 'Non-Featured Item'
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Like',
                'name' => 'display_like',
                'options' => array(
                    'no' => 'No',
                    'yes' => 'Yes',
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Excerpt',
                'name' => 'display_excerpt',
                'options' => array(
                    'yes' => 'Yes',
                    'no' => 'No'
                )
            ),
            array(
                'type' => 'textfield',
                'title' => 'Max. Excerpt Length',
                'name' => 'excerpt_length',
                'description' => 'Enter max of words that can be shown for excerpt',
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Post Type Icon',
                'name' => 'display_post_type_icon',
                'options' => array(
                    'no' => 'No',
                    'yes' => 'Yes'
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => 'Display Featured Icon',
                'name' => 'display_featured_icon',
                'options' => array(
                    'no' => 'No',
                    'yes' => 'Yes',
                )
            )
        );
    }

    /**
     * Generates widget's HTML
     *
     * @param array $args args from widget area
     * @param array $instance widget's options
     */
    public function widget($args, $instance) {

        extract($args);

        //prepare variables
        $params = '';

        $instance['thumb_image_size'] = 'custom_size';
        $instance['thumb_image_width'] = $instance['thumb_image_width'] != '' ? $instance['thumb_image_width'] : '480';
        $instance['thumb_image_height'] = $instance['thumb_image_height'] != '' ? $instance['thumb_image_height'] : '300';

        //is instance empty?
        if(is_array($instance) && count($instance)) {
            //generate shortcode params
            foreach($instance as $key => $value) {
                $params .= " $key = '$value' ";
            }

        }

        $args['before_title'] = '<h6 class="et-cat cat-red">';
        $args['after_title'] = '</h6>';
        
        echo '<div class="widget eltdf-plw-one">';

        if (!empty($instance['widget_title']) && $instance['widget_title'] !== '') {
            echo $args['before_title'].$instance['widget_title'].$args['after_title'];
        }

        echo '<div class="eltdf-bnl-holder eltdf-pl-one-holder eltd-post-columns-4">';
        echo '<div class="eltdf-bnl-outer">';
        echo '<div class="eltdf-bnl-inner">';

        //finally call the shortcode
        echo do_shortcode("[et2017eltdf_post_layout_one $params]"); // XSS OK

        echo '</div>'; //close div.eltdf-bnl-inner
        echo '</div>'; //close div.eltdf-bnl-outer
        echo '</div>'; //close div.eltdf-bnl-holder eltdf-pl-one-holder eltd-post-columns-4
        echo '</div>'; //close div.eltdf-plw-one
    }
}