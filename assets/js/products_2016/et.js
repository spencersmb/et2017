jQuery(document).ready(function($) {
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

});