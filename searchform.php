<?php
/**
 * Template for displaying search forms
 *
 * @package WordPress
 */
?>
<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <div role="search">
        <input
            type="text"
            placeholder="<?php echo esc_html__( 'Search...', 'et_twenty_seventeen'); ?>"
            value="<?php echo get_search_query(); ?>"
            name="s" title="<?php echo esc_html__( 'Search for:', 'et_twenty_seventeen'); ?>">
<!--        <input type="submit" class="eltdf-search-widget-icon" value="U">-->
        <button class="eltdf-search-submit" type="submit" value="Search"><span class="ion-ios-search"></span></button>
    </div>
</form>
