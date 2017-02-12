const $ = jQuery;
/**
 *
 * Youtube modal functionality
 * ......................
 * 
 *
 * */

interface Window {
  et_products: any;
}
declare var window: Window;


class ProductsModalsClass {
  youtube_btn: NodeList;
  youtubeLink: string;
  youtube_player: any;
  window: Window;
  touched: boolean;
  licenseData: any;

  licenseModal: any;
  licenseModalBody: JQuery;
  licenseModalBtn: JQuery;
  lic_modal_tabContent: JQuery;
  localVariable: string;

  constructor() {
    this.youtube_btn = document.querySelectorAll( '.et-box-item__youtube' );
    this.youtube_player = document.getElementById('youtube-player');
    this.window = window;
    this.touched = false;

    this.localVariable = 'et_Licenses';
    this.licenseModal = $('#licenseModal');
    this.licenseModalBody = this.licenseModal.find(".modal-body");
    this.licenseModalBtn = $('.licenseModal');
    this.lic_modal_tabContent = this.licenseModal.find('.tab-content');
    this.licenseData = localStorage.getItem(this.localVariable);


  }

  addEvents(){

    //Add youtube button click handlers
    [].slice.call( this.youtube_btn ).forEach( ( inputEl:Element ) => {

      // events:
      inputEl.addEventListener( 'click', this.onYouTubeOpen.bind(this) );
    } );
    $('#et_youtubeModal').on('hidden.bs.modal', this.onYoutubeClose.bind(this));

    //Add License click handlers
    this.licenseModalBtn.on('click', this.onModalOpen.bind(this));
    this.licenseModal.on('hidden.bs.modal', this.onModalClose.bind(this));
    
  }

  onYouTubeOpen( ev:any ){
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

    if(youtubeModal){
      youtubeModal.addEventListener('click', this.youtubeStopVideo.bind(this));
    }
  }

  youtubeStopVideo(){
    let videoSrc = this.youtube_player.getAttribute('src');

    this.youtube_player.setAttribute('src','');
    this.youtube_player.setAttribute('src', videoSrc);
  }

  addOverlay(){
    let overlay = document.createElement('div');
    overlay.setAttribute('class', 'et-product-overlay fade');
    overlay.setAttribute('id', 'et-product-overlay');

    //onclick add our own overlay to body
    // $(".eltdf-full-width").append(overlay);
    document.querySelector('.eltdf-full-width').appendChild(overlay);

    //hide sticky header
    // $(".eltdf-sticky-header").addClass("modal-open");
    this.addClassElement('.eltdf-sticky-header', 'modal-open');

    setTimeout(()=>{
      $('.et-product-overlay').addClass('in');
    }, 100);
  }

  removeOverlay() {

    this.removeZ();

    // $(".lic-overlay").remove();
    let overlay = document.getElementById('et-product-overlay');

    if(overlay){
      overlay.parentNode.removeChild(overlay);
    }


    //animate sticky header back in
    this.removeClassElement('.eltdf-sticky-header', 'modal-open');

  }

  setSrc( el: Element, value: string ){

    setTimeout(() => {

      el.setAttribute('src', value);
      // $('.you-tube-pop').attr('src', youtubeLink);
    },100);

  }

  onModalClose(){
    $('body').css({
      width: 'auto',
      position: 'inherit',
      padding: '0'
    });

    $('html').css({
      overflowY: 'scroll'
    });

    this.lic_modal_tabContent.removeClass('active');

    this.removeClassElement('.modal-body', 'active');
    this.removeOverlay();
  }

  animateModalIn(){
    this.lic_modal_tabContent.addClass('active');
  }

  onModalOpen(e: Event){
    e.preventDefault();

    $('body').css({
      padding: '0 15px 0 0'
    });

    $('html').css({
      overflowY: 'hidden',
    });

    function setModalHeight(){
      let height = this.licenseModal.find('.tab-content').height();
      let tabs = this.licenseModal.find('.nav-tabs').height();

      $('#licenseModal .modal-body').height(height + tabs);

      setTimeout(()=>{
        $('#licenseModal .modal-body').height('auto');
      }, 300);
    }


    this.asyncDataCall().then( (data: any) => {

      //remove spinner - content loaded
      $('.modal-loader').css({
        opacity: '0'
      });

      // touched variable determinse if modal has been called once before
      // and html has already been set
      if(this.touched){
        this.licenseModal.modal('show');
      }else{

        this.licenseModalBody.html(data.content);

        //set tab contact after its added to the DOM
        this.lic_modal_tabContent = this.licenseModal.find('.tab-content');

        this.licenseModal.modal('show');

        this.touched = true;

        //new nav outside of modal
        this.licenseModal.prepend(data.nav);

      }

      this.animateModalIn();



    });

    //Add zindex to html elements to add custom Overlay
    this.addZ();

    //active modal
    setTimeout(() => {
      // $('.modal-body').addClass('active');
      this.addClassElement('.modal-body', 'active');

    },300);


    //activate custom overlay
    this.addOverlay();

    //activate spinner{
    $('.et-product-overlay').append('<div class="modal-loader"></div>');
  }

  asyncDataCall() {

    return new Promise( ( resolve:any, reject?:any ) => {
      let urlString = this.window.et_products.url + '/wp-json/product-licenses/v1/license';

      if( this.licenseData !== null ){

        //check if data was just pulled from browser cache
        if(typeof this.licenseData === 'string'){
          this.licenseData = JSON.parse(this.licenseData);
        }

        //returned the cached data
        resolve(this.licenseData);

      }else{

        // Make Ajax call
        $.get(urlString)
          .done((data)=>{
            //set local storage
            localStorage.setItem(this.localVariable, JSON.stringify(data));
            
            //set our data on variable
            this.licenseData = data;
            
            //resolve promise data
            resolve(this.licenseData);
          })
          .fail((status, err) => reject(status + err.message));
      }
    });
  }

  init(): void {
    this.addEvents();
    this.onYoutubeCloseBtn();
  }

}

let Products_Modals = new ProductsModalsClass();

export default Products_Modals;