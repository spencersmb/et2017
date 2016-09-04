jQuery(document).ready(function($) {

    $('.product-item').each(function(){
        var gumroadData = $(this).find('.gumroad-button');
        gumroadData.addClass('more-button buy-now');
        gumroadData.removeClass('gumroad-button');
    });

    $('.youtube-link').click(function(evt){
        evt.preventDefault();

        var youtubeLink = $(this).data('youtube');
        addZ();

        setTimeout(function(){
            //send to modal
            $('.you-tube-pop').attr('src', youtubeLink);
        },100);

        setTimeout(function(){
            $('.modal-body').addClass('active');
        },300);
    });

    // Write code to add temp classes to .eltdf-content & .eltdf-wrapper to remove zindex
    $('.licenseModal').on('click', function(){
        //console.log('click');
        addZ();
        setTimeout(function(){
            $('.modal-body').addClass('active');
        },300);
    });

    $('#myModal').on('hidden.bs.modal', function (e) {
        $('.modal-body').removeClass('active');
        removeZ();
    });

    //Product dropdown
    var productContainer = $('.products-cta'),
      animating = false,
      addToCartBtn = $('.add-to-cart');

    $('body').on('click', function(event){
        //if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
        if( !$(event.target).is('li') ) {
            deactivateCustomization();
        }
    });

    function addZ() {
        $(".eltdf-content").addClass("products-zindex");
        $(".eltdf-wrapper").addClass("products-zindex");
    }

    function removeZ() {
        $(".eltdf-content").removeClass("products-zindex");
        $(".eltdf-wrapper").removeClass("products-zindex");
    }

    function initDropdown( items ){
        items.each( function(){

            var $this = $(this),
              selectBox = $this.find('[data-type="select"]'),
              licenseBox = $this.find('.select'),
              initialPrices,
              addtoCart = $this.find('.add-to-cart');

            //get prices on load
            initialPrices = licenseBox.find('.stnd').data('link');
            addtoCart.find('a').attr('href', initialPrices);


            selectBox.on('click', function(event){
                console.log('click');
                var selected = $(this);

                //toggle is-open
                selected.toggleClass('is-open');
                resetCustomization(selected);

                //if event is on an li
                if( $(event.target).is('li') ){
                    var activeItem = $(event.target),
                      index = activeItem.index() + 1,
                      gumroadPrice,
                      gumroadLink;

                    //Add active
                    activeItem.addClass('active').siblings().removeClass('active');

                    gumroadLink = selected.find('.active').data('link');
                    gumroadPrice = selected.find('.active').data('price');

                    //determine what index to add and show
                    selected.removeClass('selected-1 selected-2 selected-3').addClass('selected-' + index);

                    //set gumroad link from LI and set it on the buynow
                    selected.siblings('.add-to-cart').find('a').attr('href', gumroadLink);

                    //Set price
                    selected.parents('.product-details').find('.product-price').text(gumroadPrice);
                }
            });
        });
    }

    function resetCustomization(target){

        //closes the ul if left open or user is not interacting with them
        target.parents('.product-item').siblings('div').find('[data-type="select"]').removeClass('is-open');
    }

    function deactivateCustomization() {
        productContainer.find('[data-type="select"]').removeClass('is-open');
    }

    //initialize
    initDropdown(productContainer);

    //detect click on the add-to-cart button
    addToCartBtn.on('click', function(event) {

        var selectedButton = $(this);


        if(!animating) {
            //animate if not already animating
            animating =  true;
            resetCustomization(addToCartBtn);

            selectedButton.addClass('is-added').find('path').eq(0).animate({
                //draw the check icon
                'stroke-dashoffset':0
            }, 800, function(){
                setTimeout(function(){
                    //updateCart();
                    selectedButton.removeClass('is-added').find('a').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                        //wait for the end of the transition to reset the check icon
                        addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                        animating =  false;

                    });

                    //if( $('.no-csstransitions').length > 0 ) {
                    //    // check if browser doesn't support css transitions
                    //    selectedButton.find('path').eq(0).css('stroke-dashoffset', '19.79');
                    //    animating =  false;
                    //}
                }, 600);
            });
        }
    });

    //stop youtube video on close
    $('#close-modal').on('click', function (evt) {
        var video = $("#youtube-player").attr("src");
        $("#youtube-player").attr("src","");
        $("#youtube-player").attr("src",video);
    });


});