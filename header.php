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

    <?php if(is_front_page()): ?>
        <style>
            .nc_socialPanel{
                display: none !important;
            }
        </style>
    <?php endif; ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
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
                        readanddigest_icon_collections()->getBackToTopIcon('linea-icons');
                    ?>
                </span>
            </a>
        <?php } ?>

        <div class="eltdf-content" <?php readanddigest_content_elem_style_attr(); ?>>
            <div class="eltdf-content-inner">