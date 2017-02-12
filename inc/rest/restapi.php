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

    function get_licenses_data( WP_REST_Request $request ){

        $url = get_site_url();
        $postid = url_to_postid( $url . '/products' );

        $data = get_field('license_items', $postid);

        $content = '';
        
        $content .= $this->build_license_nav($data);

        $content .= $this->build_license_content($data);
        
        $output = array(
            'nav' => $this->build_license_nav($data),
            'content' => $content
        );

        //array(
            //nav => 'UL template string'
            //data => 'modal string'
        //);
        // Then on the JS side just set the data



        return $output;
    }

    public function register_routes(){
        register_rest_route(
            'product-licenses/v1',
            '/license/',
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_licenses_data' )
            )
        );

    }

    function build_license_nav( $data ){
        //$data is an array
        $output = '';
        $count = 0;

        if(count($data) > 0){

            $output .= '<ul class="nav nav-tabs nav-justified" role="tablist">';

            foreach ($data as $license_item){
                $license_item['count'] = $count;
                $output .= readanddigest_get_list_shortcode_module_template_part('et-license-modal-nav', 'templates', '', $license_item);
                $count++;
            }

            $output .= '</ul>';
        }

        return $output;

    }

    function build_license_content( $data ){
        //$data is an array
        $output = '';

        //keep track of first item to automatically add activate class
        $count = 0;
        if(count($data) > 0){

            $output .= '<div class="tab-content">';

            foreach ($data as $license_item){
                $license_item['count'] = $count;
                $output .= readanddigest_get_list_shortcode_module_template_part('et-license-modal-content', 'templates', '', $license_item);
                $count++;
            }

            $output .= '</div>';
        }

        return $output;

    }

}

global $et_rest_endpoints;
$et_rest_endpoints = new et_register_endpoints();