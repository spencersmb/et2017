<?php

/**
 * Widget that adds search form
 *
 * Class ReadAndDigestSearchForm
 */
class ET2017_SearchForm extends ReadAndDigestWidget {
    /**
     * Set basic widget options and call parent class construct
     */
    public function __construct() {
        parent::__construct(
            'et2017_search_form', // Base ID
            'ET2017 Search Form' // Name
        );

        $this->setParams();
    }

    /**
     * Sets widget options
     */
    protected function setParams() {
        $this->params = array(

        );
    }

    /**
     * Generates widget's HTML
     *
     * @param array $args args from widget area
     * @param array $instance widget's options
     */
    public function widget($args, $instance) {

        ?>

        <div class="widget">
            <h6>SEARCH THE BLOG</h6>
            <form class="eltdf-search-menu-holder et-search-menu-holder" id="searchform-<?php echo rand();?>" action="<?php echo esc_url(home_url('/')); ?>" method="get">
                <div class="eltdf-form-holder">
                    <div class="eltdf-column-left">
                        <input type="text" placeholder="<?php esc_html_e('Search Here', 'readanddigest'); ?>" name="s" class="eltdf-search-field" autocomplete="off" />
                    </div>
                    <div class="eltdf-column-right">
                        <button class="eltdf-search-submit" type="submit" value="Search"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>

    <?php }
}

if (!function_exists('et2017_bulk_register_widgets')) {

    function et2017_bulk_register_widgets() {

        $widgets = array(
            'ET2017_SearchForm'
        );

        foreach ($widgets as $widget) {
            register_widget($widget);
        }
    }
}

add_action('widgets_init', 'et2017_bulk_register_widgets');