import {BpsInterface} from "../interfaces/bps.interface";
const $ = jQuery;

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
    this.browser = UtilityComponent.whichBrowser();
  }


  private _setBreakpoints = ( bps: BpsInterface ) => {
    let arr = [];

    for ( let key in bps ) {
      if ( bps.hasOwnProperty(key) ) {
        arr.push(bps[ key ]);
      }
    }

    return arr.reverse();
  };
  private _checkBreakpoint = () => {
    // make breakpoint event available to all files via the window object
    let old_breakpoint = this.breakpoint;

    this._setBreakpoint();

    if ( old_breakpoint !== this.breakpoint ) {

      $(window).trigger("breakpointChange", Utils.breakpoint);
    }
  };
  private _setBreakpoint = () => {
    // get breakpoint from css
    // console.log($('body').css("z-index"));

    let body = getComputedStyle(document.body),
      zindex = getComputedStyle(document.body)[ "z-index" ];

    this.breakpoint = parseInt(zindex, 10);
  };
  private _setWindowWidth = () => {
    this.windowWidth = window.innerWidth;
  };


  public static whichBrowser() {
    if ( (navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !(
      navigator.userAgent.toLowerCase().indexOf("chrome") > -1) && (navigator.appName ===
      "Netscape") ) {

      if ( navigator.userAgent.match(/iPad/i) !== null ) {
        return "ipad";

      } else {
        return "safari";
      }
    }
  }

  public static buildHtml( type: string, attrs?: Object, html?: string ) {

    // http://marcgrabanski.com/building-html-in-jquery-and-javascript/

    let h = '<' + type;

    for ( let attr in attrs ) {
      if ( attrs[ attr ] === false ) continue;
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
    // console.log("Utilities loaded");

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