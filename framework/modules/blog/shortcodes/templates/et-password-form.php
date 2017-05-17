<?php
/***
 *
 * Generic Password Form
 *
 * $atts = array(
 *  'label' => $label
 *  'title' => $title
 * );
 *
 *
 ***/
?>
<div class="vc_row wpb_row vc_inner vc_row-fluid eltdf-section eltdf-content-aligment-left eltdf-grid-section" style="background-color: #BCE3E0">

    <div class="clearfix eltdf-section-inner et-resource-library">
        <div class="eltdf-section-inner-margin clearfix et-resource-library__section-inner shadow-medium" style="max-width: 350px; margin: 0 auto">

            <?php // Login Side - Sign up ?>
            <div class="wpb_column vc_column_container vc_col-sm-12 et-resource-library__container et-resource-library__login">
                <div class="vc_column_inner">
                    <form action=" <?php echo esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) ?> " method="post">
                        <h3 class="text-center"><?php echo wp_kses($title, 'et-twenty-seventeen') . esc_html__(" Login"); ?></h3>
                        <div class="et-resource-library__input-container">
                            <label for=" <?php echo $label; ?> "><?php echo __( "password" ); ?></label>
                            <input name="post_password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" id=" <?php echo $label; ?> " type="password" size="20" maxlength="20" />
                            <input class="eltdf-btn eltdf-btn-medium eltdf-btn-outline et-btn-round-vc" type="submit" name="Submit" value=" <?php echo esc_attr__( "Submit" ); ?>" />
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </div>

</div>
