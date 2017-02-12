<?php $license_card = $params['license_card_builder'][0]?>
<div role="tabpanel" class="tab-pane fade <?php echo esc_attr( ($params['count'] == 0) ? 'active in': '' ) ?>" id="<?php echo esc_attr(strtolower($params['id'])) ?>">
    <!-- <?php echo esc_attr(strtolower($params['id'])) ?> Content -->

    <div class="etlicense-modal flex-row flex-row-md">
    
        <div class="flex-xs et-flex-md-4">
            <div class="etlicense-modal__card">
                <div class="card__item " style="background-color:<?php echo esc_attr( $license_card['card_color']); ?>">

                    <div class="card__item--content">

                        <h2><?php echo wp_kses( $license_card['title'], 'et-twenty-seventeen'); ?></h2>
                        <h3 class="subtitle"><?php echo wp_kses( $license_card['description'], 'et-twenty-seventeen'); ?></h3>

                        <?php if(count($license_card['bullet_items']) > 0): ?>

                            <ul class="card__list">

                                <?php foreach ($license_card['bullet_items'] as $item):  ?>

                                    <li>
                                        <i class="fa <?php echo esc_attr($item['bullet_icon']); ?>" aria-hidden="true"></i>
                                        <?php echo wp_kses( $item['bullet_text'], 'et-twenty-seventeen'); ?>
                                    </li>

                                <?php endforeach; ?>

                            </ul>

                        <?php endif; ?>

                    </div>

                </div>
            </div>
        </div>

        <div class="flex-xs et-flex-md-8">
            <div class="etlicense-modal__content">
                <div class="etlicense-modal__header">
                    <h2><?php echo wp_kses($params['title'], 'et-twenty-seventeen') ?></h2>
                    <p><?php echo wp_kses($params['sub_text'], 'et-twenty-seventeen') ?></p>
                </div>
                <div class="etlicense-modal__body">
                    <?php echo wp_kses_post($params['description'], 'et-twenty-seventeen') ?>
                </div>
            </div>
        </div>



    </div>


</div>