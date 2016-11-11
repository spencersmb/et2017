const $ = jQuery;
import Utils from "../partials/utils";

/** 
 * 
 * Font Preview Component
 * ......................
 * Connects to React component using dispatch event trigger 
 * 
 * */
  
  
class ProductsFontPreviewComponent {
  fontPreviewArray: any;
  event: Event;
  app: JQuery;
  isOpen: Boolean;

  constructor() {
    this.fontPreviewArray = $(".et-font-preview__link");
    this.app = $('#app');
  }

  addButtonClick() {
    this.fontPreviewArray.each(( index, el ) => {
      $(el).on("click", this.buttonClick.bind(this));
    });
  }

  createEvent() {
    this.event = new CustomEvent(
      "fontCheck",
      {
        detail: {
          message: "Font Component up!",
          time: new Date(),
        },
        bubbles: true,
        cancelable: true
      }
    );
  }

  setData( data ) {
    this.app.attr({
      "data-placeholder": data.placeholder,
      "data-name": data.name,
      "data-styles": data.styles
    });
  }

  buttonClick( e ) {
    e.preventDefault();

    // Build font attr
    let element = $(e.currentTarget);
    let name = element.data("name");

    let data = {
      placeholder: name + " preview",
      name: name,
      styles: element.data("styles").split(',')
    };

    // pass new data into react app
    this.setData(data);

    // fire event to notify React app to update
    e.currentTarget.dispatchEvent(this.event);

    // open slider
    this.open();
  }

  open() {
    if ( this.isOpen ) {
      return;
    } else {
      this.app.addClass("open");
    }
  }

  close() {
    this.app.removeClass("open");
  }

  init(): void {
    console.log("Products Font Preview loaded");
    this.createEvent();
    this.addButtonClick();
  }

}

let Products_font_preview_js = new ProductsFontPreviewComponent();

export default Products_font_preview_js;