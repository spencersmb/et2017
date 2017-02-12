<li role="presentation" class="<?php echo esc_attr( ($params['count'] == 0) ? 'active': '' ) ?>">
    <a
        href="#<?php echo esc_attr(strtolower($params['id'])) ?>"
        aria-controls="standard"
        role="tab"
        data-toggle="tab">
            <?php echo wp_kses(ucfirst($params['id']), 'et-twenty-seventeen') ?>
    </a>
</li>