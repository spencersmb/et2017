<?php
/**
 * Footer template part
 */
?>
</div> <!-- close div.content_inner -->
</div>  <!-- close div.content -->

<footer>

    <?php if(is_active_sidebar('footer_column_4')) {
        dynamic_sidebar( 'footer_column_1' );
    } ?>

    <div class="eltdf-grid">
        <div class="eltdf-footer-inner clearfix et-footer">
            <div class="eltdf-container">

                <div class="eltdf-container-inner">
                    <div class="footer-col footer-col-1">
                        <?php et_twenty_seventeen_get_logo() ?>
                    </div>
                    <div class="footer-col footer-col-2">
                        <?php if(has_nav_menu( 'footer-menu-1' )): ?>
                            <div class="footer-nav">
                                <h6><?php echo esc_html__('PRODUCT','et-twenty-seventeen') ?></h6>
                                <?php wp_nav_menu( array(
                                        'menu' => 'footer-menu-1',
                                        'theme_location' => 'footer-1',
                                        'container' => 'false',
                                        'depth' => 1
                                    )
                                ); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="footer-col footer-col-3">
                        <?php if(has_nav_menu( 'footer-menu-2' )): ?>
                            <div class="footer-nav">
                                <h6><?php echo esc_html__('Contact','et-twenty-seventeen') ?></h6>
                                <?php wp_nav_menu( array(
                                        'menu' => 'footer-menu-2',
                                        'theme_location' => 'footer-2',
                                        'container' => 'false',
                                        'depth' => 1
                                    )
                                ); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="footer-col footer-col-4">
                        <h6><?php echo esc_html__('FOLLOW US','et-twenty-seventeen') ?></h6>
                        <?php if(is_active_sidebar('footer_column_3')) {
                            dynamic_sidebar( 'footer_column_3' );
                        } ?>
                    </div>
                    <div class="footer-col footer-col-5">
                        <h6><?php echo esc_html__('LATEST COURSE','et-twenty-seventeen') ?></h6>
                        <?php if(is_active_sidebar('footer_column_4')) {
                            dynamic_sidebar( 'footer_column_4' );
                        } ?>
                    </div>
                </div>

            </div>

        </div>
    </div>
</footer>

</div> <!-- close div.eltdf-wrapper-inner  -->
</div> <!-- close div.eltdf-wrapper -->
<?php wp_footer(); ?>
</body>
</html>