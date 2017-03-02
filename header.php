<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php
    /**
     * @see readanddigest_header_meta() - hooked with 10
     * @see eltd_user_scalable - hooked with 10
     */
    ?>

	<?php do_action('readanddigest_header_meta'); ?>

	<?php wp_head(); ?>
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,300,400,500,600,700,800,900" rel="stylesheet">
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-45577926-1', 'auto');
        ga('send', 'pageview');

    </script>
    <?php if(is_front_page()): ?>
        <style>
            .nc_socialPanel{
                display: none !important;
            }
        </style>
    <?php endif; ?>
    <style>
        .dots-bg-top{
            background-repeat: repeat-x!important;
        }
    </style>

</head>
<?php

?>
<body <?php body_class(et2017_page_checker()); ?> itemscope itemtype="http://schema.org/WebPage">
<!-- FB Like BTN -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
<!-- ./FB Like BTN -->
<?php readanddigest_get_side_area(); ?>

<?php if(is_page_template('page-product-react.php') || is_page('products')): ?>

    <div
        id="app"
        data-name="Hawthorne Script"
        data-placeholder="Font preview Input"
        data-styles="Regular, Italic"
        data-sidebar="true">
    </div>

<?php endif; ?>

<div class="eltdf-wrapper">
    <div class="eltdf-wrapper-inner">
        <?php readanddigest_get_header(); ?>

        <?php if(readanddigest_options()->getOptionValue('show_back_button') == "yes") { ?>
            <a id='eltdf-back-to-top'  href='#'>
                <span class="eltdf-icon-stack">
                     <?php
                        readanddigest_icon_collections()->getBackToTopIcon('font-awesome');
                    ?>
                </span>
            </a>
        <?php } ?>

        <div class="eltdf-content" <?php readanddigest_content_elem_style_attr(); ?>>
            <div class="eltdf-content-inner">