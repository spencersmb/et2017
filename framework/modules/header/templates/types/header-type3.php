<?php

if(!function_exists('et_twenty_seventeen_get_logo')) {
    /**
     * Loads logo HTML
     *
     * @param $slug
     */
    function et_twenty_seventeen_get_logo($slug = '') {

        $slug = $slug !== '' ? $slug : 'header-type3';

        if($slug == 'sticky'){
            $logo_image = readanddigest_options()->getOptionValue('logo_image_sticky');
        }else{
            $logo_image = readanddigest_options()->getOptionValue('logo_image');
        }

        $logo_image_dark = readanddigest_options()->getOptionValue('logo_image_dark');
        $logo_image_light = readanddigest_options()->getOptionValue('logo_image_light');
        $logo_image_transparent = readanddigest_options()->getOptionValue('logo_image_transparent');

        //get logo image dimensions and set style attribute for image link.
        $logo_dimensions = readanddigest_get_image_dimensions($logo_image);

        $logo_height = '';
        $logo_styles = '';
        if(is_array($logo_dimensions) && array_key_exists('height', $logo_dimensions)) {
            $logo_height = $logo_dimensions['height'];
            $logo_styles = 'height: '.intval($logo_height / 2).'px;'; //divided with 2 because of retina screens
        }

        $params = array(
            'logo_image'  => $logo_image,
        );

        readanddigest_get_module_template_part('templates/parts/logo', 'header', $slug, $params);
    }
}

?>

<?php do_action('readanddigest_before_page_header'); ?>

    <header class="eltdf-page-header">

        <div class="eltdf-logo-area">
            <div class="eltdf-grid">

                <?php

                    if(et_twenty_seventeen_master_plugin_installed()){
                        //render Notifications
                        echo Notify::init();
                    }

                ?>

                <div class="eltdf-vertical-align-containers logo-primary-container">
                    <?php et_twenty_seventeen_get_logo(); ?>
                    <div class="site-description">
                        <p><?php echo esc_html__('LETTERING + GRAPHIC', 'et_twenty_seventeen') ?><br><?php echo esc_html__('DESIGN LEARNING', 'et_twenty_seventeen') ?></p>
                    </div>

                </div>

            </div>
        </div>
        <div class="eltdf-menu-area">
            <div class="eltdf-grid">
                <div class="eltdf-vertical-align-containers et-dotted-divider">
                    <div class="eltdf-position-left">
                        <div class="eltdf-position-left-inner">
                            <?php readanddigest_get_main_menu(); ?>
                        </div>
                    </div>
                    <div class="eltdf-position-right">
                        <div class="eltdf-position-right-inner">
                            <?php if(is_active_sidebar('eltdf-right-from-main-menu')) : ?>
                                <?php dynamic_sidebar('eltdf-right-from-main-menu'); ?>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php if($show_sticky) {
            readanddigest_get_sticky_header('centered');
        } ?>
    </header>

<?php do_action('readanddigest_after_page_header'); ?>