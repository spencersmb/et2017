<?php do_action('readanddigest_before_mobile_navigation'); ?>

<nav class="eltdf-mobile-nav">
    <div class="eltdf-grid">
        <?php wp_nav_menu(array(
            'theme_location' => 'mobile-navigation' ,
            'container'  => '',
            'container_class' => '',
            'menu_class' => '',
            'menu_id' => '',
            'fallback_cb' => 'top_navigation_fallback',
            'link_before' => '<span>',
            'link_after' => '</span>',
            'items_wrap'      => '<ul id="%1$s" class="%2$s"><li>'. get_search_form(false) .'</li>%3$s</ul>',
            'walker' => new ReadAndDigestMobileNavigationWalker()
//            'walker' => new Et_2017_ReadAndDigestMobileNavigationWalker()
        )); ?>
    </div>
</nav>

<?php do_action('readanddigest_after_mobile_navigation'); ?>