import Search from './nav-search-pop-up.ts';
import CoursesNotification from './courses-notifications.ts';
import jquery = require('jquery');
const $ = jquery;

class NavComponent {

  storeIcon: JQuery;
  currentPosition: number;

  constructor() {

    // this.storeIcon = $('.store-front');
    // this.currentPosition = $(window).scrollTop();

  }

  checkStore() {
    this.currentPosition = $(window).scrollTop();
    if ( this.currentPosition < 200 ) {
      // remove hidden
      this.storeIcon.removeClass('store-hidden');
    } else {
      // add store-hidden
      this.storeIcon.addClass('store-hidden');

    }
  }

  init(): void {
    console.log("Nav loaded");
    Search.init();
    CoursesNotification.init();

    // this.checkStore();

    // $(window).on('scroll', () => {
    //   (!window.requestAnimationFrame) ? this.checkStore.bind(this) : window.requestAnimationFrame(this.checkStore.bind(this));
    // });


  }
}

let Nav = new NavComponent();

export default Nav;