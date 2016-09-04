/*global jQuery */
/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */

;(function( $ ){

    'use strict';

    $.fn.fitVids = function( options ) {
        var settings = {
            customSelector: null,
            ignore: null
        };

        if(!document.getElementById('fit-vids-style')) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);
        }

        if ( options ) {
            $.extend( settings, options );
        }

        return this.each(function(){
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var ignoreList = '.fitvidsignore';

            if(settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore;
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

            $allVideos.each(function(count){
                var $this = $(this);
                if($this.parents(ignoreList).length > 0) {
                    return; // Disable FitVids on this video.
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
                {
                    $this.attr('height', 9);
                    $this.attr('width', 16);
                }
                var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if(!$this.attr('id')){
                    var videoID = 'fitvid' + count;
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

jQuery(document).ready(function($) {

	"use strict";
	
	// Mobile search
	$('#top-search i.search-toggle').on('click', function ( e ) {
		e.preventDefault();
    	$('.show-search').slideToggle('fast');
    });
	
	// BXslider
	//$('.featured-area .bxslider').bxSlider({
	//	pager: false,
	//	auto: true,
	//	pause: 6000,
	//	onSliderLoad: function(){
	//		$("#sideslides").css("visibility", "visible");
	//	  }
	//});
	//$('.post-img .bxslider').bxSlider({
	//  adaptiveHeight: true,
	//  mode: 'fade',
	//  pager: false,
	//  captions: true
	//});
	
	// Menu
	$('#nav-wrapper .menu').slicknav({
		prependTo:'.menu-mobile',
		label:'',
		allowParentLinks: true
	});
	
	// Fitvids
	$(document).ready(function(){
		// Target your .container, .wrapper, .post, etc.
		$(".container").fitVids();
	});

    //START SPENCER
    //Get current position of Nav element
    var currentPosition = $(window).scrollTop(),
        storeFront = $('.store-front');

    $(window).on('scroll', function(){

        //console.log(currentPosition);
        (!window.requestAnimationFrame) ? checkStoreFront() : window.requestAnimationFrame(checkStoreFront);

    });

    function checkStoreFront(){
        currentPosition = $(window).scrollTop();

        if(currentPosition < 200){
            //remove hidden
            storeFront.removeClass('store-hidden');
        }else{
            //add store-hidden
            storeFront.addClass('store-hidden');

        }
    }

    checkStoreFront();

    //PRODUCTS

    $('.product-item').each(function(){
        var gumroadData = $(this).find('.gumroad-button');
        gumroadData.addClass('more-button buy-now');
        gumroadData.removeClass('gumroad-button');
    });

    $('.youtube-link').click(function(evt){
        evt.preventDefault();

        var youtubeLink = $(this).data('youtube');

        setTimeout(function(){
            //send to modal
            $('.you-tube-pop').attr('src', youtubeLink);
        },100);

        setTimeout(function(){
            $('.modal-body').addClass('active');
        },300);
    });

    $('.licenseModal').on('click', function(){
        //console.log('click');
        setTimeout(function(){
            $('.modal-body').addClass('active');
        },300);
    });

    $('#myModal').on('hidden.bs.modal', function (e) {
        $('.modal-body').removeClass('active');
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