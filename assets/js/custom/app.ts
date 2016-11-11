/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */

import Utils from "./partials/utils";
// import Search from "./partials/search";
import Nav from "./navigation/navigation";
// import Products from "./partials/products-react";
import Products from "./products/products-main";
import Forms from "./partials/et-ck-forms";
// const $ = jQuery;
import jquery = require('jquery');
const $ = jquery;

(function() {
  class App {
    constructor() {
      
    }

    init(): void {
      console.log("Neat loaded");
      Utils.init();
      Nav.init();
      // Search.init();
      Products.init();
      Forms.init();
    }
  }

  let bootstrap = new App();

  /** run all functions */
  $(document).ready(() => {

    bootstrap.init();

  });

})();

