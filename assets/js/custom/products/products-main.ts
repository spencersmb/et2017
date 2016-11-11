const $ = jQuery;
import Utils from "../partials/utils";
import Font_Preview_Class from "./products-font-preview";
import License_Select_Class from "./products-license";
import Youtube_Btn_Class from "./products-youtube";


const Font_Preview = Font_Preview_Class;
const License_Select = License_Select_Class;
const Youtube_Btn = Youtube_Btn_Class;

class ProductsComponent {

  constructor() {

  }


  init(): void {

    var isProductPage = ($(".et-product-page").length > 0 ? true : false);

    if(isProductPage){
      console.log("Products Main Loaded");
      Font_Preview.init();
      License_Select.init();
      Youtube_Btn.init();
    }
  }

}

let Products = new ProductsComponent();

export default Products;