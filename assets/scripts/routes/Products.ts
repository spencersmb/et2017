import Products from "../products/products-main.ts";

export default {
  init() {
    // JavaScript to be fired on all pages
    console.log('Products: Init');
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    console.log('Products: Finalize');
    
    Products.init();
  }
}