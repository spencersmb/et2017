import {BpsInterface} from "../interfaces/bps.interface.ts";
import BrowserCheck from "../utils/browserCheck.ts"
import jquery = require('jquery');
const $ = jquery;

class UtilityComponent {
  windowWidth: number;
  breakpoint: number;
  breakpoints: number[];
  bps: BpsInterface;
  browser: string;

  constructor() {
    this.windowWidth = 0;
    this.breakpoint = 320;
    this.breakpoints = [];
    this.bps = {
      mobile: 544,
      tablet: 768,
      laptop: 992,
      desktop: 1200,
      desktop_xl: 1600
    };
    this.browser = BrowserCheck.find();
  }

  _setBreakpoints = ( bps: BpsInterface ) => {
    let arr:any = [];

    for ( let key in bps ) {
      if ( bps.hasOwnProperty(key) ) {
        arr.push(bps[ key ]);
      }
    }

    return arr.reverse();
  };

  _checkBreakpoint = () => {
    // make breakpoint event available to all files via the window object
    console.log("check breakpoint on window resize");
    let old_breakpoint = this.breakpoint;

    this._setBreakpoint();

    if ( old_breakpoint !== this.breakpoint ) {

      $(window).trigger("breakpointChange", this.breakpoint);
    }
  };

  _setBreakpoint = () => {
    // get breakpoint from css
    // console.log($('body').css("z-index"));

    let body:any = getComputedStyle(document.body),
      zindex:string = body[ "z-index" ];

    this.breakpoint = parseInt(zindex, 10);
  };
  _setWindowWidth = () => {
    this.windowWidth = window.innerWidth;
  };

  buildHtml( type: string, attrs?: any, html?: string ) {

    // http://marcgrabanski.com/building-html-in-jquery-and-javascript/

    let h = '<' + type;

    for ( let attr in attrs ) {
      if ( attrs.hasOwnProperty(attr) === false ) continue;
      h += ' ' + attr + '="' + attrs[ attr ] + '"';
    }

    return h += html ? ">" + html + "</" + type + ">" : "/>";
  }

  setNumber( count: number ): string {
    // conver number to string
    let total = count;
    return total.toString();
  }

  init(): void {
    console.log("Utilities loaded");

    // set breakpoint on window load
    this._setBreakpoint();
    this._setWindowWidth();

    console.log("Current Breakpoint is:", this.breakpoint);

    // console.log(this.browser);

    // create full array for image compression ref
    this.breakpoints = this._setBreakpoints(this.bps);

    $(window).on("resize", this._checkBreakpoint).bind(this);
  }

}

let Utils = new UtilityComponent();

export default Utils;
