<?php
/***
 *
 * Password form for the Resource Library
 *
 * $atts = array(
 *  'label' => $label
 * );
 *
 *
 ***/
?>

<div class="vc_row wpb_row vc_inner vc_row-fluid eltdf-section eltdf-content-aligment-left eltdf-grid-section" style="background-color: #BCE3E0">

    <div class="clearfix eltdf-section-inner et-resource-library">
        <div class="eltdf-section-inner-margin clearfix et-resource-library__section-inner shadow-medium" style="max-width: 950px; margin: 0 auto">

            <?php // Login Side - Sign up ?>
            <div class="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-4 et-resource-library__container et-resource-library__login">
                <div class="vc_column_inner">
                    <form action=" <?php echo esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) ?> " method="post">
                        <h3 class="text-center"><?php echo __( "Resource Library" ); ?></h3>
                        <div class="et-resource-library__input-container">
                            <label for=" <?php echo $label; ?> "><?php echo __( "password" ); ?></label>
                            <input name="post_password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" id=" <?php echo $label; ?> " type="password" size="20" maxlength="20" />
                            <input class="eltdf-btn eltdf-btn-medium eltdf-btn-outline et-btn-round-vc" type="submit" name="Submit" value=" <?php echo esc_attr__( "Submit" ); ?>" />
                        </div>
                    </form>
                </div>
            </div>

            <?php // Sell Side - Sign up ?>
            <div class="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-8 et-resource-library__container">
                <div class="vc_column_inner et-resource-library__signup" style="background: #fff;">
                    <h3><?php echo esc_html__('Gain Access to the Resource Library', 'et-twenty-seventeen') ?></h3>
                    <h4><?php echo esc_html__('The Every-Tuesday Resource Library is stocked with over 50 free design and lettering files and is available to subscribers only. By becoming a subscriber, you’ll also receive:', 'et-twenty-seventeen'); ?></h4>


                    <div class="et-flex-list list-wrap">
                        <ul>
                            <li><i class="fa fa-check-circle" aria-hidden="true" style="color: #9e3f93"></i><span><?php echo esc_html__('Special offers on courses and products', 'et-twenty-seventeen') ?></span></li>
                            <li><i class="fa fa-check-circle" aria-hidden="true" style="color: #ef6981"></i><span><?php echo esc_html__('A recap email every month', 'et-twenty-seventeen'); ?></span></li>
                            <li><i class="fa fa-check-circle" aria-hidden="true" style="color: #00d47f"></i><span><?php echo esc_html__('One free design file every month', 'et-twenty-seventeen'); ?></span></li>
                            <li><i class="fa fa-check-circle" aria-hidden="true" style="color: #01b7b8"></i><span><?php echo esc_html__('The Every-Tuesday design Goodie Pack', 'et-twenty-seventeen'); ?></span></li>
                        </ul>
                    </div>

                    <a rel="et_ck_modal_subscriber_generic" href="#et_ck_modal_subscriber_generic" target="_self" class="eltdf-btn eltdf-btn-medium eltdf-btn-outline et-btn-round-vc"><span class="eltdf-btn-text"><?php echo esc_html__('Click here to join!', 'et-twenty-seventeen') ?></span></a>

                </div>
            </div>

            <?php // FORM CONTAINER ?>
            <div class="et_ck_form_container et_ck_modal et_ck_form_v6" id="et_ck_modal_subscriber_generic" data-ck-version="6">
                <div class="et_ck_form et_ck_vertical_subscription_form">

                    <div class="et_ck_header">
                        <h2><?php echo esc_html__('Become an Every-Tuesday Subscriber!', 'et-twenty-seventeen'); ?></h2>
                    </div>
                    <div class="et_ck_content">
                        <div class="et_ck_form_img">
                            <img src="https://every-tuesday.com/wp-content/uploads/2015/04/success-email-icon.png" alt="Subscribe to Every-Tuesday" />
                        </div>
                        <div class="et_ck_form_fields">
                            <div class="et_ck_form_fileds__inner">
                                <div class="et_ck_cta">
                                    <h3><?php echo esc_html__('Where should we send your Every-Tuesday Resource Library password?', 'et-twenty-seventeen') ?></h3></div>
                                <div id="ck_success_msg" style="display:none;">
                                    <p><?php echo esc_html__('Success! Please check your email!', 'et-twenty-seventeen') ?></p>
                                </div>
                                <form id="ck_subscribe_form" class="et_ck_subscribe_form" action="https://app.convertkit.com/landing_pages/173619/subscribe" data-remote="true">
                                    <input type="hidden" value="{&quot;form_style&quot;:&quot;full&quot;,&quot;embed_style&quot;:&quot;modal&quot;,&quot;embed_trigger&quot;:&quot;scroll_percentage&quot;,&quot;scroll_percentage&quot;:&quot;120&quot;,&quot;delay_seconds&quot;:&quot;10&quot;,&quot;display_position&quot;:&quot;br&quot;,&quot;display_devices&quot;:&quot;all&quot;,&quot;days_no_show&quot;:&quot;15&quot;,&quot;converted_behavior&quot;:&quot;show&quot;}" id="ck_form_options">
                                    <input type="hidden" name="id" value="173619" id="landing_page_id">
                                    <div class="et_ck_errorArea">
                                        <div id="ck_error_msg" style="display:none">
                                            <p><?php echo esc_html__('There was an error submitting your subscription. Please try again.', 'et-twenty-seventeen'); ?></p>
                                        </div>
                                    </div>
                                    <div class="et_ck_control_group ck_first_name_field_group">
                                        <input placeholder="First Name" type="text" name="first_name" class="et_ck_first_name" id="ck_firstNameField">
                                    </div>
                                    <div class="et_ck_control_group ck_email_field_group">
                                        <input placeholder="Email Address" type="email" name="email" class="et_ck_email_address" id="ck_emailField" required>
                                    </div>
                                    <div class="et_ck_control_group ck_captcha2_h_field_group ck-captcha2-h" style="position: absolute !important;left: -999em !important;">
                                        <label class="et_ck_label" for="ck_captcha2_h"><?php echo esc_html__('We use this field to detect spam bots. If you fill this in, you will be marked as a spammer.', 'et-twenty-seventeen') ?></label>
                                        <input type="text" name="captcha2_h" class="ck-captcha2-h" id="ck_captcha2_h">
                                    </div>
                                    <p class="et_ck_button_container">
                                        <button class="subscribe_button et_ck_subscribe_button btn fields" id="ck_subscribe_button"><?php echo esc_html__('Subscribe', 'et-twenty-seventeen') ?></button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>

</div>
