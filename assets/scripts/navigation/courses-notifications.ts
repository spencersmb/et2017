import * as $ from "jquery";
declare var TimelineLite: any;
declare var TweenLite: any;
declare var et2017_ajax_object: any;

class SearchNavComponent {

  container: JQuery;
  trigger: JQuery;
  isOpen: boolean;
  nav: JQuery;
  
  constructor() {
    this.container = $('.et2017-notify__container');
    this.trigger = $('.et2017-notify__trigger');
    this.isOpen = false;
    this.nav = $('#et2017-notify-nav').find('ul');
  }

  toggleNotifyBtn(e: Event): void{
    
    // console.log("target: ", e.target);
    // console.log("Selector: ", document.querySelector('.fa-times'));

    switch(this.isOpen){

      // if not open -> open
      case false:
        e.preventDefault();
        this.openNav();
        this.ajaxCall();
      break;

      //IF OPEN
      case true:

        switch(e.target){

          // if open & target is X btn -> close
          case document.querySelector('.et2017-notify__trigger'):
            e.preventDefault();
            this.closeNav();
            break;

          // if open & target is icon in X btn -> close
          case document.querySelector('.fa-times'):
            e.preventDefault();
            this.closeNav();
            break;

          case document.querySelector('.fa-graduation-cap'):
            e.preventDefault();
            this.closeNav();
            break;

          // if open & target is background with notify open -> close
          case document.querySelector('.et2017-notify__container.et2017-notify--open'):
            e.preventDefault();
            this.closeNav();
            break;

          //else do what the link wants
          default:
            break;

        }

      break;

    }

  }

  openNav(){
    this.nav.addClass('is-visible');
    this.container.addClass('et2017-notify--open');
    this.isOpen = !this.isOpen;
  }

  closeNav(){
    this.nav.removeClass('is-visible');
    this.container.removeClass('et2017-notify--open');
    this.isOpen = !this.isOpen;
  }

  ajaxCall(){

    
    if($('.et2017-notify__count').length > 0){

      //php will handle setting the proper cookies
      //et2017_ajax_object is set using localize_script in the etp-plugin Admin class
      $.post(et2017_ajax_object.ajaxurl, {
        action: 'etp_notify_refresh',
        nonce: et2017_ajax_object.ajax_nonce
      }, (response: any) => {

        // convert the response as a JSON Object instead of a string
        let server: any = JSON.parse(response);

        if(server.data === 'success'){
          //on success hide the bubble
          $('.et2017-notify__count').remove();
        }

      }	)
      .fail(function(response) {
        alert('Error: ' + response.responseText);
      });

    }

  }
  
  init(): void {
    $('#et2017-notify').on("click", this.toggleNotifyBtn.bind(this));
  }
}

let SearchNav = new SearchNavComponent();

export default SearchNav;