const $ = jQuery;

class FormsComponent {

  isOpen: boolean;
  svgArray: JQuery;

  constructor() {
    this.isOpen = false;
    this.svgArray = $('.et2017-contact__svg');
  }

  onInputFocus( ev:Event ) {

    let parent = $(ev.target).parent();

    this.fillInput(parent);
  }

  fillInput( parentObject: JQuery ){

    if( !parentObject.hasClass('wpcf7-form-control-wrap')){
      parentObject.addClass('input--filled');
    } else{
      parentObject.parent().addClass('input--filled');
    }

  }
  emptyInput( parentObject: JQuery ){
    if( !parentObject.hasClass('wpcf7-form-control-wrap')){
      parentObject.removeClass('input--filled');
    } else{
      parentObject.parent().removeClass('input--filled');
    }
  }

  onInputBlur( ev:any ) {
  if( ev.target.value.trim() === '' ) {
    let parent = $(ev.target).parent();

    this.emptyInput(parent);
  }
}

  trimPrototype(){
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }
  }

  createEventlistenersforForms(){

    [].slice.call( document.querySelectorAll( '.et-input__field' ) ).forEach( (inputEl: HTMLInputElement) => {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {

        // classie.add( inputEl.parentNode, 'input--filled' );
        let parent = $(inputEl).parent();
        this.fillInput(parent);
      }

      // events:
      inputEl.addEventListener( 'focus', this.onInputFocus.bind(this) );
      inputEl.addEventListener( 'blur', this.onInputBlur.bind(this) );
    } );

  }

  isContactPage():boolean{

    return ($('.et2017__contact').length > 0) ? true : false;

  }

  contactFormInit(){

    console.log(this.svgArray);

    this.svgArray.on('click', this.svgCheckState.bind(this));
  }

  addSvgAnimation(){

    this.svgArray.addClass('envelop-animate-out');

    setTimeout(()=>{
      this.svgArray.removeClass('pristine');
      this.svgArray.addClass('touched');
    }, 300);

  }

  svgCheckState(){
    console.log("init contact");
    if(!this.isOpen){

      //add animation
      this.addSvgAnimation();

      this.isOpen = true;

    }
  }

  init(): void {
    this.trimPrototype();

    this.createEventlistenersforForms();

    // this.isContactPage() ? this.contactFormInit() : null ;

  }
}

let et_ck_forms = new FormsComponent();

export default et_ck_forms;