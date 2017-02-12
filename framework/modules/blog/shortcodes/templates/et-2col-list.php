<?php
global $allowed_html;
?>

<li>
    <i class="fa fa-check-circle" aria-hidden="true" style="color: <?php echo esc_attr($icon_color); ?>"></i>
    <span>
        <?php echo wp_kses($text, $allowed_html, 'et-twenty-seventeen'); ?>
    </span>
</li>