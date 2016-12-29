<?php
    global $allowed_html;
    $url = '';
    ($has_custom_link == 'yes') ? $url = $custom_url : $url = get_page_link($page_link);
?>

<div class="flex-xs flex-sm-4">
    <div class="et-grid-one__item">
        <h2 style="color: <?php echo esc_attr($headline_color); ?>"><span class="circle-dot" style="background-color: <?php echo esc_attr($icon_bg_color); ?>"><i class="fa <?php echo esc_attr($fa_icon); ?>" style="color: <?php echo esc_attr($icon_color); ?>"></i></span><?php echo wp_kses($item_headline_text, 'et-twenty-seventeen'); ?></h2>
        <p><?php echo wp_kses_post($content, 'et-twenty-seventeen'); ?></p>
        <a href="<?php echo esc_url($url); ?>"><?php echo wp_kses($link_text, $allowed_html, 'et-twenty-seventeen'); ?><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
    </div>
</div>
