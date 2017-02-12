import Utils from "../partials/utils.ts";
import Nav from "../navigation/navigation.ts";
import Forms from "../partials/et-ck-forms.ts";

export default {
  init() {
    // JavaScript to be fired on all pages
    console.groupCollapsed("Common Module: Init");
    console.log('Init: Common');
    console.groupEnd();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    console.group("Common Module: Finalize");
    console.log('Finalize: Common');
    Utils.init();
    Nav.init();
    Forms.init();
    console.groupEnd();
  },
};
