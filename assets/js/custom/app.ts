/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */

import Utils from "./partials/utils";
import Search from "./partials/search";
import Nav from "./navigation/navigation";
import Products from "./partials/products-react";

const $ = jQuery;

(function() {
  class App {
    constructor() {
    }

    init(): void {
      // console.log("Neat loaded");
      Utils.init();
      Nav.init();
      Search.init();
      Products.init();
    }
  }

  let bootstrap = new App();

  /** run all functions */
  $(document).ready(() => {
    bootstrap.init();

    // let app = document.getElementById('app');
    // console.log(app);
    //
    // let event = new CustomEvent(
    //   "fontCheck",
    //   {
    //     detail: {
    //       message: "Hello World!",
    //       time: new Date(),
    //     },
    //     bubbles: true,
    //     cancelable: true
    //   }
    // );
    // let myButton = document.getElementById('test');
    //
    //
    //
    // myButton.addEventListener("click", (e) => {
    //   console.log("button click");
    //
    //   let testData = {
    //     title: "Tuesday Script",
    //     text: "Tuesday font preview",
    //     name: "Tuesday",
    //     styles: ["Regular"]
    //   };
    //
    //   $(app).attr('data-title', testData.title);
    //   // app.dataset.title = testData.title;
    //   // let initialState = {
    //   //   title: app.dataset.title,
    //   //   text: app.dataset.text,
    //   //   name: app.dataset.name,
    //   //   styles: app.dataset.styles.split(',')
    //   // };
    //
    //   e.currentTarget.dispatchEvent(event);
    //
    // });


  });

})();

