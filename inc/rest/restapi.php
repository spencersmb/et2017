<?php
class et_register_endpoints{

    function __construct()
    {
        // this gets called automatically when a class gets created
        add_action('rest_api_init', array($this, 'register_routes' ) );
    }

    function et_license_callback( WP_REST_Request $request ){

        $url = get_site_url();
        $postid = url_to_postid( $url . '/products' );
        $standard_data = get_field('standard_content', $postid);
        $extended_data = get_field('extended', $postid);

        $standard_string = str_replace(array("\r\n", "\r", "\n"), "", $standard_data);
        $extended_string = str_replace(array("\r\n", "\r", "\n"), "", $extended_data);

        $test = array(
            'standard' => wp_kses_post($standard_string),
            'extended' => wp_kses_post($extended_string)
        );

        return $test;
    }

    public function register_routes(){
        register_rest_route(
            'product-licenses/v1',
            '/license/',
            array(
                'methods' => 'GET',
                'callback' => array($this, 'et_license_callback' )
            )
        );

    }

    function init(){

    }

}

global $et_rest_endpoints;
$et_rest_endpoints = new et_register_endpoints();