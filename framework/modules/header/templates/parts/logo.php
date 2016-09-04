<?php do_action('readanddigest_before_site_logo');?>

    <div class="eltdf-logo-wrapper">
        <a href="<?php echo esc_url(home_url('/')); ?>" >
            <img class="eltdf-normal-logo" src="<?php echo esc_url($logo_image); ?>" alt="<?php esc_html_e('logo','readanddigest'); ?>"/>
            <?php if(!empty($logo_image_dark)){ ?><img class="eltdf-dark-logo" src="<?php echo esc_url($logo_image_dark); ?>" alt="<?php esc_html_e('dark logo','readanddigest'); ?>"/><?php } ?>
            <?php if(!empty($logo_image_light)){ ?><img class="eltdf-light-logo" src="<?php echo esc_url($logo_image_light); ?>" alt="<?php esc_html_e('light logo','readanddigest'); ?>"/><?php } ?>
            <?php if(!empty($logo_image_transparent)){ ?><img class="eltdf-transparent-logo" src="<?php echo esc_url($logo_image_transparent); ?>" alt="<?php esc_html_e('transparent logo','readanddigest'); ?>"/><?php } ?>
        </a>
    </div>

<?php do_action('readanddigest_after_site_logo'); ?>