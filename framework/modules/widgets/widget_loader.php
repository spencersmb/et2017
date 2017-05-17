<?php
//Call function early to load class for other widgets from Parent Theme
if(!function_exists('readanddigest_load_widget_class')) {
    /**
     * Loades widget class file.
     *
     */
    function readanddigest_load_widget_class(){
        include_once ELATED_FRAMEWORK_MODULES_ROOT_DIR.'/widgets/lib/widget-class.php';
    }

    add_action('readanddigest_before_options_map', 'readanddigest_load_widget_class');
}

if(!function_exists('et2017_load_widget_modules')) {
    /**
     * Loades all modules by going through all folders that are placed directly in modules folder
     * and loads load.php file in each. Hooks to readanddigest_after_options_map action
     *
     * @see http://php.net/manual/en/function.glob.php
     */
    function et2017_load_widget_modules() {

        foreach(glob( get_stylesheet_directory() . '/framework/modules/widgets/*/load.php') as $module_load) {
            include_once $module_load;
        }
    }

    add_action('readanddigest_before_options_map', 'et2017_load_widget_modules');
}

if (!function_exists('et2017_register_widgets')) {

    function et2017_register_widgets() {

        $widgets = array(
            'ET2017_SearchForm',
            'ET2017PostLayoutOne',
            'et_twenty_seventeen_about_widget',
            'et_twenty_seventeen_instagram_widget',
            'et_twenty_seventeen_link_widget',
            'et_twenty_seventeen_link_widget',
            'et_twenty_seventeen_nav_search_widget',
        );

        foreach ($widgets as $widget) {
            register_widget($widget);
        }
    }
}



add_action('widgets_init', 'et2017_register_widgets');