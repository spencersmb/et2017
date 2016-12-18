<?php
global $allowed_html;
?>

<li>
    <span>
        <i class="fa fa-check-circle" aria-hidden="true" style="color: <?php echo esc_attr($icon_color); ?>"></i>
        <?php echo wp_kses($text, $allowed_html, 'et-twenty-seventeen'); ?>
    </span>
</li>