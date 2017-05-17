import Router from './utils/router.ts';
import Common from "./routes/Common.ts"
import Home from "./routes/Home.ts"
import Products from "./routes/Products.ts"

import jquery = require('jquery');
const $ = jquery;

(function() {
  interface iRoutes {
    string:string
  }
  class App {
    routes: any;
    constructor() {

      // Use this variable to set up the common and page specific functions. If you
      // rename this variable, you will also need to rename the namespace below.
      this.routes = {
        Common,
        Home,
        Products,
      };
    }

    init(): void {

      new Router(this.routes).loadEvents();
    }

  }


  let bootstrap = new App();

  //use window.load for now - dev site loads too fast and doc.ready doesnt work - but it works when not in dev env
  $(window).load(function() {
    console.log("Doc loaded");
    bootstrap.init();
  });

  //test3

})();

