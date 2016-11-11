const $ = jQuery;
import Utils from "../partials/utils";
import Select_Btn from "./product-select";
import ProductStore from "./productStore"

/**
 *
 * License Select Functionality
 * ......................
 * Inspired by CodyHouse.co
 *
 * */


class ProductsLicenseSelect {
  productContainer: JQuery;
  animating: boolean;
  addToCartBtn: JQuery;

  constructor() {
    this.productContainer = $('.products-cta');
    this.animating = false;
    this.addToCartBtn = $('.add-to-cart');
  }

  checkClickArea(){
    $('body').on('click', (event) => {
      //if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
      if( !$(event.target).is('div.select') &&  !$(event.target).is('li')) {
        if(ProductStore.state.isOpen){
          this.closeDropdown();
        }
      }
    });
  }

  closeDropdown() {
    ProductStore.state.isOpen = false;
    this.productContainer.find('[data-type="select"]').removeClass('is-open');
  }
  
  initDropdown( items: JQuery){

    items.each( (index, el) => {
    
      let btn = new Select_Btn(index, el);
    
      btn.initDropdown();
    
    });
  }

  init(): void {
    console.log("Products License Select Loaded");
    ProductStore.createStore();
    this.checkClickArea();
    
    //initialize
    this.initDropdown(this.productContainer)
  }

}

let Products_License_select = new ProductsLicenseSelect();

export default Products_License_select;