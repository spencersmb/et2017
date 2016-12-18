(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */
"use strict";
var utils_1 = require("./partials/utils");
// import Search from "./partials/search";
var navigation_1 = require("./navigation/navigation");
// import Products from "./partials/products-react";
var products_main_1 = require("./products/products-main");
var et_ck_forms_1 = require("./partials/et-ck-forms");
// const $ = jQuery;
var jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var $ = jquery;
(function () {
    var App = (function () {
        function App() {
        }
        App.prototype.init = function () {
            console.log("Neat loaded");
            utils_1.default.init();
            navigation_1.default.init();
            // Search.init();
            products_main_1.default.init();
            et_ck_forms_1.default.init();
        };
        return App;
    }());
    var bootstrap = new App();
    /** run all functions */
    $(document).ready(function () {
        bootstrap.init();
    });
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./navigation/navigation":2,"./partials/et-ck-forms":3,"./partials/utils":4,"./products/products-main":9}],2:[function(require,module,exports){
(function (global){
"use strict";
var jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var $ = jquery;
var NavComponent = (function () {
    function NavComponent() {
        this.storeIcon = $('.store-front');
        this.currentPosition = $(window).scrollTop();
    }
    NavComponent.prototype.checkStore = function () {
        this.currentPosition = $(window).scrollTop();
        if (this.currentPosition < 200) {
            // remove hidden
            this.storeIcon.removeClass('store-hidden');
        }
        else {
            // add store-hidden
            this.storeIcon.addClass('store-hidden');
        }
    };
    NavComponent.prototype.init = function () {
        var _this = this;
        console.log("Nav loaded");
        this.checkStore();
        $(window).on('scroll', function () {
            (!window.requestAnimationFrame) ? _this.checkStore.bind(_this) : window.requestAnimationFrame(_this.checkStore.bind(_this));
        });
    };
    return NavComponent;
}());
var Nav = new NavComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Nav;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
"use strict";
var $ = jQuery;
var FormsComponent = (function () {
    function FormsComponent() {
        this.isOpen = false;
        this.svgArray = $('.et2017-contact__svg');
    }
    FormsComponent.prototype.onInputFocus = function (ev) {
        var parent = $(ev.target).parent();
        this.fillInput(parent);
    };
    FormsComponent.prototype.fillInput = function (parentObject) {
        if (!parentObject.hasClass('wpcf7-form-control-wrap')) {
            parentObject.addClass('input--filled');
        }
        else {
            parentObject.parent().addClass('input--filled');
        }
    };
    FormsComponent.prototype.emptyInput = function (parentObject) {
        if (!parentObject.hasClass('wpcf7-form-control-wrap')) {
            parentObject.removeClass('input--filled');
        }
        else {
            parentObject.parent().removeClass('input--filled');
        }
    };
    FormsComponent.prototype.onInputBlur = function (ev) {
        if (ev.target.value.trim() === '') {
            var parent_1 = $(ev.target).parent();
            this.emptyInput(parent_1);
        }
    };
    FormsComponent.prototype.trimPrototype = function () {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function () {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function () {
                    return this.replace(rtrim, '');
                };
            })();
        }
    };
    FormsComponent.prototype.createEventlistenersforForms = function () {
        var _this = this;
        [].slice.call(document.querySelectorAll('.et-input__field')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                // classie.add( inputEl.parentNode, 'input--filled' );
                var parent_2 = $(inputEl).parent();
                _this.fillInput(parent_2);
            }
            // events:
            inputEl.addEventListener('focus', _this.onInputFocus.bind(_this));
            inputEl.addEventListener('blur', _this.onInputBlur.bind(_this));
        });
    };
    FormsComponent.prototype.isContactPage = function () {
        return ($('.et2017__contact').length > 0) ? true : false;
    };
    FormsComponent.prototype.contactFormInit = function () {
        console.log(this.svgArray);
        this.svgArray.on('click', this.svgCheckState.bind(this));
    };
    FormsComponent.prototype.addSvgAnimation = function () {
        var _this = this;
        this.svgArray.addClass('envelop-animate-out');
        setTimeout(function () {
            _this.svgArray.removeClass('pristine');
            _this.svgArray.addClass('touched');
        }, 300);
    };
    FormsComponent.prototype.svgCheckState = function () {
        console.log("init contact");
        if (!this.isOpen) {
            //add animation
            this.addSvgAnimation();
            this.isOpen = true;
        }
    };
    FormsComponent.prototype.init = function () {
        this.trimPrototype();
        this.createEventlistenersforForms();
        // this.isContactPage() ? this.contactFormInit() : null ;
    };
    return FormsComponent;
}());
var et_ck_forms = new FormsComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = et_ck_forms;

},{}],4:[function(require,module,exports){
(function (global){
"use strict";
var jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var $ = jquery;
var UtilityComponent = (function () {
    function UtilityComponent() {
        var _this = this;
        this._setBreakpoints = function (bps) {
            var arr = [];
            for (var key in bps) {
                if (bps.hasOwnProperty(key)) {
                    arr.push(bps[key]);
                }
            }
            return arr.reverse();
        };
        this._checkBreakpoint = function () {
            // make breakpoint event available to all files via the window object
            console.log("check breakpoint on window resize");
            var old_breakpoint = _this.breakpoint;
            _this._setBreakpoint();
            if (old_breakpoint !== _this.breakpoint) {
                $(window).trigger("breakpointChange", Utils.breakpoint);
            }
        };
        this._setBreakpoint = function () {
            // get breakpoint from css
            // console.log($('body').css("z-index"));
            var body = getComputedStyle(document.body), zindex = getComputedStyle(document.body)["z-index"];
            _this.breakpoint = parseInt(zindex, 10);
        };
        this._setWindowWidth = function () {
            _this.windowWidth = window.innerWidth;
        };
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
    UtilityComponent.whichBrowser = function () {
        if ((navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !(navigator.userAgent.toLowerCase().indexOf("chrome") > -1) && (navigator.appName ===
            "Netscape")) {
            if (navigator.userAgent.match(/iPad/i) !== null) {
                return "ipad";
            }
            else {
                return "safari";
            }
        }
    };
    UtilityComponent.buildHtml = function (type, attrs, html) {
        // http://marcgrabanski.com/building-html-in-jquery-and-javascript/
        var h = '<' + type;
        for (var attr in attrs) {
            if (attrs[attr] === false)
                continue;
            h += ' ' + attr + '="' + attrs[attr] + '"';
        }
        return h += html ? ">" + html + "</" + type + ">" : "/>";
    };
    UtilityComponent.prototype.setNumber = function (count) {
        // conver number to string
        var total = count;
        return total.toString();
    };
    UtilityComponent.prototype.init = function () {
        console.log("Utilities loaded");
        // set breakpoint on window load
        this._setBreakpoint();
        this._setWindowWidth();
        // console.log("Current Breakpoint is:", this.breakpoint);
        // console.log(this.browser);
        // create full array for image compression ref
        this.breakpoints = this._setBreakpoints(this.bps);
        $(window).on("resize", this._checkBreakpoint).bind(this);
    };
    return UtilityComponent;
}());
var Utils = new UtilityComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("../partials/utils");
var productStore_1 = require("./productStore");
/**
 *
 * License Select Class
 * ......................
 * Inspired by CodyHouse.co
 *
 * */
var ProductsSelectBtn = (function () {
    function ProductsSelectBtn(index, item) {
        this.cta = $(item);
        this.licenseBox = this.cta.find('.select');
        this.selectBox = this.cta.find('[data-type="select"]');
        this.initialPrice = this.licenseBox.find('.stnd').data('link');
        this.addtoCart = this.cta.find('.add-to-cart');
        this.index = index;
    }
    ProductsSelectBtn.prototype.setPriceUrl = function () {
        this.addtoCart.find('a').attr('href', this.initialPrice);
    };
    ProductsSelectBtn.prototype.onSelectButtonClick = function (e) {
        var $this = $(e.currentTarget); //targets the div wrapper
        //check if another box has been opened
        if (productStore_1.default.state.isOpen) {
            this.resetSelectBox($this);
        }
        //toggle open
        $this.toggleClass('is-open');
        productStore_1.default.state.isOpen = true;
        //target the actual element that was clicked - this gets fired everytime a user clicks, so it doesnt matter
        //because the item you select first is always the active item since only one is shown at a time.
        if ($(e.target).is('li')) {
            //index is kinda a hack to select the item that gets selected by always adding one to the index
            var activeItem = $(e.target), index = activeItem.index() + 1; //get position of element clicked relative to its siblings
            //Add active
            activeItem.addClass('active').siblings().removeClass('active');
            //get gumroad data
            this.gumroadLink = $this.find('.active').data('link');
            this.gumroadPrice = $this.find('.active').data('price');
            //determine what index to add and show
            $this.removeClass('selected-1 selected-2 selected-3').addClass('selected-' + index);
            //set gumroad link from LI and set it on the buynow
            $this.siblings('.add-to-cart').find('a').attr('href', this.gumroadLink);
            //Set price
            $this.parents('.et-box-item__description').find('.product-price').text(this.gumroadPrice);
        }
    };
    ProductsSelectBtn.prototype.resetSelectBox = function (target) {
        //closes the ul if left open or user is not interacting with them
        target.parents('.et-box-item').siblings('div').find('[data-type="select"]').removeClass('is-open');
    };
    ProductsSelectBtn.prototype.safariCheck = function () {
        if (utils_1.default.browser === 'safari') {
            var css = {
                '-webkit-transition': '0',
                'transition': '0'
            };
            this.selectBox.find('ul').css(css);
        }
    };
    ProductsSelectBtn.prototype.initDropdown = function () {
        this.safariCheck();
        this.setPriceUrl();
        this.selectBox.on('click', this.onSelectButtonClick.bind(this));
    };
    return ProductsSelectBtn;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductsSelectBtn;

},{"../partials/utils":4,"./productStore":6}],6:[function(require,module,exports){
"use strict";
var $ = jQuery;
var ProductStore = (function () {
    function ProductStore() {
        this.state = {
            isOpen: false,
            currentIndex: 0
        };
    }
    return ProductStore;
}());
var Product_Store = new ProductStore();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Product_Store;

},{}],7:[function(require,module,exports){
"use strict";
var $ = jQuery;
/**
 *
 * Font Preview Component
 * ......................
 * Connects to React component using dispatch event trigger
 *
 * */
var ProductsFontPreviewComponent = (function () {
    function ProductsFontPreviewComponent() {
        this.fontPreviewArray = $(".et-font-preview__link");
        this.app = $('#app');
    }
    ProductsFontPreviewComponent.prototype.addButtonClick = function () {
        var _this = this;
        this.fontPreviewArray.each(function (index, el) {
            $(el).on("click", _this.buttonClick.bind(_this));
        });
    };
    ProductsFontPreviewComponent.prototype.createEvent = function () {
        this.event = new CustomEvent("fontCheck", {
            detail: {
                message: "Font Component up!",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
    };
    ProductsFontPreviewComponent.prototype.setData = function (data) {
        this.app.attr({
            "data-placeholder": data.placeholder,
            "data-name": data.name,
            "data-styles": data.styles
        });
    };
    ProductsFontPreviewComponent.prototype.buttonClick = function (e) {
        e.preventDefault();
        // Build font attr
        var element = $(e.currentTarget);
        var name = element.data("name");
        var data = {
            placeholder: name + " preview",
            name: name,
            styles: element.data("styles").split(',')
        };
        // pass new data into react app
        this.setData(data);
        // fire event to notify React app to update
        e.currentTarget.dispatchEvent(this.event);
        // open slider
        this.open();
    };
    ProductsFontPreviewComponent.prototype.open = function () {
        if (this.isOpen) {
            return;
        }
        else {
            this.app.addClass("open");
        }
    };
    ProductsFontPreviewComponent.prototype.close = function () {
        this.app.removeClass("open");
    };
    ProductsFontPreviewComponent.prototype.init = function () {
        this.createEvent();
        this.addButtonClick();
        //delay showing the app for just a sec for safari fix
        setTimeout(function () {
            console.log("Products Font Preview loaded");
            $('#app').addClass('loaded');
        }, 100);
    };
    return ProductsFontPreviewComponent;
}());
var Products_font_preview_js = new ProductsFontPreviewComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products_font_preview_js;

},{}],8:[function(require,module,exports){
"use strict";
var $ = jQuery;
var product_select_1 = require("./product-select");
var productStore_1 = require("./productStore");
/**
 *
 * License Select Functionality
 * ......................
 * Inspired by CodyHouse.co
 *
 * */
var ProductsLicenseSelect = (function () {
    function ProductsLicenseSelect() {
        this.productContainer = $('.products-cta');
        this.animating = false;
        this.addToCartBtn = $('.add-to-cart');
    }
    ProductsLicenseSelect.prototype.checkClickArea = function () {
        var _this = this;
        $('body').on('click', function (event) {
            //if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
            if (!$(event.target).is('div.select') && !$(event.target).is('li')) {
                if (productStore_1.default.state.isOpen) {
                    _this.closeDropdown();
                }
            }
        });
    };
    ProductsLicenseSelect.prototype.closeDropdown = function () {
        productStore_1.default.state.isOpen = false;
        this.productContainer.find('[data-type="select"]').removeClass('is-open');
    };
    ProductsLicenseSelect.prototype.initDropdown = function (items) {
        items.each(function (index, el) {
            var btn = new product_select_1.default(index, el);
            btn.initDropdown();
        });
    };
    ProductsLicenseSelect.prototype.init = function () {
        // console.log("Products License Select Loaded");
        this.checkClickArea();
        //initialize
        this.initDropdown(this.productContainer); //loop through all select btns and create dropdown
    };
    return ProductsLicenseSelect;
}());
var Products_License_select = new ProductsLicenseSelect();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products_License_select;

},{"./product-select":5,"./productStore":6}],9:[function(require,module,exports){
"use strict";
var $ = jQuery;
var products_font_preview_1 = require("./products-font-preview");
var products_license_1 = require("./products-license");
var products_modals_1 = require("./products-modals");
var Font_Preview = products_font_preview_1.default;
var License_Select = products_license_1.default;
var Products_Modals = products_modals_1.default;
var ProductsComponent = (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.init = function () {
        var isProductPage = ($(".et-product-page").length > 0 ? true : false);
        if (isProductPage) {
            // console.log("Products Main Loaded");
            Font_Preview.init();
            License_Select.init();
            Products_Modals.init();
        }
    };
    return ProductsComponent;
}());
var Products = new ProductsComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products;

},{"./products-font-preview":7,"./products-license":8,"./products-modals":10}],10:[function(require,module,exports){
"use strict";
var $ = jQuery;
var es6_promise_1 = require("es6-promise");
var ProductsModalsClass = (function () {
    function ProductsModalsClass() {
        this.youtube_btn = document.querySelectorAll('.et-box-item__youtube');
        this.youtube_player = document.getElementById('youtube-player');
        this.window = window;
        this.touched = false;
        this.licenseModal = $('#licenseModal');
        this.licenseModalBtn = $('.licenseModal');
        this.lic_modal_tabContent = this.licenseModal.find('.tab-content');
        this.licenseData = localStorage.getItem('etLicenses');
    }
    ProductsModalsClass.prototype.addEvents = function () {
        var _this = this;
        //Add youtube button click handlers
        [].slice.call(this.youtube_btn).forEach(function (inputEl) {
            // events:
            inputEl.addEventListener('click', _this.onYouTubeOpen.bind(_this));
        });
        $('#et_youtubeModal').on('hidden.bs.modal', this.onYoutubeClose.bind(this));
        //Add License click handlers
        this.licenseModalBtn.on('click', this.onModalOpen.bind(this));
        this.licenseModal.on('hidden.bs.modal', this.onModalClose.bind(this));
    };
    ProductsModalsClass.prototype.onYouTubeOpen = function (ev) {
        var _this = this;
        ev.preventDefault();
        this.youtubeLink = ev.target.parentNode.getAttribute('data-youtube');
        //Add zindex to html elements to add custom Overlay
        this.addZ();
        var popup = document.querySelector('.you-tube-pop');
        //send to modal
        this.setSrc(popup, this.youtubeLink);
        //active modal
        setTimeout(function () {
            // $('.modal-body').addClass('active');
            _this.addClassElement('.modal-body', 'active');
        }, 300);
        //activate custom overlay
        this.addOverlay();
    };
    ProductsModalsClass.prototype.addClassElement = function (el, className) {
        document.querySelector(el).classList.add(className);
    };
    ProductsModalsClass.prototype.removeClassElement = function (el, className) {
        document.querySelector(el).classList.remove(className);
    };
    ProductsModalsClass.prototype.addZ = function () {
        this.addClassElement('.eltdf-content', 'products-zindex');
        this.addClassElement('.eltdf-wrapper', 'products-zindex');
    };
    ProductsModalsClass.prototype.removeZ = function () {
        this.removeClassElement('.eltdf-content.products-zindex', 'products-zindex');
        this.removeClassElement('.eltdf-wrapper.products-zindex', 'products-zindex');
    };
    ProductsModalsClass.prototype.onYoutubeClose = function () {
        this.removeClassElement('.modal-body', 'active');
        this.removeOverlay();
    };
    ProductsModalsClass.prototype.onYoutubeCloseBtn = function () {
        var youtubeModal = document.getElementById('et_youtube_close_modal');
        youtubeModal.addEventListener('click', this.youtubeStopVideo.bind(this));
    };
    ProductsModalsClass.prototype.youtubeStopVideo = function () {
        var videoSrc = this.youtube_player.getAttribute('src');
        this.youtube_player.setAttribute('src', '');
        this.youtube_player.setAttribute('src', videoSrc);
    };
    ProductsModalsClass.prototype.addOverlay = function () {
        var overlay = document.createElement('div');
        overlay.setAttribute('class', 'et-product-overlay fade');
        overlay.setAttribute('id', 'et-product-overlay');
        //onclick add our own overlay to body
        // $(".eltdf-full-width").append(overlay);
        document.querySelector('.eltdf-full-width').appendChild(overlay);
        //hide sticky header
        // $(".eltdf-sticky-header").addClass("modal-open");
        this.addClassElement('.eltdf-sticky-header', 'modal-open');
        setTimeout(function () {
            $('.et-product-overlay').addClass('in');
        }, 100);
    };
    ProductsModalsClass.prototype.removeOverlay = function () {
        this.removeZ();
        // $(".lic-overlay").remove();
        var overlay = document.getElementById('et-product-overlay');
        overlay.parentNode.removeChild(overlay);
        //animate sticky header back in
        this.removeClassElement('.eltdf-sticky-header', 'modal-open');
    };
    ProductsModalsClass.prototype.setSrc = function (el, value) {
        setTimeout(function () {
            el.setAttribute('src', value);
            // $('.you-tube-pop').attr('src', youtubeLink);
        }, 100);
    };
    ProductsModalsClass.prototype.onModalClose = function () {
        $('body').css({
            width: 'auto',
            position: 'inherit',
            padding: '0'
        });
        $('html').css({
            overflowY: 'scroll'
        });
        this.lic_modal_tabContent.removeClass('active');
        this.removeClassElement('.modal-body', 'active');
        this.removeOverlay();
    };
    ProductsModalsClass.prototype.animateModalIn = function () {
        this.lic_modal_tabContent.addClass('active');
    };
    ProductsModalsClass.prototype.onModalOpen = function (e) {
        var _this = this;
        e.preventDefault();
        $('body').css({
            padding: '0 15px 0 0'
        });
        $('html').css({
            overflowY: 'hidden',
        });
        function setModalHeight() {
            var height = this.licenseModal.find('.tab-content').height();
            var tabs = this.licenseModal.find('.nav-tabs').height();
            $('#licenseModal .modal-body').height(height + tabs);
            setTimeout(function () {
                $('#licenseModal .modal-body').height('auto');
            }, 300);
        }
        this.asyncDataCall().then(function (data) {
            //remove spinner - content loaded
            $('.modal-loader').css({
                opacity: '0'
            });
            if (_this.touched) {
                _this.licenseModal.modal('show');
                _this.animateModalIn();
            }
            else {
                $("#standard").html(data.standard);
                $("#extended").html(data.extended);
                _this.licenseModal.modal('show');
                _this.animateModalIn();
                _this.touched = true;
            }
        });
        //Add zindex to html elements to add custom Overlay
        this.addZ();
        //active modal
        setTimeout(function () {
            // $('.modal-body').addClass('active');
            _this.addClassElement('.modal-body', 'active');
        }, 300);
        //activate custom overlay
        this.addOverlay();
        //activate spinner{
        $('.et-product-overlay').append('<div class="modal-loader"></div>');
    };
    ProductsModalsClass.prototype.asyncDataCall = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var urlString = _this.window.et_products.url + '/wp-json/product-licenses/v1/license';
            if (_this.licenseData !== null) {
                //check if data was just pulled from browser cache
                if (typeof _this.licenseData === 'string') {
                    _this.licenseData = JSON.parse(_this.licenseData);
                }
                //returned the cached data
                resolve(_this.licenseData);
            }
            else {
                // Make Ajax call
                $.get(urlString).done(function (data) {
                    localStorage.setItem('etLicenses', JSON.stringify(data));
                    _this.licenseData = data;
                    resolve(_this.licenseData);
                });
            }
        });
    };
    ProductsModalsClass.prototype.init = function () {
        this.addEvents();
        this.onYoutubeCloseBtn();
    };
    return ProductsModalsClass;
}());
var Products_Modals = new ProductsModalsClass();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products_Modals;

},{"es6-promise":12}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
    try {
        cachedSetTimeout = setTimeout;
    } catch (e) {
        cachedSetTimeout = function () {
            throw new Error('setTimeout is not defined');
        }
    }
    try {
        cachedClearTimeout = clearTimeout;
    } catch (e) {
        cachedClearTimeout = function () {
            throw new Error('clearTimeout is not defined');
        }
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.0.5
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9ldC1jay1mb3Jtcy50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdXRpbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3Byb2R1Y3RzL3Byb2R1Y3Qtc2VsZWN0LnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wcm9kdWN0cy9wcm9kdWN0U3RvcmUudHMiLCJhc3NldHMvanMvY3VzdG9tL3Byb2R1Y3RzL3Byb2R1Y3RzLWZvbnQtcHJldmlldy50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMtbGljZW5zZS50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMtbWFpbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMtbW9kYWxzLnRzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBOzs7R0FHRzs7QUFFSCxzQkFBa0Isa0JBQWtCLENBQUMsQ0FBQTtBQUNyQywwQ0FBMEM7QUFDMUMsMkJBQWdCLHlCQUF5QixDQUFDLENBQUE7QUFDMUMsb0RBQW9EO0FBQ3BELDhCQUFxQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2hELDRCQUFrQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzNDLG9CQUFvQjtBQUNwQixJQUFPLE1BQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUNsQyxJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFakIs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LENBQUM7SUFDM0IsQ0FBQztJQUVILDBCQUFDO0FBQUQsQ0E3UUEsQUE2UUMsSUFBQTtBQUVELElBQUksZUFBZSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztBQUVoRDtrQkFBZSxlQUFlLENBQUM7OztBQ2pTL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiBSZWYgcGF0aCBpcyBub3QgbmVlZGVkIGZvciBzb21lIHJlYXNvblxuIDxyZWZlcmVuY2UgcGF0aD1cIi9Vc2Vycy95b3NlbWV0aWUvRHJvcGJveC9kZXZlbG9wbWVudC92aG9zdHMvd3d3Lmx5bmRhc2NvcmUuZGV2L3dwLWNvbnRlbnQvdGhlbWVzL25lYXQvdHlwaW5ncy90c2QuZC50c1wiIC8+XG4gKi9cblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3BhcnRpYWxzL3V0aWxzXCI7XG4vLyBpbXBvcnQgU2VhcmNoIGZyb20gXCIuL3BhcnRpYWxzL3NlYXJjaFwiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbi8vIGltcG9ydCBQcm9kdWN0cyBmcm9tIFwiLi9wYXJ0aWFscy9wcm9kdWN0cy1yZWFjdFwiO1xuaW1wb3J0IFByb2R1Y3RzIGZyb20gXCIuL3Byb2R1Y3RzL3Byb2R1Y3RzLW1haW5cIjtcbmltcG9ydCBGb3JtcyBmcm9tIFwiLi9wYXJ0aWFscy9ldC1jay1mb3Jtc1wiO1xuLy8gY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBqcXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbmNvbnN0ICQgPSBqcXVlcnk7XG5cbihmdW5jdGlvbigpIHtcblxuICBjbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgXG4gICAgfVxuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTmVhdCBsb2FkZWRcIik7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgLy8gU2VhcmNoLmluaXQoKTtcbiAgICAgIFByb2R1Y3RzLmluaXQoKTtcbiAgICAgIEZvcm1zLmluaXQoKTtcbiAgICB9XG4gIH1cblxuICBsZXQgYm9vdHN0cmFwID0gbmV3IEFwcCgpO1xuXG4gIC8qKiBydW4gYWxsIGZ1bmN0aW9ucyAqL1xuICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cbiAgICBib290c3RyYXAuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpO1xuXG4iLCJpbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQganF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5jb25zdCAkID0ganF1ZXJ5O1xuXG5jbGFzcyBOYXZDb21wb25lbnQge1xuXG4gIHN0b3JlSWNvbjogSlF1ZXJ5O1xuICBjdXJyZW50UG9zaXRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuc3RvcmVJY29uID0gJCgnLnN0b3JlLWZyb250Jyk7XG4gICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgfVxuXG4gIGNoZWNrU3RvcmUoKSB7XG4gICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgaWYgKCB0aGlzLmN1cnJlbnRQb3NpdGlvbiA8IDIwMCApIHtcbiAgICAgIC8vIHJlbW92ZSBoaWRkZW5cbiAgICAgIHRoaXMuc3RvcmVJY29uLnJlbW92ZUNsYXNzKCdzdG9yZS1oaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIHN0b3JlLWhpZGRlblxuICAgICAgdGhpcy5zdG9yZUljb24uYWRkQ2xhc3MoJ3N0b3JlLWhpZGRlbicpO1xuXG4gICAgfVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiBsb2FkZWRcIik7XG5cbiAgICB0aGlzLmNoZWNrU3RvcmUoKTtcblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSA/IHRoaXMuY2hlY2tTdG9yZS5iaW5kKHRoaXMpIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmNoZWNrU3RvcmUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cblxuICB9XG59XG5cbmxldCBOYXYgPSBuZXcgTmF2Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBGb3Jtc0NvbXBvbmVudCB7XG5cbiAgaXNPcGVuOiBib29sZWFuO1xuICBzdmdBcnJheTogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5zdmdBcnJheSA9ICQoJy5ldDIwMTctY29udGFjdF9fc3ZnJyk7XG4gIH1cblxuICBvbklucHV0Rm9jdXMoIGV2ICkge1xuXG4gICAgbGV0IHBhcmVudCA9ICQoZXYudGFyZ2V0KS5wYXJlbnQoKTtcblxuICAgIHRoaXMuZmlsbElucHV0KHBhcmVudCk7XG4gIH1cblxuICBmaWxsSW5wdXQoIHBhcmVudE9iamVjdDogSlF1ZXJ5ICl7XG5cbiAgICBpZiggIXBhcmVudE9iamVjdC5oYXNDbGFzcygnd3BjZjctZm9ybS1jb250cm9sLXdyYXAnKSl7XG4gICAgICBwYXJlbnRPYmplY3QuYWRkQ2xhc3MoJ2lucHV0LS1maWxsZWQnKTtcbiAgICB9IGVsc2V7XG4gICAgICBwYXJlbnRPYmplY3QucGFyZW50KCkuYWRkQ2xhc3MoJ2lucHV0LS1maWxsZWQnKTtcbiAgICB9XG5cbiAgfVxuICBlbXB0eUlucHV0KCBwYXJlbnRPYmplY3Q6IEpRdWVyeSApe1xuICAgIGlmKCAhcGFyZW50T2JqZWN0Lmhhc0NsYXNzKCd3cGNmNy1mb3JtLWNvbnRyb2wtd3JhcCcpKXtcbiAgICAgIHBhcmVudE9iamVjdC5yZW1vdmVDbGFzcygnaW5wdXQtLWZpbGxlZCcpO1xuICAgIH0gZWxzZXtcbiAgICAgIHBhcmVudE9iamVjdC5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaW5wdXQtLWZpbGxlZCcpO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRCbHVyKCBldiApIHtcbiAgaWYoIGV2LnRhcmdldC52YWx1ZS50cmltKCkgPT09ICcnICkge1xuICAgIGxldCBwYXJlbnQgPSAkKGV2LnRhcmdldCkucGFyZW50KCk7XG5cbiAgICB0aGlzLmVtcHR5SW5wdXQocGFyZW50KTtcbiAgfVxufVxuXG4gIHRyaW1Qcm90b3R5cGUoKXtcbiAgICAvLyB0cmltIHBvbHlmaWxsIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL1RyaW1cbiAgICBpZiAoIVN0cmluZy5wcm90b3R5cGUudHJpbSkge1xuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1BcbiAgICAgICAgdmFyIHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuICAgICAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gICAgICAgIH07XG4gICAgICB9KSgpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUV2ZW50bGlzdGVuZXJzZm9yRm9ybXMoKXtcblxuICAgIFtdLnNsaWNlLmNhbGwoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuZXQtaW5wdXRfX2ZpZWxkJyApICkuZm9yRWFjaCggKGlucHV0RWwpID0+IHtcbiAgICAgIC8vIGluIGNhc2UgdGhlIGlucHV0IGlzIGFscmVhZHkgZmlsbGVkLi5cbiAgICAgIGlmKCBpbnB1dEVsLnZhbHVlLnRyaW0oKSAhPT0gJycgKSB7XG5cbiAgICAgICAgLy8gY2xhc3NpZS5hZGQoIGlucHV0RWwucGFyZW50Tm9kZSwgJ2lucHV0LS1maWxsZWQnICk7XG4gICAgICAgIGxldCBwYXJlbnQgPSAkKGlucHV0RWwpLnBhcmVudCgpO1xuICAgICAgICB0aGlzLmZpbGxJbnB1dChwYXJlbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBldmVudHM6XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIHRoaXMub25JbnB1dEZvY3VzLmJpbmQodGhpcykgKTtcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCB0aGlzLm9uSW5wdXRCbHVyLmJpbmQodGhpcykgKTtcbiAgICB9ICk7XG5cbiAgfVxuXG4gIGlzQ29udGFjdFBhZ2UoKTpib29sZWFue1xuXG4gICAgcmV0dXJuICgkKCcuZXQyMDE3X19jb250YWN0JykubGVuZ3RoID4gMCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG4gIGNvbnRhY3RGb3JtSW5pdCgpe1xuXG4gICAgY29uc29sZS5sb2codGhpcy5zdmdBcnJheSk7XG5cbiAgICB0aGlzLnN2Z0FycmF5Lm9uKCdjbGljaycsIHRoaXMuc3ZnQ2hlY2tTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFkZFN2Z0FuaW1hdGlvbigpe1xuXG4gICAgdGhpcy5zdmdBcnJheS5hZGRDbGFzcygnZW52ZWxvcC1hbmltYXRlLW91dCcpO1xuXG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgdGhpcy5zdmdBcnJheS5yZW1vdmVDbGFzcygncHJpc3RpbmUnKTtcbiAgICAgIHRoaXMuc3ZnQXJyYXkuYWRkQ2xhc3MoJ3RvdWNoZWQnKTtcbiAgICB9LCAzMDApO1xuXG4gIH1cblxuICBzdmdDaGVja1N0YXRlKCl7XG4gICAgY29uc29sZS5sb2coXCJpbml0IGNvbnRhY3RcIik7XG4gICAgaWYoIXRoaXMuaXNPcGVuKXtcblxuICAgICAgLy9hZGQgYW5pbWF0aW9uXG4gICAgICB0aGlzLmFkZFN2Z0FuaW1hdGlvbigpO1xuXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICB9XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMudHJpbVByb3RvdHlwZSgpO1xuXG4gICAgdGhpcy5jcmVhdGVFdmVudGxpc3RlbmVyc2ZvckZvcm1zKCk7XG5cbiAgICAvLyB0aGlzLmlzQ29udGFjdFBhZ2UoKSA/IHRoaXMuY29udGFjdEZvcm1Jbml0KCkgOiBudWxsIDtcblxuICB9XG59XG5cbmxldCBldF9ja19mb3JtcyA9IG5ldyBGb3Jtc0NvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBldF9ja19mb3JtczsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuaW1wb3J0IGpxdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuY29uc3QgJCA9IGpxdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSAwO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IDMyMDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgdGhpcy5icHMgPSB7XG4gICAgICBtb2JpbGU6IDU0NCxcbiAgICAgIHRhYmxldDogNzY4LFxuICAgICAgbGFwdG9wOiA5OTIsXG4gICAgICBkZXNrdG9wOiAxMjAwLFxuICAgICAgZGVza3RvcF94bDogMTYwMFxuICAgIH07XG4gICAgdGhpcy5icm93c2VyID0gVXRpbGl0eUNvbXBvbmVudC53aGljaEJyb3dzZXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludHMgPSAoIGJwczogQnBzSW50ZXJmYWNlICkgPT4ge1xuICAgIGxldCBhcnIgPSBbXTtcblxuICAgIGZvciAoIGxldCBrZXkgaW4gYnBzICkge1xuICAgICAgaWYgKCBicHMuaGFzT3duUHJvcGVydHkoa2V5KSApIHtcbiAgICAgICAgYXJyLnB1c2goYnBzWyBrZXkgXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyci5yZXZlcnNlKCk7XG4gIH07XG4gIHByaXZhdGUgX2NoZWNrQnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBtYWtlIGJyZWFrcG9pbnQgZXZlbnQgYXZhaWxhYmxlIHRvIGFsbCBmaWxlcyB2aWEgdGhlIHdpbmRvdyBvYmplY3RcbiAgICBjb25zb2xlLmxvZyhcImNoZWNrIGJyZWFrcG9pbnQgb24gd2luZG93IHJlc2l6ZVwiKTtcbiAgICBsZXQgb2xkX2JyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG5cbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG5cbiAgICBpZiAoIG9sZF9icmVha3BvaW50ICE9PSB0aGlzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICQod2luZG93KS50cmlnZ2VyKFwiYnJlYWtwb2ludENoYW5nZVwiLCBVdGlscy5icmVha3BvaW50KTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gZ2V0IGJyZWFrcG9pbnQgZnJvbSBjc3NcbiAgICAvLyBjb25zb2xlLmxvZygkKCdib2R5JykuY3NzKFwiei1pbmRleFwiKSk7XG5cbiAgICBsZXQgYm9keSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSksXG4gICAgICB6aW5kZXggPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWyBcInotaW5kZXhcIiBdO1xuXG4gICAgdGhpcy5icmVha3BvaW50ID0gcGFyc2VJbnQoemluZGV4LCAxMCk7XG4gIH07XG4gIHByaXZhdGUgX3NldFdpbmRvd1dpZHRoID0gKCkgPT4ge1xuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHdoaWNoQnJvd3NlcigpIHtcbiAgICBpZiAoIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSAmJiAhKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkgJiYgKG5hdmlnYXRvci5hcHBOYW1lID09PVxuICAgICAgXCJOZXRzY2FwZVwiKSApIHtcblxuICAgICAgaWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpICE9PSBudWxsICkge1xuICAgICAgICByZXR1cm4gXCJpcGFkXCI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInNhZmFyaVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYnVpbGRIdG1sKCB0eXBlOiBzdHJpbmcsIGF0dHJzPzogT2JqZWN0LCBodG1sPzogc3RyaW5nICkge1xuXG4gICAgLy8gaHR0cDovL21hcmNncmFiYW5za2kuY29tL2J1aWxkaW5nLWh0bWwtaW4tanF1ZXJ5LWFuZC1qYXZhc2NyaXB0L1xuXG4gICAgbGV0IGggPSAnPCcgKyB0eXBlO1xuXG4gICAgZm9yICggbGV0IGF0dHIgaW4gYXR0cnMgKSB7XG4gICAgICBpZiAoIGF0dHJzWyBhdHRyIF0gPT09IGZhbHNlICkgY29udGludWU7XG4gICAgICBoICs9ICcgJyArIGF0dHIgKyAnPVwiJyArIGF0dHJzWyBhdHRyIF0gKyAnXCInO1xuICAgIH1cblxuICAgIHJldHVybiBoICs9IGh0bWwgPyBcIj5cIiArIGh0bWwgKyBcIjwvXCIgKyB0eXBlICsgXCI+XCIgOiBcIi8+XCI7XG4gIH1cblxuICBzZXROdW1iZXIoIGNvdW50OiBudW1iZXIgKTogc3RyaW5nIHtcbiAgICAvLyBjb252ZXIgbnVtYmVyIHRvIHN0cmluZ1xuICAgIGxldCB0b3RhbCA9IGNvdW50O1xuICAgIHJldHVybiB0b3RhbC50b1N0cmluZygpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IEJyZWFrcG9pbnQgaXM6XCIsIHRoaXMuYnJlYWtwb2ludCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJyb3dzZXIpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgUHJvZHVjdFN0b3JlIGZyb20gXCIuL3Byb2R1Y3RTdG9yZVwiXG5cbi8qKlxuICpcbiAqIExpY2Vuc2UgU2VsZWN0IENsYXNzXG4gKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gKiBJbnNwaXJlZCBieSBDb2R5SG91c2UuY29cbiAqXG4gKiAqL1xuXG5cbmNsYXNzIFByb2R1Y3RzU2VsZWN0QnRuIHtcbiAgY3RhOiBKUXVlcnk7XG4gIHNlbGVjdEJveDogSlF1ZXJ5O1xuICBsaWNlbnNlQm94OiBKUXVlcnk7XG4gIGluaXRpYWxQcmljZTogc3RyaW5nO1xuICBhZGR0b0NhcnQ6IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgZ3Vtcm9hZExpbms6IHN0cmluZztcbiAgZ3Vtcm9hZFByaWNlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaW5kZXgsIGl0ZW0pIHtcblxuICAgIHRoaXMuY3RhID0gJChpdGVtKTtcbiAgICB0aGlzLmxpY2Vuc2VCb3ggPSB0aGlzLmN0YS5maW5kKCcuc2VsZWN0Jyk7XG4gICAgdGhpcy5zZWxlY3RCb3ggPSB0aGlzLmN0YS5maW5kKCdbZGF0YS10eXBlPVwic2VsZWN0XCJdJyk7XG4gICAgdGhpcy5pbml0aWFsUHJpY2UgPSB0aGlzLmxpY2Vuc2VCb3guZmluZCgnLnN0bmQnKS5kYXRhKCdsaW5rJyk7XG4gICAgdGhpcy5hZGR0b0NhcnQgPSB0aGlzLmN0YS5maW5kKCcuYWRkLXRvLWNhcnQnKTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgfVxuXG4gIHNldFByaWNlVXJsKCl7XG4gICB0aGlzLmFkZHRvQ2FydC5maW5kKCdhJykuYXR0cignaHJlZicsIHRoaXMuaW5pdGlhbFByaWNlKTtcbiAgfVxuXG4gIG9uU2VsZWN0QnV0dG9uQ2xpY2soZSl7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7IC8vdGFyZ2V0cyB0aGUgZGl2IHdyYXBwZXJcblxuICAgIC8vY2hlY2sgaWYgYW5vdGhlciBib3ggaGFzIGJlZW4gb3BlbmVkXG4gICAgaWYoUHJvZHVjdFN0b3JlLnN0YXRlLmlzT3Blbil7XG4gICAgICB0aGlzLnJlc2V0U2VsZWN0Qm94KCR0aGlzKTtcbiAgICB9XG5cbiAgICAvL3RvZ2dsZSBvcGVuXG4gICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICBQcm9kdWN0U3RvcmUuc3RhdGUuaXNPcGVuID0gdHJ1ZTtcblxuXG4gICAgLy90YXJnZXQgdGhlIGFjdHVhbCBlbGVtZW50IHRoYXQgd2FzIGNsaWNrZWQgLSB0aGlzIGdldHMgZmlyZWQgZXZlcnl0aW1lIGEgdXNlciBjbGlja3MsIHNvIGl0IGRvZXNudCBtYXR0ZXJcbiAgICAvL2JlY2F1c2UgdGhlIGl0ZW0geW91IHNlbGVjdCBmaXJzdCBpcyBhbHdheXMgdGhlIGFjdGl2ZSBpdGVtIHNpbmNlIG9ubHkgb25lIGlzIHNob3duIGF0IGEgdGltZS5cbiAgICBpZiggJChlLnRhcmdldCkuaXMoJ2xpJykpe1xuXG4gICAgICAvL2luZGV4IGlzIGtpbmRhIGEgaGFjayB0byBzZWxlY3QgdGhlIGl0ZW0gdGhhdCBnZXRzIHNlbGVjdGVkIGJ5IGFsd2F5cyBhZGRpbmcgb25lIHRvIHRoZSBpbmRleFxuICAgICAgbGV0IGFjdGl2ZUl0ZW0gPSAkKGUudGFyZ2V0KSxcbiAgICAgICAgICBpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKSArIDE7IC8vZ2V0IHBvc2l0aW9uIG9mIGVsZW1lbnQgY2xpY2tlZCByZWxhdGl2ZSB0byBpdHMgc2libGluZ3NcblxuICAgICAgLy9BZGQgYWN0aXZlXG4gICAgICBhY3RpdmVJdGVtLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgLy9nZXQgZ3Vtcm9hZCBkYXRhXG4gICAgICB0aGlzLmd1bXJvYWRMaW5rID0gJHRoaXMuZmluZCgnLmFjdGl2ZScpLmRhdGEoJ2xpbmsnKTtcbiAgICAgIHRoaXMuZ3Vtcm9hZFByaWNlID0gJHRoaXMuZmluZCgnLmFjdGl2ZScpLmRhdGEoJ3ByaWNlJyk7XG5cbiAgICAgIC8vZGV0ZXJtaW5lIHdoYXQgaW5kZXggdG8gYWRkIGFuZCBzaG93XG4gICAgICAkdGhpcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQtMSBzZWxlY3RlZC0yIHNlbGVjdGVkLTMnKS5hZGRDbGFzcygnc2VsZWN0ZWQtJyArIGluZGV4KTtcblxuICAgICAgLy9zZXQgZ3Vtcm9hZCBsaW5rIGZyb20gTEkgYW5kIHNldCBpdCBvbiB0aGUgYnV5bm93XG4gICAgICAkdGhpcy5zaWJsaW5ncygnLmFkZC10by1jYXJ0JykuZmluZCgnYScpLmF0dHIoJ2hyZWYnLCB0aGlzLmd1bXJvYWRMaW5rKTtcblxuICAgICAgLy9TZXQgcHJpY2VcbiAgICAgICR0aGlzLnBhcmVudHMoJy5ldC1ib3gtaXRlbV9fZGVzY3JpcHRpb24nKS5maW5kKCcucHJvZHVjdC1wcmljZScpLnRleHQodGhpcy5ndW1yb2FkUHJpY2UpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZXNldFNlbGVjdEJveCh0YXJnZXQpe1xuXG4gICAgLy9jbG9zZXMgdGhlIHVsIGlmIGxlZnQgb3BlbiBvciB1c2VyIGlzIG5vdCBpbnRlcmFjdGluZyB3aXRoIHRoZW1cbiAgICB0YXJnZXQucGFyZW50cygnLmV0LWJveC1pdGVtJykuc2libGluZ3MoJ2RpdicpLmZpbmQoJ1tkYXRhLXR5cGU9XCJzZWxlY3RcIl0nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICB9XG5cbiAgc2FmYXJpQ2hlY2soKXtcbiAgICBpZihVdGlscy5icm93c2VyID09PSAnc2FmYXJpJyl7XG4gICAgICBsZXQgY3NzID0ge1xuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogJzAnLFxuICAgICAgICAndHJhbnNpdGlvbic6ICcwJ1xuICAgICAgfTtcbiAgICAgIHRoaXMuc2VsZWN0Qm94LmZpbmQoJ3VsJykuY3NzKGNzcylcbiAgICB9XG4gIH1cbiAgXG5cbiAgaW5pdERyb3Bkb3duKCk6IHZvaWQge1xuXG4gICAgdGhpcy5zYWZhcmlDaGVjaygpO1xuXG4gICAgdGhpcy5zZXRQcmljZVVybCgpO1xuXG4gICAgdGhpcy5zZWxlY3RCb3gub24oJ2NsaWNrJywgdGhpcy5vblNlbGVjdEJ1dHRvbkNsaWNrLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzU2VsZWN0QnRuOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbi8qKlxuICpcbiAqIFN0YXRlIGZvciBQcm9kdWN0c1xuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogXG4gKlxuICogKi9cblxuaW50ZXJmYWNlIElQcm9kdWN0U3RvcmV7XG4gIGlzT3Blbjpib29sZWFuO1xuICBjdXJyZW50SW5kZXg6IG51bWJlcjtcbn1cblxuY2xhc3MgUHJvZHVjdFN0b3JlIHtcblxuICBzdGF0ZTogSVByb2R1Y3RTdG9yZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgIGN1cnJlbnRJbmRleDogMFxuICAgIH1cbiAgfVxuXG59XG5cblxubGV0IFByb2R1Y3RfU3RvcmUgPSBuZXcgUHJvZHVjdFN0b3JlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RfU3RvcmU7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcblxuLyoqIFxuICogXG4gKiBGb250IFByZXZpZXcgQ29tcG9uZW50XG4gKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gKiBDb25uZWN0cyB0byBSZWFjdCBjb21wb25lbnQgdXNpbmcgZGlzcGF0Y2ggZXZlbnQgdHJpZ2dlciBcbiAqIFxuICogKi9cbiAgXG4gIFxuY2xhc3MgUHJvZHVjdHNGb250UHJldmlld0NvbXBvbmVudCB7XG4gIGZvbnRQcmV2aWV3QXJyYXk6IGFueTtcbiAgZXZlbnQ6IEV2ZW50O1xuICBhcHA6IEpRdWVyeTtcbiAgaXNPcGVuOiBCb29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9udFByZXZpZXdBcnJheSA9ICQoXCIuZXQtZm9udC1wcmV2aWV3X19saW5rXCIpO1xuICAgIHRoaXMuYXBwID0gJCgnI2FwcCcpO1xuICB9XG5cbiAgYWRkQnV0dG9uQ2xpY2soKSB7XG4gICAgdGhpcy5mb250UHJldmlld0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAkKGVsKS5vbihcImNsaWNrXCIsIHRoaXMuYnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVFdmVudCgpIHtcbiAgICB0aGlzLmV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgXCJmb250Q2hlY2tcIixcbiAgICAgIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbWVzc2FnZTogXCJGb250IENvbXBvbmVudCB1cCFcIixcbiAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICB9LFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHNldERhdGEoIGRhdGEgKSB7XG4gICAgdGhpcy5hcHAuYXR0cih7XG4gICAgICBcImRhdGEtcGxhY2Vob2xkZXJcIjogZGF0YS5wbGFjZWhvbGRlcixcbiAgICAgIFwiZGF0YS1uYW1lXCI6IGRhdGEubmFtZSxcbiAgICAgIFwiZGF0YS1zdHlsZXNcIjogZGF0YS5zdHlsZXNcbiAgICB9KTtcbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEJ1aWxkIGZvbnQgYXR0clxuICAgIGxldCBlbGVtZW50ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGxldCBuYW1lID0gZWxlbWVudC5kYXRhKFwibmFtZVwiKTtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgcGxhY2Vob2xkZXI6IG5hbWUgKyBcIiBwcmV2aWV3XCIsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgc3R5bGVzOiBlbGVtZW50LmRhdGEoXCJzdHlsZXNcIikuc3BsaXQoJywnKVxuICAgIH07XG5cbiAgICAvLyBwYXNzIG5ldyBkYXRhIGludG8gcmVhY3QgYXBwXG4gICAgdGhpcy5zZXREYXRhKGRhdGEpO1xuXG4gICAgLy8gZmlyZSBldmVudCB0byBub3RpZnkgUmVhY3QgYXBwIHRvIHVwZGF0ZVxuICAgIGUuY3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnQpO1xuXG4gICAgLy8gb3BlbiBzbGlkZXJcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKCB0aGlzLmlzT3BlbiApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHAuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuYXBwLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICB0aGlzLmNyZWF0ZUV2ZW50KCk7XG4gICAgdGhpcy5hZGRCdXR0b25DbGljaygpO1xuXG4gICAgLy9kZWxheSBzaG93aW5nIHRoZSBhcHAgZm9yIGp1c3QgYSBzZWMgZm9yIHNhZmFyaSBmaXhcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3RzIEZvbnQgUHJldmlldyBsb2FkZWRcIik7XG4gICAgICAkKCcjYXBwJykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxufVxuXG5sZXQgUHJvZHVjdHNfZm9udF9wcmV2aWV3X2pzID0gbmV3IFByb2R1Y3RzRm9udFByZXZpZXdDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdHNfZm9udF9wcmV2aWV3X2pzOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VsZWN0X0J0biBmcm9tIFwiLi9wcm9kdWN0LXNlbGVjdFwiO1xuaW1wb3J0IFByb2R1Y3RTdG9yZSBmcm9tIFwiLi9wcm9kdWN0U3RvcmVcIlxuXG4vKipcbiAqXG4gKiBMaWNlbnNlIFNlbGVjdCBGdW5jdGlvbmFsaXR5XG4gKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gKiBJbnNwaXJlZCBieSBDb2R5SG91c2UuY29cbiAqXG4gKiAqL1xuXG5cbmNsYXNzIFByb2R1Y3RzTGljZW5zZVNlbGVjdCB7XG4gIHByb2R1Y3RDb250YWluZXI6IEpRdWVyeTtcbiAgYW5pbWF0aW5nOiBib29sZWFuO1xuICBhZGRUb0NhcnRCdG46IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2R1Y3RDb250YWluZXIgPSAkKCcucHJvZHVjdHMtY3RhJyk7XG4gICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmFkZFRvQ2FydEJ0biA9ICQoJy5hZGQtdG8tY2FydCcpO1xuICB9XG5cbiAgY2hlY2tDbGlja0FyZWEoKXtcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAvL2lmIHVzZXIgY2xpY2tzIG91dHNpZGUgdGhlIC5jZC1nYWxsZXJ5IGxpc3QgaXRlbXMgLSByZW1vdmUgdGhlIC5ob3ZlciBjbGFzcyBhbmQgY2xvc2UgdGhlIG9wZW4gdWwuc2l6ZS91bC5jb2xvciBsaXN0IGVsZW1lbnRzXG4gICAgICBpZiggISQoZXZlbnQudGFyZ2V0KS5pcygnZGl2LnNlbGVjdCcpICYmICAhJChldmVudC50YXJnZXQpLmlzKCdsaScpKSB7XG4gICAgICAgIGlmKFByb2R1Y3RTdG9yZS5zdGF0ZS5pc09wZW4pe1xuICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIFByb2R1Y3RTdG9yZS5zdGF0ZS5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnByb2R1Y3RDb250YWluZXIuZmluZCgnW2RhdGEtdHlwZT1cInNlbGVjdFwiXScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gIH1cbiAgXG4gIGluaXREcm9wZG93biggaXRlbXM6IEpRdWVyeSl7XG5cbiAgICBpdGVtcy5lYWNoKCAoaW5kZXgsIGVsKSA9PiB7XG4gICAgXG4gICAgICBsZXQgYnRuID0gbmV3IFNlbGVjdF9CdG4oaW5kZXgsIGVsKTtcbiAgICBcbiAgICAgIGJ0bi5pbml0RHJvcGRvd24oKTtcbiAgICBcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coXCJQcm9kdWN0cyBMaWNlbnNlIFNlbGVjdCBMb2FkZWRcIik7XG4gICAgdGhpcy5jaGVja0NsaWNrQXJlYSgpO1xuICAgIFxuICAgIC8vaW5pdGlhbGl6ZVxuICAgIHRoaXMuaW5pdERyb3Bkb3duKHRoaXMucHJvZHVjdENvbnRhaW5lcikgLy9sb29wIHRocm91Z2ggYWxsIHNlbGVjdCBidG5zIGFuZCBjcmVhdGUgZHJvcGRvd25cbiAgfVxuXG59XG5cbmxldCBQcm9kdWN0c19MaWNlbnNlX3NlbGVjdCA9IG5ldyBQcm9kdWN0c0xpY2Vuc2VTZWxlY3QoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdHNfTGljZW5zZV9zZWxlY3Q7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBGb250X1ByZXZpZXdfQ2xhc3MgZnJvbSBcIi4vcHJvZHVjdHMtZm9udC1wcmV2aWV3XCI7XG5pbXBvcnQgTGljZW5zZV9TZWxlY3RfQ2xhc3MgZnJvbSBcIi4vcHJvZHVjdHMtbGljZW5zZVwiO1xuaW1wb3J0IFByb2R1Y3RzX01vZGFsc19DbGFzcyBmcm9tIFwiLi9wcm9kdWN0cy1tb2RhbHNcIjtcblxuY29uc3QgRm9udF9QcmV2aWV3ID0gRm9udF9QcmV2aWV3X0NsYXNzO1xuY29uc3QgTGljZW5zZV9TZWxlY3QgPSBMaWNlbnNlX1NlbGVjdF9DbGFzcztcbmNvbnN0IFByb2R1Y3RzX01vZGFscyA9IFByb2R1Y3RzX01vZGFsc19DbGFzcztcblxuY2xhc3MgUHJvZHVjdHNDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICB2YXIgaXNQcm9kdWN0UGFnZSA9ICgkKFwiLmV0LXByb2R1Y3QtcGFnZVwiKS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlKTtcblxuICAgIGlmKGlzUHJvZHVjdFBhZ2Upe1xuICAgICAgLy8gY29uc29sZS5sb2coXCJQcm9kdWN0cyBNYWluIExvYWRlZFwiKTtcbiAgICAgIEZvbnRfUHJldmlldy5pbml0KCk7XG4gICAgICBMaWNlbnNlX1NlbGVjdC5pbml0KCk7XG4gICAgICBQcm9kdWN0c19Nb2RhbHMuaW5pdCgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmxldCBQcm9kdWN0cyA9IG5ldyBQcm9kdWN0c0NvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0czsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IHtQcm9taXNlfSBmcm9tIFwiZXM2LXByb21pc2VcIjtcbi8qKlxuICpcbiAqIFlvdXR1YmUgbW9kYWwgZnVuY3Rpb25hbGl0eVxuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogXG4gKlxuICogKi9cblxuaW50ZXJmYWNlIFdpbmRvdyB7XG4gIGV0X3Byb2R1Y3RzOiBhbnk7XG59XG5kZWNsYXJlIHZhciB3aW5kb3c6IFdpbmRvdztcblxuXG5jbGFzcyBQcm9kdWN0c01vZGFsc0NsYXNzIHtcbiAgeW91dHViZV9idG46IE5vZGVMaXN0O1xuICB5b3V0dWJlTGluazogc3RyaW5nO1xuICB5b3V0dWJlX3BsYXllcjogRWxlbWVudDtcbiAgd2luZG93OiBXaW5kb3c7XG4gIHRvdWNoZWQ6IGJvb2xlYW47XG4gIGxpY2Vuc2VEYXRhOiBhbnk7XG5cbiAgbGljZW5zZU1vZGFsOiBKUXVlcnk7XG4gIGxpY2Vuc2VNb2RhbEJ0bjogSlF1ZXJ5O1xuICBsaWNfbW9kYWxfdGFiQ29udGVudDogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMueW91dHViZV9idG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmV0LWJveC1pdGVtX195b3V0dWJlJyApO1xuICAgIHRoaXMueW91dHViZV9wbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneW91dHViZS1wbGF5ZXInKTtcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcbiAgICB0aGlzLnRvdWNoZWQgPSBmYWxzZTtcblxuICAgIHRoaXMubGljZW5zZU1vZGFsID0gJCgnI2xpY2Vuc2VNb2RhbCcpO1xuICAgIHRoaXMubGljZW5zZU1vZGFsQnRuID0gJCgnLmxpY2Vuc2VNb2RhbCcpO1xuICAgIHRoaXMubGljX21vZGFsX3RhYkNvbnRlbnQgPSB0aGlzLmxpY2Vuc2VNb2RhbC5maW5kKCcudGFiLWNvbnRlbnQnKTtcbiAgICB0aGlzLmxpY2Vuc2VEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V0TGljZW5zZXMnKTtcblxuICB9XG5cbiAgYWRkRXZlbnRzKCl7XG5cbiAgICAvL0FkZCB5b3V0dWJlIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgIFtdLnNsaWNlLmNhbGwoIHRoaXMueW91dHViZV9idG4gKS5mb3JFYWNoKCAoIGlucHV0RWwgKSA9PiB7XG5cbiAgICAgIC8vIGV2ZW50czpcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5vbllvdVR1YmVPcGVuLmJpbmQodGhpcykgKTtcbiAgICB9ICk7XG4gICAgJCgnI2V0X3lvdXR1YmVNb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCB0aGlzLm9uWW91dHViZUNsb3NlLmJpbmQodGhpcykpO1xuXG4gICAgLy9BZGQgTGljZW5zZSBjbGljayBoYW5kbGVyc1xuICAgIHRoaXMubGljZW5zZU1vZGFsQnRuLm9uKCdjbGljaycsIHRoaXMub25Nb2RhbE9wZW4uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5saWNlbnNlTW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIHRoaXMub25Nb2RhbENsb3NlLmJpbmQodGhpcykpO1xuICAgIFxuICB9XG5cbiAgb25Zb3VUdWJlT3BlbiggZXYgKXtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy55b3V0dWJlTGluayA9IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS15b3V0dWJlJyk7XG5cbiAgICAvL0FkZCB6aW5kZXggdG8gaHRtbCBlbGVtZW50cyB0byBhZGQgY3VzdG9tIE92ZXJsYXlcbiAgICB0aGlzLmFkZFooKTtcblxuICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55b3UtdHViZS1wb3AnKTtcblxuICAgIC8vc2VuZCB0byBtb2RhbFxuICAgIHRoaXMuc2V0U3JjKCBwb3B1cCwgdGhpcy55b3V0dWJlTGluayApO1xuXG5cbiAgICAvL2FjdGl2ZSBtb2RhbFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gJCgnLm1vZGFsLWJvZHknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB0aGlzLmFkZENsYXNzRWxlbWVudCgnLm1vZGFsLWJvZHknLCAnYWN0aXZlJyk7XG5cbiAgICB9LDMwMCk7XG4gICAgXG4gICAgLy9hY3RpdmF0ZSBjdXN0b20gb3ZlcmxheVxuICAgIHRoaXMuYWRkT3ZlcmxheSgpO1xuXG4gIH1cblxuICBhZGRDbGFzc0VsZW1lbnQoIGVsOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nICl7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cbiAgfVxuXG4gIHJlbW92ZUNsYXNzRWxlbWVudCggZWw6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcgKXtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblxuICB9XG5cbiAgYWRkWigpIHtcbiAgICB0aGlzLmFkZENsYXNzRWxlbWVudCgnLmVsdGRmLWNvbnRlbnQnLCAncHJvZHVjdHMtemluZGV4Jyk7XG4gICAgdGhpcy5hZGRDbGFzc0VsZW1lbnQoJy5lbHRkZi13cmFwcGVyJywgJ3Byb2R1Y3RzLXppbmRleCcpO1xuICB9XG5cbiAgcmVtb3ZlWigpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzRWxlbWVudCgnLmVsdGRmLWNvbnRlbnQucHJvZHVjdHMtemluZGV4JywgJ3Byb2R1Y3RzLXppbmRleCcpO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3NFbGVtZW50KCcuZWx0ZGYtd3JhcHBlci5wcm9kdWN0cy16aW5kZXgnLCAncHJvZHVjdHMtemluZGV4Jyk7XG4gIH1cblxuICBvbllvdXR1YmVDbG9zZSgpe1xuICAgIHRoaXMucmVtb3ZlQ2xhc3NFbGVtZW50KCcubW9kYWwtYm9keScsICdhY3RpdmUnKTtcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXkoKTtcbiAgfVxuXG4gIG9uWW91dHViZUNsb3NlQnRuKCl7XG4gICAgbGV0IHlvdXR1YmVNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldF95b3V0dWJlX2Nsb3NlX21vZGFsJyk7XG5cbiAgICB5b3V0dWJlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnlvdXR1YmVTdG9wVmlkZW8uYmluZCh0aGlzKSk7XG4gIH1cblxuICB5b3V0dWJlU3RvcFZpZGVvKCl7XG4gICAgbGV0IHZpZGVvU3JjID0gdGhpcy55b3V0dWJlX3BsYXllci5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXG4gICAgdGhpcy55b3V0dWJlX3BsYXllci5zZXRBdHRyaWJ1dGUoJ3NyYycsJycpO1xuICAgIHRoaXMueW91dHViZV9wbGF5ZXIuc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRlb1NyYyk7XG4gIH1cblxuICBhZGRPdmVybGF5KCl7XG4gICAgbGV0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXQtcHJvZHVjdC1vdmVybGF5IGZhZGUnKTtcbiAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnaWQnLCAnZXQtcHJvZHVjdC1vdmVybGF5Jyk7XG5cbiAgICAvL29uY2xpY2sgYWRkIG91ciBvd24gb3ZlcmxheSB0byBib2R5XG4gICAgLy8gJChcIi5lbHRkZi1mdWxsLXdpZHRoXCIpLmFwcGVuZChvdmVybGF5KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWx0ZGYtZnVsbC13aWR0aCcpLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXG4gICAgLy9oaWRlIHN0aWNreSBoZWFkZXJcbiAgICAvLyAkKFwiLmVsdGRmLXN0aWNreS1oZWFkZXJcIikuYWRkQ2xhc3MoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuYWRkQ2xhc3NFbGVtZW50KCcuZWx0ZGYtc3RpY2t5LWhlYWRlcicsICdtb2RhbC1vcGVuJyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAkKCcuZXQtcHJvZHVjdC1vdmVybGF5JykuYWRkQ2xhc3MoJ2luJyk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlbW92ZU92ZXJsYXkoKSB7XG5cbiAgICB0aGlzLnJlbW92ZVooKTtcblxuICAgIC8vICQoXCIubGljLW92ZXJsYXlcIikucmVtb3ZlKCk7XG4gICAgbGV0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXQtcHJvZHVjdC1vdmVybGF5Jyk7XG4gICAgb3ZlcmxheS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuXG5cbiAgICAvL2FuaW1hdGUgc3RpY2t5IGhlYWRlciBiYWNrIGluXG4gICAgdGhpcy5yZW1vdmVDbGFzc0VsZW1lbnQoJy5lbHRkZi1zdGlja3ktaGVhZGVyJywgJ21vZGFsLW9wZW4nKTtcblxuICB9XG5cbiAgc2V0U3JjKCBlbDogRWxlbWVudCwgdmFsdWU6IHN0cmluZyApe1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3JjJywgdmFsdWUpO1xuICAgICAgLy8gJCgnLnlvdS10dWJlLXBvcCcpLmF0dHIoJ3NyYycsIHlvdXR1YmVMaW5rKTtcbiAgICB9LDEwMCk7XG5cbiAgfVxuXG4gIG9uTW9kYWxDbG9zZSgpe1xuICAgICQoJ2JvZHknKS5jc3Moe1xuICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnaW5oZXJpdCcsXG4gICAgICBwYWRkaW5nOiAnMCdcbiAgICB9KTtcblxuICAgICQoJ2h0bWwnKS5jc3Moe1xuICAgICAgb3ZlcmZsb3dZOiAnc2Nyb2xsJ1xuICAgIH0pO1xuXG4gICAgdGhpcy5saWNfbW9kYWxfdGFiQ29udGVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzRWxlbWVudCgnLm1vZGFsLWJvZHknLCAnYWN0aXZlJyk7XG4gICAgdGhpcy5yZW1vdmVPdmVybGF5KCk7XG4gIH1cblxuICBhbmltYXRlTW9kYWxJbigpe1xuICAgIHRoaXMubGljX21vZGFsX3RhYkNvbnRlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB9XG5cbiAgb25Nb2RhbE9wZW4oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCgnYm9keScpLmNzcyh7XG4gICAgICBwYWRkaW5nOiAnMCAxNXB4IDAgMCdcbiAgICB9KTtcblxuICAgICQoJ2h0bWwnKS5jc3Moe1xuICAgICAgb3ZlcmZsb3dZOiAnaGlkZGVuJyxcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldE1vZGFsSGVpZ2h0KCl7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5saWNlbnNlTW9kYWwuZmluZCgnLnRhYi1jb250ZW50JykuaGVpZ2h0KCk7XG4gICAgICBsZXQgdGFicyA9IHRoaXMubGljZW5zZU1vZGFsLmZpbmQoJy5uYXYtdGFicycpLmhlaWdodCgpO1xuXG4gICAgICAkKCcjbGljZW5zZU1vZGFsIC5tb2RhbC1ib2R5JykuaGVpZ2h0KGhlaWdodCArIHRhYnMpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICQoJyNsaWNlbnNlTW9kYWwgLm1vZGFsLWJvZHknKS5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuXG5cbiAgICB0aGlzLmFzeW5jRGF0YUNhbGwoKS50aGVuKCAoZGF0YTogYW55KSA9PiB7XG5cbiAgICAgIC8vcmVtb3ZlIHNwaW5uZXIgLSBjb250ZW50IGxvYWRlZFxuICAgICAgJCgnLm1vZGFsLWxvYWRlcicpLmNzcyh7XG4gICAgICAgIG9wYWNpdHk6ICcwJ1xuICAgICAgfSk7XG5cbiAgICAgIGlmKHRoaXMudG91Y2hlZCl7XG4gICAgICAgIHRoaXMubGljZW5zZU1vZGFsLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZU1vZGFsSW4oKTtcbiAgICAgIH1lbHNle1xuXG4gICAgICAgICQoXCIjc3RhbmRhcmRcIikuaHRtbChkYXRhLnN0YW5kYXJkKTtcbiAgICAgICAgJChcIiNleHRlbmRlZFwiKS5odG1sKGRhdGEuZXh0ZW5kZWQpO1xuXG4gICAgICAgIHRoaXMubGljZW5zZU1vZGFsLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlTW9kYWxJbigpO1xuXG4gICAgICAgIHRoaXMudG91Y2hlZCA9IHRydWU7XG4gICAgICB9XG5cblxuICAgIH0pO1xuXG4gICAgLy9BZGQgemluZGV4IHRvIGh0bWwgZWxlbWVudHMgdG8gYWRkIGN1c3RvbSBPdmVybGF5XG4gICAgdGhpcy5hZGRaKCk7XG5cbiAgICAvL2FjdGl2ZSBtb2RhbFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gJCgnLm1vZGFsLWJvZHknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB0aGlzLmFkZENsYXNzRWxlbWVudCgnLm1vZGFsLWJvZHknLCAnYWN0aXZlJyk7XG5cbiAgICB9LDMwMCk7XG5cblxuICAgIC8vYWN0aXZhdGUgY3VzdG9tIG92ZXJsYXlcbiAgICB0aGlzLmFkZE92ZXJsYXkoKTtcblxuICAgIC8vYWN0aXZhdGUgc3Bpbm5lcntcbiAgICAkKCcuZXQtcHJvZHVjdC1vdmVybGF5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibW9kYWwtbG9hZGVyXCI+PC9kaXY+Jyk7XG4gIH1cblxuICBhc3luY0RhdGFDYWxsKCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLndpbmRvdy5ldF9wcm9kdWN0cy51cmwgKyAnL3dwLWpzb24vcHJvZHVjdC1saWNlbnNlcy92MS9saWNlbnNlJztcblxuICAgICAgaWYoIHRoaXMubGljZW5zZURhdGEgIT09IG51bGwgKXtcblxuICAgICAgICAvL2NoZWNrIGlmIGRhdGEgd2FzIGp1c3QgcHVsbGVkIGZyb20gYnJvd3NlciBjYWNoZVxuICAgICAgICBpZih0eXBlb2YgdGhpcy5saWNlbnNlRGF0YSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgIHRoaXMubGljZW5zZURhdGEgPSBKU09OLnBhcnNlKHRoaXMubGljZW5zZURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXR1cm5lZCB0aGUgY2FjaGVkIGRhdGFcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmxpY2Vuc2VEYXRhKTtcblxuICAgICAgfWVsc2V7XG5cbiAgICAgICAgLy8gTWFrZSBBamF4IGNhbGxcbiAgICAgICAgJC5nZXQodXJsU3RyaW5nKS5kb25lKChkYXRhKT0+e1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdldExpY2Vuc2VzJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgIHRoaXMubGljZW5zZURhdGEgPSBkYXRhO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5saWNlbnNlRGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgdGhpcy5vbllvdXR1YmVDbG9zZUJ0bigpO1xuICB9XG5cbn1cblxubGV0IFByb2R1Y3RzX01vZGFscyA9IG5ldyBQcm9kdWN0c01vZGFsc0NsYXNzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzX01vZGFsczsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zdGVmYW5wZW5uZXIvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgNC4wLjVcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwuRVM2UHJvbWlzZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxudmFyIF9pc0FycmF5ID0gdW5kZWZpbmVkO1xuaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gIF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufSBlbHNlIHtcbiAgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xufVxuXG52YXIgaXNBcnJheSA9IF9pc0FycmF5O1xuXG52YXIgbGVuID0gMDtcbnZhciB2ZXJ0eE5leHQgPSB1bmRlZmluZWQ7XG52YXIgY3VzdG9tU2NoZWR1bGVyRm4gPSB1bmRlZmluZWQ7XG5cbnZhciBhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gIGxlbiArPSAyO1xuICBpZiAobGVuID09PSAyKSB7XG4gICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgIGlmIChjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgY3VzdG9tU2NoZWR1bGVyRm4oZmx1c2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICBjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG59XG5cbmZ1bmN0aW9uIHNldEFzYXAoYXNhcEZuKSB7XG4gIGFzYXAgPSBhc2FwRm47XG59XG5cbnZhciBicm93c2VyV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG52YXIgYnJvd3Nlckdsb2JhbCA9IGJyb3dzZXJXaW5kb3cgfHwge307XG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHt9KS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5cbi8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXG52YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBub2RlXG5mdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgLy8gbm9kZSB2ZXJzaW9uIDAuMTAueCBkaXNwbGF5cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2hlbiBuZXh0VGljayBpcyB1c2VkIHJlY3Vyc2l2ZWx5XG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbn1cblxuLy8gdmVydHhcbmZ1bmN0aW9uIHVzZVZlcnR4VGltZXIoKSB7XG4gIGlmICh0eXBlb2YgdmVydHhOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG5vZGUuZGF0YSA9IGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyO1xuICB9O1xufVxuXG4vLyB3ZWIgd29ya2VyXG5mdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgZ2xvYmFsU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICB9O1xufVxuXG52YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdFZlcnR4KCkge1xuICB0cnkge1xuICAgIHZhciByID0gcmVxdWlyZTtcbiAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB1bmRlZmluZWQ7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgaWYgKF9zdGF0ZSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBfYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhfc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxudmFyIEdFVF9USEVOX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW4ocHJvbWlzZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICByZXR1cm4gR0VUX1RIRU5fRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKSB7XG4gIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmIHRoZW4kJCA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUpIHtcbiAgICBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhlbiQkID09PSBHRVRfVEhFTl9FUlJPUikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGVuJCQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gRXJyb3JPYmplY3QoKSB7XG4gIHRoaXMuZXJyb3IgPSBudWxsO1xufVxuXG52YXIgVFJZX0NBVENIX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICBlcnJvciA9IHVuZGVmaW5lZCxcbiAgICAgIHN1Y2NlZWRlZCA9IHVuZGVmaW5lZCxcbiAgICAgIGZhaWxlZCA9IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICB2YWx1ZSA9IHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgaWYgKHZhbHVlID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgdmFsdWUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gRlVMRklMTEVEKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG52YXIgaWQgPSAwO1xuZnVuY3Rpb24gbmV4dElkKCkge1xuICByZXR1cm4gaWQrKztcbn1cblxuZnVuY3Rpb24gbWFrZVByb21pc2UocHJvbWlzZSkge1xuICBwcm9taXNlW1BST01JU0VfSURdID0gaWQrKztcbiAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICBtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBfcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIHZhciBfaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fZWFjaEVudHJ5KF9pbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICB2YXIgcmVzb2x2ZSQkID0gYy5yZXNvbHZlO1xuXG4gIGlmIChyZXNvbHZlJCQgPT09IHJlc29sdmUpIHtcbiAgICB2YXIgX3RoZW4gPSBnZXRUaGVuKGVudHJ5KTtcblxuICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIF90aGVuKTtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJChlbnRyeSk7XG4gICAgICB9KSwgaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQoZW50cnkpLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFByb21pc2UuYWxsYCBhY2NlcHRzIGFuIGFycmF5IG9mIHByb21pc2VzLCBhbmQgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoXG4gIGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBwcm9taXNlcywgb3JcbiAgcmVqZWN0ZWQgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBiZSByZWplY3RlZC4gSXQgY2FzdHMgYWxsXG4gIGVsZW1lbnRzIG9mIHRoZSBwYXNzZWQgaXRlcmFibGUgdG8gcHJvbWlzZXMgYXMgaXQgcnVucyB0aGlzIGFsZ29yaXRobS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIFRoZSBhcnJheSBoZXJlIHdvdWxkIGJlIFsgMSwgMiwgMyBdO1xuICB9KTtcbiAgYGBgXG5cbiAgSWYgYW55IG9mIHRoZSBgcHJvbWlzZXNgIGdpdmVuIHRvIGBhbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVqZWN0KG5ldyBFcnJvcihcIjJcIikpO1xuICBsZXQgcHJvbWlzZTMgPSByZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAvLyBlcnJvci5tZXNzYWdlID09PSBcIjJcIlxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBhbGxcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cbiAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBhbGwoZW50cmllcykge1xuICByZXR1cm4gbmV3IEVudW1lcmF0b3IodGhpcywgZW50cmllcykucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJhY2VgIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaCBpcyBzZXR0bGVkIGluIHRoZSBzYW1lIHdheSBhcyB0aGVcbiAgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gc2V0dGxlLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0ID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIGl0IHdhcyByZXNvbHZlZCBiZWZvcmUgcHJvbWlzZTFcbiAgICAvLyB3YXMgcmVzb2x2ZWQuXG4gIH0pO1xuICBgYGBcblxuICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XG4gIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcbiAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xuICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdwcm9taXNlIDInKSk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxuICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXG4gIH0pO1xuICBgYGBcblxuICBBbiBleGFtcGxlIHJlYWwtd29ybGQgdXNlIGNhc2UgaXMgaW1wbGVtZW50aW5nIHRpbWVvdXRzOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXG4gIHByb21pc2UgdG8gc2V0dGxlLlxuKi9cbmZ1bmN0aW9uIHJhY2UoZW50cmllcykge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAgYFByb21pc2UucmVqZWN0YCByZXR1cm5zIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgYHJlYXNvbmAuXG4gIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlamVjdFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIGdpdmVuIGByZWFzb25gLlxuKi9cbmZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UgPyBpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBuZWVkc05ldygpO1xuICB9XG59XG5cblByb21pc2UuYWxsID0gYWxsO1xuUHJvbWlzZS5yYWNlID0gcmFjZTtcblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5Qcm9taXNlLnJlamVjdCA9IHJlamVjdDtcblByb21pc2UuX3NldFNjaGVkdWxlciA9IHNldFNjaGVkdWxlcjtcblByb21pc2UuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZS5fYXNhcCA9IGFzYXA7XG5cblByb21pc2UucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUHJvbWlzZSxcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICB9KTtcbiAgICBgYGBcbiAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQXNzaW1pbGF0aW9uXG4gICAgLS0tLS0tLS0tLS0tXG4gIFxuICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IHJlc3VsdDtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IGF1dGhvciwgYm9va3M7XG4gIFxuICAgIHRyeSB7XG4gICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgXG4gICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICBcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kQXV0aG9yKCkuXG4gICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIHRoZW5cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgdGhlbjogdGhlbixcblxuICAvKipcbiAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cbiAgXG4gICAgYGBganNcbiAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gICAgdmFyIGxvY2FsID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgaWYgKFApIHtcbiAgICAgICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2U7XG59XG5cbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UucG9seWZpbGwgPSBwb2x5ZmlsbDtcblByb21pc2UuUHJvbWlzZSA9IFByb21pc2U7XG5cbnJldHVybiBQcm9taXNlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXM2LXByb21pc2UubWFwIl19
