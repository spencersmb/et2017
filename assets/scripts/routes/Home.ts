import Search from "../partials/search.ts";

export default {
  init() {
    // JavaScript to be fired on all pages
    console.groupCollapsed("Home Module: Init");
    console.log('Home: Init');
    console.groupEnd();

  },
  finalize() {
    // JavaScript to be fired on all pages
    console.groupCollapsed("Home Module: Finalize");
    console.log('Home: Finalize');
    Search.init();
    console.groupEnd();
  },
};