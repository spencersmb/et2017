const $ = jQuery;
import Utils from "../partials/utils";

class FormsComponent {

  constructor() {

  }

  onInputFocus( ev ) {
    $(ev.target).parent().addClass('input--filled');
  }

  onInputBlur( ev ) {
  if( ev.target.value.trim() === '' ) {
    $(ev.target).parent().removeClass('input--filled');
  }
}

  init(): void {

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

    [].slice.call( document.querySelectorAll( 'input.et-input__field' ) ).forEach( (inputEl) => {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        // classie.add( inputEl.parentNode, 'input--filled' );
        $(inputEl).parent().addClass('input--filled');
      }

      // events:
      inputEl.addEventListener( 'focus', this.onInputFocus );
      inputEl.addEventListener( 'blur', this.onInputBlur );
    } );
  }
}

let et_ck_forms = new FormsComponent();

export default et_ck_forms;