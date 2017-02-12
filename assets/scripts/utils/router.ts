/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 * ======================================================================== */

import camelCase from './camelCase.ts';

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
export default class Router {
  routes:any;
  
  constructor(routes: Object) {
    this.routes = routes;
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fire(route:any, fn = 'init', args? : any) {
    const routeLow = this.capitalizeFirstLetter(route);
    const fire = routeLow !== '' && this.routes[routeLow] && typeof this.routes[routeLow][fn] === 'function';

    if (fire) {
      this.routes[routeLow][fn](args);
    }
  }

  matchProps(item:string){

    for( let prop in this.routes ) {
      if(item === prop.toLowerCase()){
        return item;
      }
    }

  }

  loadEvents() {
    // Fire common init JS
    this.fire('common');

    // Fire page-specific init JS, and then finalize JS
    document.body.className
      .toLowerCase()
      .replace(/-/g, '_')
      .split(/\s+/)
      .map(camelCase)
      .filter( (item:string) => this.matchProps(item))
      .forEach((className) => {
        this.fire(className);
        this.fire(className, 'finalize');
      });

    // Fire common finalize JS
    this.fire('common', 'finalize');
  }
}
