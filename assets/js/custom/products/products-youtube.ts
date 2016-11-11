const $ = jQuery;
import Utils from "../partials/utils";

/**
 *
 * Youtube modal functionality
 * ......................
 * 
 *
 * */


class ProductsYoutubeBtn {
  youtube_btn: NodeList;
  youtubeLink: string;
  youtube_player: Element;

  constructor() {
    this.youtube_btn = document.querySelectorAll( '.et-box-item__youtube' );
    this.youtube_player = document.getElementById('youtube-player');
  }

  addEvents(){
    [].slice.call( this.youtube_btn ).forEach( ( inputEl ) => {

      // events:
      inputEl.addEventListener( 'click', this.onYouTubeOpen.bind(this) );
    } );
  }

  onYouTubeOpen( ev ){
    ev.preventDefault();

    this.youtubeLink = ev.target.parentNode.getAttribute('data-youtube');

    //Add zindex to html elements to add custom Overlay
    this.addZ();

    let popup = document.querySelector('.you-tube-pop');

    //send to modal
    this.setSrc( popup, this.youtubeLink );


    //active modal
    setTimeout(() => {
      // $('.modal-body').addClass('active');
      this.addClassElement('.modal-body', 'active');

    },300);
    
    //activate custom overlay
    this.addOverlay();

  }

  addClassElement( el: string, className: string ){

    document.querySelector(el).classList.add(className);

  }

  removeClassElement( el: string, className: string ){

    document.querySelector(el).classList.remove(className);

  }

  addZ() {
    this.addClassElement('.eltdf-content', 'products-zindex');
    this.addClassElement('.eltdf-wrapper', 'products-zindex');
  }

  removeZ() {
    this.removeClassElement('.eltdf-content.products-zindex', 'products-zindex');
    this.removeClassElement('.eltdf-wrapper.products-zindex', 'products-zindex');
  }

  onYoutubeClose(){
    this.removeClassElement('.modal-body', 'active');
    this.removeOverlay();
  }

  onYoutubeCloseBtn(){
    let youtubeModal = document.getElementById('et_youtube_close_modal');

    youtubeModal.addEventListener('click', this.youtubeStopVideo.bind(this));
  }

  youtubeStopVideo(){
    let videoSrc = this.youtube_player.getAttribute('src');

    this.youtube_player.setAttribute('src','');
    this.youtube_player.setAttribute('src', videoSrc);
  }

  addOverlay(){
    // var overlay = '<div class="lic-overlay"></div>';
    let overlay = document.createElement('div');
    overlay.setAttribute('class', 'et-product-overlay');
    overlay.setAttribute('id', 'et-product-overlay');

    //onclick add our own overlay to body
    // $(".eltdf-full-width").append(overlay);
    document.querySelector('.eltdf-full-width').appendChild(overlay);

    //hide sticky header
    // $(".eltdf-sticky-header").addClass("modal-open");
    this.addClassElement('.eltdf-sticky-header', 'modal-open');
  }

  removeOverlay() {

    this.removeZ();

    // $(".lic-overlay").remove();
    let overlay = document.getElementById('et-product-overlay');
    overlay.parentNode.removeChild(overlay);


    //animate sticky header back in
    this.removeClassElement('.eltdf-sticky-header', 'modal-open');

  }

  setSrc( el: Element, value: string ){

    setTimeout(() => {

      el.setAttribute('src', value);
      // $('.you-tube-pop').attr('src', youtubeLink);
    },100);

  }

  init(): void {
    console.log("Products YouTube Btn Loaded");
    this.addEvents();
    this.onYoutubeCloseBtn();

    $('#et_youtubeModal').on('hidden.bs.modal', this.onYoutubeClose.bind(this));
  }

}

let Products_Youtube_btn = new ProductsYoutubeBtn();

export default Products_Youtube_btn;