<?php
add_action( 'init', 'cptui_register_my_cpts' );
function cptui_register_my_cpts() {
    $labels = array(
        "name" => __( 'Products', '' ),
        "singular_name" => __( 'Product', '' ),
    );

    $args = array(
        "label" => __( 'Products', '' ),
        "labels" => $labels,
        "description" => "Add Gumroad products here",
        "public" => true,
        "publicly_queryable" => true,
        "show_ui" => true,
        "show_in_rest" => false,
        "rest_base" => "",
        "has_archive" => false,
        "show_in_menu" => true,
        "exclude_from_search" => true,
        "capability_type" => "post",
        "map_meta_cap" => true,
        "hierarchical" => false,
        "rewrite" => array( "slug" => "product", "with_front" => true ),
        "query_var" => true,
        'taxonomies'          => array( 'category' ),
        "supports" => array( "title", "thumbnail", "post-formats" ),					);
    register_post_type( "product", $args );

    $labels = array(
        "name" => __( 'Courses', '' ),
        "singular_name" => __( 'Courses', '' ),
    );

    $args = array(
        "label" => __( 'Courses', '' ),
        "labels" => $labels,
        "description" => "",
        "public" => true,
        "publicly_queryable" => true,
        "show_ui" => true,
        "show_in_rest" => false,
        "rest_base" => "",
        "has_archive" => false,
        "show_in_menu" => true,
        "exclude_from_search" => true,
        "capability_type" => "post",
        "map_meta_cap" => true,
        "hierarchical" => false,
        "rewrite" => array( "slug" => "courses", "with_front" => true ),
        "query_var" => true,
        'taxonomies'          => array( 'category' ),
        "supports" => array( "title", "editor", "thumbnail" ),					);
    register_post_type( "courses", $args );

// End of cptui_register_my_cpts()
}

