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
    }
    FormsComponent.prototype.onInputFocus = function (ev) {
        $(ev.target).parent().addClass('input--filled');
    };
    FormsComponent.prototype.onInputBlur = function (ev) {
        if (ev.target.value.trim() === '') {
            $(ev.target).parent().removeClass('input--filled');
        }
    };
    FormsComponent.prototype.init = function () {
        var _this = this;
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
        [].slice.call(document.querySelectorAll('input.et-input__field')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                // classie.add( inputEl.parentNode, 'input--filled' );
                $(inputEl).parent().addClass('input--filled');
            }
            // events:
            inputEl.addEventListener('focus', _this.onInputFocus);
            inputEl.addEventListener('blur', _this.onInputBlur);
        });
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
    ProductStore.prototype.createStore = function () {
    };
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
        console.log("Products Font Preview loaded");
        this.createEvent();
        this.addButtonClick();
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
        console.log("Products License Select Loaded");
        productStore_1.default.createStore();
        this.checkClickArea();
        //initialize
        this.initDropdown(this.productContainer);
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
var products_youtube_1 = require("./products-youtube");
var Font_Preview = products_font_preview_1.default;
var License_Select = products_license_1.default;
var Youtube_Btn = products_youtube_1.default;
var ProductsComponent = (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.init = function () {
        var isProductPage = ($(".et-product-page").length > 0 ? true : false);
        if (isProductPage) {
            console.log("Products Main Loaded");
            Font_Preview.init();
            License_Select.init();
            Youtube_Btn.init();
        }
    };
    return ProductsComponent;
}());
var Products = new ProductsComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products;

},{"./products-font-preview":7,"./products-license":8,"./products-youtube":10}],10:[function(require,module,exports){
"use strict";
var $ = jQuery;
/**
 *
 * Youtube modal functionality
 * ......................
 *
 *
 * */
var ProductsYoutubeBtn = (function () {
    function ProductsYoutubeBtn() {
        this.youtube_btn = document.querySelectorAll('.et-box-item__youtube');
        this.youtube_player = document.getElementById('youtube-player');
    }
    ProductsYoutubeBtn.prototype.addEvents = function () {
        var _this = this;
        [].slice.call(this.youtube_btn).forEach(function (inputEl) {
            // events:
            inputEl.addEventListener('click', _this.onYouTubeOpen.bind(_this));
        });
    };
    ProductsYoutubeBtn.prototype.onYouTubeOpen = function (ev) {
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
    ProductsYoutubeBtn.prototype.addClassElement = function (el, className) {
        document.querySelector(el).classList.add(className);
    };
    ProductsYoutubeBtn.prototype.removeClassElement = function (el, className) {
        document.querySelector(el).classList.remove(className);
    };
    ProductsYoutubeBtn.prototype.addZ = function () {
        this.addClassElement('.eltdf-content', 'products-zindex');
        this.addClassElement('.eltdf-wrapper', 'products-zindex');
    };
    ProductsYoutubeBtn.prototype.removeZ = function () {
        this.removeClassElement('.eltdf-content.products-zindex', 'products-zindex');
        this.removeClassElement('.eltdf-wrapper.products-zindex', 'products-zindex');
    };
    ProductsYoutubeBtn.prototype.onYoutubeClose = function () {
        this.removeClassElement('.modal-body', 'active');
        this.removeOverlay();
    };
    ProductsYoutubeBtn.prototype.onYoutubeCloseBtn = function () {
        var youtubeModal = document.getElementById('et_youtube_close_modal');
        youtubeModal.addEventListener('click', this.youtubeStopVideo.bind(this));
    };
    ProductsYoutubeBtn.prototype.youtubeStopVideo = function () {
        var videoSrc = this.youtube_player.getAttribute('src');
        this.youtube_player.setAttribute('src', '');
        this.youtube_player.setAttribute('src', videoSrc);
    };
    ProductsYoutubeBtn.prototype.addOverlay = function () {
        // var overlay = '<div class="lic-overlay"></div>';
        var overlay = document.createElement('div');
        overlay.setAttribute('class', 'et-product-overlay');
        overlay.setAttribute('id', 'et-product-overlay');
        //onclick add our own overlay to body
        // $(".eltdf-full-width").append(overlay);
        document.querySelector('.eltdf-full-width').appendChild(overlay);
        //hide sticky header
        // $(".eltdf-sticky-header").addClass("modal-open");
        this.addClassElement('.eltdf-sticky-header', 'modal-open');
    };
    ProductsYoutubeBtn.prototype.removeOverlay = function () {
        this.removeZ();
        // $(".lic-overlay").remove();
        var overlay = document.getElementById('et-product-overlay');
        overlay.parentNode.removeChild(overlay);
        //animate sticky header back in
        this.removeClassElement('.eltdf-sticky-header', 'modal-open');
    };
    ProductsYoutubeBtn.prototype.setSrc = function (el, value) {
        setTimeout(function () {
            el.setAttribute('src', value);
            // $('.you-tube-pop').attr('src', youtubeLink);
        }, 100);
    };
    ProductsYoutubeBtn.prototype.init = function () {
        console.log("Products YouTube Btn Loaded");
        this.addEvents();
        this.onYoutubeCloseBtn();
        $('#et_youtubeModal').on('hidden.bs.modal', this.onYoutubeClose.bind(this));
    };
    return ProductsYoutubeBtn;
}());
var Products_Youtube_btn = new ProductsYoutubeBtn();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products_Youtube_btn;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9ldC1jay1mb3Jtcy50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdXRpbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3Byb2R1Y3RzL3Byb2R1Y3Qtc2VsZWN0LnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wcm9kdWN0cy9wcm9kdWN0U3RvcmUudHMiLCJhc3NldHMvanMvY3VzdG9tL3Byb2R1Y3RzL3Byb2R1Y3RzLWZvbnQtcHJldmlldy50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMtbGljZW5zZS50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMtbWFpbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcHJvZHVjdHMvcHJvZHVjdHMteW91dHViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTs7O0dBR0c7O0FBRUgsc0JBQWtCLGtCQUFrQixDQUFDLENBQUE7QUFDckMsMENBQTBDO0FBQzFDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLG9EQUFvRDtBQUNwRCw4QkFBcUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNoRCw0QkFBa0Isd0JBQXdCLENBQUMsQ0FBQTtBQUMzQyxvQkFBb0I7QUFDcEIsSUFBTyxNQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDbEMsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRWpCLENBQUM7SUFDQztRQUNFO1FBRUEsQ0FBQztRQUVELGtCQUFJLEdBQUo7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLGVBQUssQ0FBQyxJQUFJLEVB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LENBQUM7UUFHeEMsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVoRSxDQUFDO0lBRUQsbUNBQU0sR0FBTixVQUFRLEVBQVcsRUFBRSxLQUFhO1FBRWhDLFVBQVUsQ0FBQztZQUVULEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlCLCtDQUErQztRQUNqRCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVILHlCQUFDO0FBQUQsQ0FuSUEsQUFtSUMsSUFBQTtBQUVELElBQUksb0JBQW9CLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBRXBEO2tCQUFlLG9CQUFvQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuLy8gaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9wYXJ0aWFscy9zZWFyY2hcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG4vLyBpbXBvcnQgUHJvZHVjdHMgZnJvbSBcIi4vcGFydGlhbHMvcHJvZHVjdHMtcmVhY3RcIjtcbmltcG9ydCBQcm9kdWN0cyBmcm9tIFwiLi9wcm9kdWN0cy9wcm9kdWN0cy1tYWluXCI7XG5pbXBvcnQgRm9ybXMgZnJvbSBcIi4vcGFydGlhbHMvZXQtY2stZm9ybXNcIjtcbi8vIGNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQganF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5jb25zdCAkID0ganF1ZXJ5O1xuXG4oZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJOZWF0IGxvYWRlZFwiKTtcbiAgICAgIFV0aWxzLmluaXQoKTtcbiAgICAgIE5hdi5pbml0KCk7XG4gICAgICAvLyBTZWFyY2guaW5pdCgpO1xuICAgICAgUHJvZHVjdHMuaW5pdCgpO1xuICAgICAgRm9ybXMuaW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBib290c3RyYXAgPSBuZXcgQXBwKCk7XG5cbiAgLyoqIHJ1biBhbGwgZnVuY3Rpb25zICovXG4gICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblxuICAgIGJvb3RzdHJhcC5pbml0KCk7XG5cbiAgfSk7XG5cbn0pKCk7XG5cbiIsImltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBqcXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbmNvbnN0ICQgPSBqcXVlcnk7XG5cbmNsYXNzIE5hdkNvbXBvbmVudCB7XG5cbiAgc3RvcmVJY29uOiBKUXVlcnk7XG4gIGN1cnJlbnRQb3NpdGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5zdG9yZUljb24gPSAkKCcuc3RvcmUtZnJvbnQnKTtcbiAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICB9XG5cbiAgY2hlY2tTdG9yZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICBpZiAoIHRoaXMuY3VycmVudFBvc2l0aW9uIDwgMjAwICkge1xuICAgICAgLy8gcmVtb3ZlIGhpZGRlblxuICAgICAgdGhpcy5zdG9yZUljb24ucmVtb3ZlQ2xhc3MoJ3N0b3JlLWhpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgc3RvcmUtaGlkZGVuXG4gICAgICB0aGlzLnN0b3JlSWNvbi5hZGRDbGFzcygnc3RvcmUtaGlkZGVuJyk7XG5cbiAgICB9XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IGxvYWRlZFwiKTtcblxuICAgIHRoaXMuY2hlY2tTdG9yZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID8gdGhpcy5jaGVja1N0b3JlLmJpbmQodGhpcykgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuY2hlY2tTdG9yZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcblxuXG4gIH1cbn1cblxubGV0IE5hdiA9IG5ldyBOYXZDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIEZvcm1zQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgb25JbnB1dEZvY3VzKCBldiApIHtcbiAgICAkKGV2LnRhcmdldCkucGFyZW50KCkuYWRkQ2xhc3MoJ2lucHV0LS1maWxsZWQnKTtcbiAgfVxuXG4gIG9uSW5wdXRCbHVyKCBldiApIHtcbiAgaWYoIGV2LnRhcmdldC52YWx1ZS50cmltKCkgPT09ICcnICkge1xuICAgICQoZXYudGFyZ2V0KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaW5wdXQtLWZpbGxlZCcpO1xuICB9XG59XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIC8vIHRyaW0gcG9seWZpbGwgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvVHJpbVxuICAgIGlmICghU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuICAgICAgICB2YXIgcnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG4gICAgICAgIFN0cmluZy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgW10uc2xpY2UuY2FsbCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ2lucHV0LmV0LWlucHV0X19maWVsZCcgKSApLmZvckVhY2goIChpbnB1dEVsKSA9PiB7XG4gICAgICAvLyBpbiBjYXNlIHRoZSBpbnB1dCBpcyBhbHJlYWR5IGZpbGxlZC4uXG4gICAgICBpZiggaW5wdXRFbC52YWx1ZS50cmltKCkgIT09ICcnICkge1xuICAgICAgICAvLyBjbGFzc2llLmFkZCggaW5wdXRFbC5wYXJlbnROb2RlLCAnaW5wdXQtLWZpbGxlZCcgKTtcbiAgICAgICAgJChpbnB1dEVsKS5wYXJlbnQoKS5hZGRDbGFzcygnaW5wdXQtLWZpbGxlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBldmVudHM6XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIHRoaXMub25JbnB1dEZvY3VzICk7XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgdGhpcy5vbklucHV0Qmx1ciApO1xuICAgIH0gKTtcbiAgfVxufVxuXG5sZXQgZXRfY2tfZm9ybXMgPSBuZXcgRm9ybXNDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgZXRfY2tfZm9ybXM7IiwiaW1wb3J0IHtCcHNJbnRlcmZhY2V9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2Jwcy5pbnRlcmZhY2VcIjtcbmltcG9ydCBqcXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbmNvbnN0ICQgPSBqcXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gMDtcbiAgICB0aGlzLmJyZWFrcG9pbnQgPSAzMjA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIHRoaXMuYnBzID0ge1xuICAgICAgbW9iaWxlOiA1NDQsXG4gICAgICB0YWJsZXQ6IDc2OCxcbiAgICAgIGxhcHRvcDogOTkyLFxuICAgICAgZGVza3RvcDogMTIwMCxcbiAgICAgIGRlc2t0b3BfeGw6IDE2MDBcbiAgICB9O1xuICAgIHRoaXMuYnJvd3NlciA9IFV0aWxpdHlDb21wb25lbnQud2hpY2hCcm93c2VyKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnRzID0gKCBicHM6IEJwc0ludGVyZmFjZSApID0+IHtcbiAgICBsZXQgYXJyID0gW107XG5cbiAgICBmb3IgKCBsZXQga2V5IGluIGJwcyApIHtcbiAgICAgIGlmICggYnBzLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgIGFyci5wdXNoKGJwc1sga2V5IF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xuICB9O1xuICBwcml2YXRlIF9jaGVja0JyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBicmVha3BvaW50IGV2ZW50IGF2YWlsYWJsZSB0byBhbGwgZmlsZXMgdmlhIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgY29uc29sZS5sb2coXCJjaGVjayBicmVha3BvaW50IG9uIHdpbmRvdyByZXNpemVcIik7XG4gICAgbGV0IG9sZF9icmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKCBvbGRfYnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50ICkge1xuXG4gICAgICAkKHdpbmRvdykudHJpZ2dlcihcImJyZWFrcG9pbnRDaGFuZ2VcIiwgVXRpbHMuYnJlYWtwb2ludCk7XG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIGdldCBicmVha3BvaW50IGZyb20gY3NzXG4gICAgLy8gY29uc29sZS5sb2coJCgnYm9keScpLmNzcyhcInotaW5kZXhcIikpO1xuXG4gICAgbGV0IGJvZHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLFxuICAgICAgemluZGV4ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsgXCJ6LWluZGV4XCIgXTtcblxuICAgIHRoaXMuYnJlYWtwb2ludCA9IHBhcnNlSW50KHppbmRleCwgMTApO1xuICB9O1xuICBwcml2YXRlIF9zZXRXaW5kb3dXaWR0aCA9ICgpID0+IHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyB3aGljaEJyb3dzZXIoKSB7XG4gICAgaWYgKCAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkgJiYgIShcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT1cbiAgICAgIFwiTmV0c2NhcGVcIikgKSB7XG5cbiAgICAgIGlmICggbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSAhPT0gbnVsbCApIHtcbiAgICAgICAgcmV0dXJuIFwiaXBhZFwiO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGJ1aWxkSHRtbCggdHlwZTogc3RyaW5nLCBhdHRycz86IE9iamVjdCwgaHRtbD86IHN0cmluZyApIHtcblxuICAgIC8vIGh0dHA6Ly9tYXJjZ3JhYmFuc2tpLmNvbS9idWlsZGluZy1odG1sLWluLWpxdWVyeS1hbmQtamF2YXNjcmlwdC9cblxuICAgIGxldCBoID0gJzwnICsgdHlwZTtcblxuICAgIGZvciAoIGxldCBhdHRyIGluIGF0dHJzICkge1xuICAgICAgaWYgKCBhdHRyc1sgYXR0ciBdID09PSBmYWxzZSApIGNvbnRpbnVlO1xuICAgICAgaCArPSAnICcgKyBhdHRyICsgJz1cIicgKyBhdHRyc1sgYXR0ciBdICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXR1cm4gaCArPSBodG1sID8gXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdHlwZSArIFwiPlwiIDogXCIvPlwiO1xuICB9XG5cbiAgc2V0TnVtYmVyKCBjb3VudDogbnVtYmVyICk6IHN0cmluZyB7XG4gICAgLy8gY29udmVyIG51bWJlciB0byBzdHJpbmdcbiAgICBsZXQgdG90YWwgPSBjb3VudDtcbiAgICByZXR1cm4gdG90YWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJVdGlsaXRpZXMgbG9hZGVkXCIpO1xuXG4gICAgLy8gc2V0IGJyZWFrcG9pbnQgb24gd2luZG93IGxvYWRcbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG4gICAgdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5icm93c2VyKTtcblxuICAgIC8vIGNyZWF0ZSBmdWxsIGFycmF5IGZvciBpbWFnZSBjb21wcmVzc2lvbiByZWZcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gdGhpcy5fc2V0QnJlYWtwb2ludHModGhpcy5icHMpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuX2NoZWNrQnJlYWtwb2ludCkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgVXRpbHMgPSBuZXcgVXRpbGl0eUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IFByb2R1Y3RTdG9yZSBmcm9tIFwiLi9wcm9kdWN0U3RvcmVcIlxuXG4vKipcbiAqXG4gKiBMaWNlbnNlIFNlbGVjdCBDbGFzc1xuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogSW5zcGlyZWQgYnkgQ29keUhvdXNlLmNvXG4gKlxuICogKi9cblxuXG5jbGFzcyBQcm9kdWN0c1NlbGVjdEJ0biB7XG4gIGN0YTogSlF1ZXJ5O1xuICBzZWxlY3RCb3g6IEpRdWVyeTtcbiAgbGljZW5zZUJveDogSlF1ZXJ5O1xuICBpbml0aWFsUHJpY2U6IHN0cmluZztcbiAgYWRkdG9DYXJ0OiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGd1bXJvYWRMaW5rOiBzdHJpbmc7XG4gIGd1bXJvYWRQcmljZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGluZGV4LCBpdGVtKSB7XG5cbiAgICB0aGlzLmN0YSA9ICQoaXRlbSk7XG4gICAgdGhpcy5saWNlbnNlQm94ID0gdGhpcy5jdGEuZmluZCgnLnNlbGVjdCcpO1xuICAgIHRoaXMuc2VsZWN0Qm94ID0gdGhpcy5jdGEuZmluZCgnW2RhdGEtdHlwZT1cInNlbGVjdFwiXScpO1xuICAgIHRoaXMuaW5pdGlhbFByaWNlID0gdGhpcy5saWNlbnNlQm94LmZpbmQoJy5zdG5kJykuZGF0YSgnbGluaycpO1xuICAgIHRoaXMuYWRkdG9DYXJ0ID0gdGhpcy5jdGEuZmluZCgnLmFkZC10by1jYXJ0Jyk7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gIH1cblxuICBzZXRQcmljZVVybCgpe1xuICAgdGhpcy5hZGR0b0NhcnQuZmluZCgnYScpLmF0dHIoJ2hyZWYnLCB0aGlzLmluaXRpYWxQcmljZSk7XG4gIH1cblxuICBvblNlbGVjdEJ1dHRvbkNsaWNrKGUpe1xuXG4gICAgbGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpOyAvL3RhcmdldHMgdGhlIGRpdiB3cmFwcGVyXG5cbiAgICAvL2NoZWNrIGlmIGFub3RoZXIgYm94IGhhcyBiZWVuIG9wZW5lZFxuICAgIGlmKFByb2R1Y3RTdG9yZS5zdGF0ZS5pc09wZW4pe1xuICAgICAgdGhpcy5yZXNldFNlbGVjdEJveCgkdGhpcyk7XG4gICAgfVxuXG4gICAgLy90b2dnbGUgb3BlblxuICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgUHJvZHVjdFN0b3JlLnN0YXRlLmlzT3BlbiA9IHRydWU7XG5cblxuICAgIC8vdGFyZ2V0IHRoZSBhY3R1YWwgZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkIC0gdGhpcyBnZXRzIGZpcmVkIGV2ZXJ5dGltZSBhIHVzZXIgY2xpY2tzLCBzbyBpdCBkb2VzbnQgbWF0dGVyXG4gICAgLy9iZWNhdXNlIHRoZSBpdGVtIHlvdSBzZWxlY3QgZmlyc3QgaXMgYWx3YXlzIHRoZSBhY3RpdmUgaXRlbSBzaW5jZSBvbmx5IG9uZSBpcyBzaG93biBhdCBhIHRpbWUuXG4gICAgaWYoICQoZS50YXJnZXQpLmlzKCdsaScpKXtcblxuICAgICAgLy9pbmRleCBpcyBraW5kYSBhIGhhY2sgdG8gc2VsZWN0IHRoZSBpdGVtIHRoYXQgZ2V0cyBzZWxlY3RlZCBieSBhbHdheXMgYWRkaW5nIG9uZSB0byB0aGUgaW5kZXhcbiAgICAgIGxldCBhY3RpdmVJdGVtID0gJChlLnRhcmdldCksXG4gICAgICAgICAgaW5kZXggPSBhY3RpdmVJdGVtLmluZGV4KCkgKyAxOyAvL2dldCBwb3NpdGlvbiBvZiBlbGVtZW50IGNsaWNrZWQgcmVsYXRpdmUgdG8gaXRzIHNpYmxpbmdzXG5cbiAgICAgIC8vQWRkIGFjdGl2ZVxuICAgICAgYWN0aXZlSXRlbS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgIC8vZ2V0IGd1bXJvYWQgZGF0YVxuICAgICAgdGhpcy5ndW1yb2FkTGluayA9ICR0aGlzLmZpbmQoJy5hY3RpdmUnKS5kYXRhKCdsaW5rJyk7XG4gICAgICB0aGlzLmd1bXJvYWRQcmljZSA9ICR0aGlzLmZpbmQoJy5hY3RpdmUnKS5kYXRhKCdwcmljZScpO1xuXG4gICAgICAvL2RldGVybWluZSB3aGF0IGluZGV4IHRvIGFkZCBhbmQgc2hvd1xuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkLTEgc2VsZWN0ZWQtMiBzZWxlY3RlZC0zJykuYWRkQ2xhc3MoJ3NlbGVjdGVkLScgKyBpbmRleCk7XG5cbiAgICAgIC8vc2V0IGd1bXJvYWQgbGluayBmcm9tIExJIGFuZCBzZXQgaXQgb24gdGhlIGJ1eW5vd1xuICAgICAgJHRoaXMuc2libGluZ3MoJy5hZGQtdG8tY2FydCcpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJywgdGhpcy5ndW1yb2FkTGluayk7XG5cbiAgICAgIC8vU2V0IHByaWNlXG4gICAgICAkdGhpcy5wYXJlbnRzKCcuZXQtYm94LWl0ZW1fX2Rlc2NyaXB0aW9uJykuZmluZCgnLnByb2R1Y3QtcHJpY2UnKS50ZXh0KHRoaXMuZ3Vtcm9hZFByaWNlKTtcblxuICAgIH1cblxuICB9XG5cbiAgcmVzZXRTZWxlY3RCb3godGFyZ2V0KXtcblxuICAgIC8vY2xvc2VzIHRoZSB1bCBpZiBsZWZ0IG9wZW4gb3IgdXNlciBpcyBub3QgaW50ZXJhY3Rpbmcgd2l0aCB0aGVtXG4gICAgdGFyZ2V0LnBhcmVudHMoJy5ldC1ib3gtaXRlbScpLnNpYmxpbmdzKCdkaXYnKS5maW5kKCdbZGF0YS10eXBlPVwic2VsZWN0XCJdJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgfVxuXG4gIHNhZmFyaUNoZWNrKCl7XG4gICAgaWYoVXRpbHMuYnJvd3NlciA9PT0gJ3NhZmFyaScpe1xuICAgICAgbGV0IGNzcyA9IHtcbiAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbic6ICcwJyxcbiAgICAgICAgJ3RyYW5zaXRpb24nOiAnMCdcbiAgICAgIH07XG4gICAgICB0aGlzLnNlbGVjdEJveC5maW5kKCd1bCcpLmNzcyhjc3MpXG4gICAgfVxuICB9XG4gIFxuXG4gIGluaXREcm9wZG93bigpOiB2b2lkIHtcblxuICAgIHRoaXMuc2FmYXJpQ2hlY2soKTtcblxuICAgIHRoaXMuc2V0UHJpY2VVcmwoKTtcblxuICAgIHRoaXMuc2VsZWN0Qm94Lm9uKCdjbGljaycsIHRoaXMub25TZWxlY3RCdXR0b25DbGljay5iaW5kKHRoaXMpKTtcblxuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c1NlbGVjdEJ0bjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuXG4vKipcbiAqXG4gKiBMaWNlbnNlIFNlbGVjdCBDbGFzc1xuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogSW5zcGlyZWQgYnkgQ29keUhvdXNlLmNvXG4gKlxuICogKi9cbmludGVyZmFjZSBJUHJvZHVjdFN0b3Jle1xuICBpc09wZW46Ym9vbGVhbjtcbiAgY3VycmVudEluZGV4OiBudW1iZXI7XG59XG5cbmNsYXNzIFByb2R1Y3RTdG9yZSB7XG5cbiAgc3RhdGU6IElQcm9kdWN0U3RvcmU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICBjdXJyZW50SW5kZXg6IDBcbiAgICB9XG4gIH1cblxuXG4gIGNyZWF0ZVN0b3JlKCk6IHZvaWQge1xuXG4gIH1cblxufVxuXG5cbmxldCBQcm9kdWN0X1N0b3JlID0gbmV3IFByb2R1Y3RTdG9yZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0X1N0b3JlOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbi8qKiBcbiAqIFxuICogRm9udCBQcmV2aWV3IENvbXBvbmVudFxuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogQ29ubmVjdHMgdG8gUmVhY3QgY29tcG9uZW50IHVzaW5nIGRpc3BhdGNoIGV2ZW50IHRyaWdnZXIgXG4gKiBcbiAqICovXG4gIFxuICBcbmNsYXNzIFByb2R1Y3RzRm9udFByZXZpZXdDb21wb25lbnQge1xuICBmb250UHJldmlld0FycmF5OiBhbnk7XG4gIGV2ZW50OiBFdmVudDtcbiAgYXBwOiBKUXVlcnk7XG4gIGlzT3BlbjogQm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbnRQcmV2aWV3QXJyYXkgPSAkKFwiLmV0LWZvbnQtcHJldmlld19fbGlua1wiKTtcbiAgICB0aGlzLmFwcCA9ICQoJyNhcHAnKTtcbiAgfVxuXG4gIGFkZEJ1dHRvbkNsaWNrKCkge1xuICAgIHRoaXMuZm9udFByZXZpZXdBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB0aGlzLmJ1dHRvbkNsaWNrLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlRXZlbnQoKSB7XG4gICAgdGhpcy5ldmVudCA9IG5ldyBDdXN0b21FdmVudChcbiAgICAgIFwiZm9udENoZWNrXCIsXG4gICAgICB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1lc3NhZ2U6IFwiRm9udCBDb21wb25lbnQgdXAhXCIsXG4gICAgICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzZXREYXRhKCBkYXRhICkge1xuICAgIHRoaXMuYXBwLmF0dHIoe1xuICAgICAgXCJkYXRhLXBsYWNlaG9sZGVyXCI6IGRhdGEucGxhY2Vob2xkZXIsXG4gICAgICBcImRhdGEtbmFtZVwiOiBkYXRhLm5hbWUsXG4gICAgICBcImRhdGEtc3R5bGVzXCI6IGRhdGEuc3R5bGVzXG4gICAgfSk7XG4gIH1cblxuICBidXR0b25DbGljayggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBCdWlsZCBmb250IGF0dHJcbiAgICBsZXQgZWxlbWVudCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgbmFtZSA9IGVsZW1lbnQuZGF0YShcIm5hbWVcIik7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIHBsYWNlaG9sZGVyOiBuYW1lICsgXCIgcHJldmlld1wiLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHN0eWxlczogZWxlbWVudC5kYXRhKFwic3R5bGVzXCIpLnNwbGl0KCcsJylcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBuZXcgZGF0YSBpbnRvIHJlYWN0IGFwcFxuICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcblxuICAgIC8vIGZpcmUgZXZlbnQgdG8gbm90aWZ5IFJlYWN0IGFwcCB0byB1cGRhdGVcbiAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcblxuICAgIC8vIG9wZW4gc2xpZGVyXG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGlmICggdGhpcy5pc09wZW4gKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmFwcC5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdHMgRm9udCBQcmV2aWV3IGxvYWRlZFwiKTtcbiAgICB0aGlzLmNyZWF0ZUV2ZW50KCk7XG4gICAgdGhpcy5hZGRCdXR0b25DbGljaygpO1xuICB9XG5cbn1cblxubGV0IFByb2R1Y3RzX2ZvbnRfcHJldmlld19qcyA9IG5ldyBQcm9kdWN0c0ZvbnRQcmV2aWV3Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzX2ZvbnRfcHJldmlld19qczsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IFNlbGVjdF9CdG4gZnJvbSBcIi4vcHJvZHVjdC1zZWxlY3RcIjtcbmltcG9ydCBQcm9kdWN0U3RvcmUgZnJvbSBcIi4vcHJvZHVjdFN0b3JlXCJcblxuLyoqXG4gKlxuICogTGljZW5zZSBTZWxlY3QgRnVuY3Rpb25hbGl0eVxuICogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICogSW5zcGlyZWQgYnkgQ29keUhvdXNlLmNvXG4gKlxuICogKi9cblxuXG5jbGFzcyBQcm9kdWN0c0xpY2Vuc2VTZWxlY3Qge1xuICBwcm9kdWN0Q29udGFpbmVyOiBKUXVlcnk7XG4gIGFuaW1hdGluZzogYm9vbGVhbjtcbiAgYWRkVG9DYXJ0QnRuOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9kdWN0Q29udGFpbmVyID0gJCgnLnByb2R1Y3RzLWN0YScpO1xuICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hZGRUb0NhcnRCdG4gPSAkKCcuYWRkLXRvLWNhcnQnKTtcbiAgfVxuXG4gIGNoZWNrQ2xpY2tBcmVhKCl7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgLy9pZiB1c2VyIGNsaWNrcyBvdXRzaWRlIHRoZSAuY2QtZ2FsbGVyeSBsaXN0IGl0ZW1zIC0gcmVtb3ZlIHRoZSAuaG92ZXIgY2xhc3MgYW5kIGNsb3NlIHRoZSBvcGVuIHVsLnNpemUvdWwuY29sb3IgbGlzdCBlbGVtZW50c1xuICAgICAgaWYoICEkKGV2ZW50LnRhcmdldCkuaXMoJ2Rpdi5zZWxlY3QnKSAmJiAgISQoZXZlbnQudGFyZ2V0KS5pcygnbGknKSkge1xuICAgICAgICBpZihQcm9kdWN0U3RvcmUuc3RhdGUuaXNPcGVuKXtcbiAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bigpIHtcbiAgICBQcm9kdWN0U3RvcmUuc3RhdGUuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5wcm9kdWN0Q29udGFpbmVyLmZpbmQoJ1tkYXRhLXR5cGU9XCJzZWxlY3RcIl0nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICB9XG4gIFxuICBpbml0RHJvcGRvd24oIGl0ZW1zOiBKUXVlcnkpe1xuXG4gICAgaXRlbXMuZWFjaCggKGluZGV4LCBlbCkgPT4ge1xuICAgIFxuICAgICAgbGV0IGJ0biA9IG5ldyBTZWxlY3RfQnRuKGluZGV4LCBlbCk7XG4gICAgXG4gICAgICBidG4uaW5pdERyb3Bkb3duKCk7XG4gICAgXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdHMgTGljZW5zZSBTZWxlY3QgTG9hZGVkXCIpO1xuICAgIFByb2R1Y3RTdG9yZS5jcmVhdGVTdG9yZSgpO1xuICAgIHRoaXMuY2hlY2tDbGlja0FyZWEoKTtcbiAgICBcbiAgICAvL2luaXRpYWxpemVcbiAgICB0aGlzLmluaXREcm9wZG93bih0aGlzLnByb2R1Y3RDb250YWluZXIpXG4gIH1cblxufVxuXG5sZXQgUHJvZHVjdHNfTGljZW5zZV9zZWxlY3QgPSBuZXcgUHJvZHVjdHNMaWNlbnNlU2VsZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzX0xpY2Vuc2Vfc2VsZWN0OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgRm9udF9QcmV2aWV3X0NsYXNzIGZyb20gXCIuL3Byb2R1Y3RzLWZvbnQtcHJldmlld1wiO1xuaW1wb3J0IExpY2Vuc2VfU2VsZWN0X0NsYXNzIGZyb20gXCIuL3Byb2R1Y3RzLWxpY2Vuc2VcIjtcbmltcG9ydCBZb3V0dWJlX0J0bl9DbGFzcyBmcm9tIFwiLi9wcm9kdWN0cy15b3V0dWJlXCI7XG5cblxuY29uc3QgRm9udF9QcmV2aWV3ID0gRm9udF9QcmV2aWV3X0NsYXNzO1xuY29uc3QgTGljZW5zZV9TZWxlY3QgPSBMaWNlbnNlX1NlbGVjdF9DbGFzcztcbmNvbnN0IFlvdXR1YmVfQnRuID0gWW91dHViZV9CdG5fQ2xhc3M7XG5cbmNsYXNzIFByb2R1Y3RzQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cblxuICBpbml0KCk6IHZvaWQge1xuXG4gICAgdmFyIGlzUHJvZHVjdFBhZ2UgPSAoJChcIi5ldC1wcm9kdWN0LXBhZ2VcIikubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZSk7XG5cbiAgICBpZihpc1Byb2R1Y3RQYWdlKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdHMgTWFpbiBMb2FkZWRcIik7XG4gICAgICBGb250X1ByZXZpZXcuaW5pdCgpO1xuICAgICAgTGljZW5zZV9TZWxlY3QuaW5pdCgpO1xuICAgICAgWW91dHViZV9CdG4uaW5pdCgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmxldCBQcm9kdWN0cyA9IG5ldyBQcm9kdWN0c0NvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0czsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuXG4vKipcbiAqXG4gKiBZb3V0dWJlIG1vZGFsIGZ1bmN0aW9uYWxpdHlcbiAqIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAqIFxuICpcbiAqICovXG5cblxuY2xhc3MgUHJvZHVjdHNZb3V0dWJlQnRuIHtcbiAgeW91dHViZV9idG46IE5vZGVMaXN0O1xuICB5b3V0dWJlTGluazogc3RyaW5nO1xuICB5b3V0dWJlX3BsYXllcjogRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnlvdXR1YmVfYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5ldC1ib3gtaXRlbV9feW91dHViZScgKTtcbiAgICB0aGlzLnlvdXR1YmVfcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lvdXR1YmUtcGxheWVyJyk7XG4gIH1cblxuICBhZGRFdmVudHMoKXtcbiAgICBbXS5zbGljZS5jYWxsKCB0aGlzLnlvdXR1YmVfYnRuICkuZm9yRWFjaCggKCBpbnB1dEVsICkgPT4ge1xuXG4gICAgICAvLyBldmVudHM6XG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMub25Zb3VUdWJlT3Blbi5iaW5kKHRoaXMpICk7XG4gICAgfSApO1xuICB9XG5cbiAgb25Zb3VUdWJlT3BlbiggZXYgKXtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy55b3V0dWJlTGluayA9IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS15b3V0dWJlJyk7XG5cbiAgICAvL0FkZCB6aW5kZXggdG8gaHRtbCBlbGVtZW50cyB0byBhZGQgY3VzdG9tIE92ZXJsYXlcbiAgICB0aGlzLmFkZFooKTtcblxuICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55b3UtdHViZS1wb3AnKTtcblxuICAgIC8vc2VuZCB0byBtb2RhbFxuICAgIHRoaXMuc2V0U3JjKCBwb3B1cCwgdGhpcy55b3V0dWJlTGluayApO1xuXG5cbiAgICAvL2FjdGl2ZSBtb2RhbFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gJCgnLm1vZGFsLWJvZHknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB0aGlzLmFkZENsYXNzRWxlbWVudCgnLm1vZGFsLWJvZHknLCAnYWN0aXZlJyk7XG5cbiAgICB9LDMwMCk7XG4gICAgXG4gICAgLy9hY3RpdmF0ZSBjdXN0b20gb3ZlcmxheVxuICAgIHRoaXMuYWRkT3ZlcmxheSgpO1xuXG4gIH1cblxuICBhZGRDbGFzc0VsZW1lbnQoIGVsOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nICl7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cbiAgfVxuXG4gIHJlbW92ZUNsYXNzRWxlbWVudCggZWw6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcgKXtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblxuICB9XG5cbiAgYWRkWigpIHtcbiAgICB0aGlzLmFkZENsYXNzRWxlbWVudCgnLmVsdGRmLWNvbnRlbnQnLCAncHJvZHVjdHMtemluZGV4Jyk7XG4gICAgdGhpcy5hZGRDbGFzc0VsZW1lbnQoJy5lbHRkZi13cmFwcGVyJywgJ3Byb2R1Y3RzLXppbmRleCcpO1xuICB9XG5cbiAgcmVtb3ZlWigpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzRWxlbWVudCgnLmVsdGRmLWNvbnRlbnQucHJvZHVjdHMtemluZGV4JywgJ3Byb2R1Y3RzLXppbmRleCcpO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3NFbGVtZW50KCcuZWx0ZGYtd3JhcHBlci5wcm9kdWN0cy16aW5kZXgnLCAncHJvZHVjdHMtemluZGV4Jyk7XG4gIH1cblxuICBvbllvdXR1YmVDbG9zZSgpe1xuICAgIHRoaXMucmVtb3ZlQ2xhc3NFbGVtZW50KCcubW9kYWwtYm9keScsICdhY3RpdmUnKTtcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXkoKTtcbiAgfVxuXG4gIG9uWW91dHViZUNsb3NlQnRuKCl7XG4gICAgbGV0IHlvdXR1YmVNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldF95b3V0dWJlX2Nsb3NlX21vZGFsJyk7XG5cbiAgICB5b3V0dWJlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnlvdXR1YmVTdG9wVmlkZW8uYmluZCh0aGlzKSk7XG4gIH1cblxuICB5b3V0dWJlU3RvcFZpZGVvKCl7XG4gICAgbGV0IHZpZGVvU3JjID0gdGhpcy55b3V0dWJlX3BsYXllci5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXG4gICAgdGhpcy55b3V0dWJlX3BsYXllci5zZXRBdHRyaWJ1dGUoJ3NyYycsJycpO1xuICAgIHRoaXMueW91dHViZV9wbGF5ZXIuc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRlb1NyYyk7XG4gIH1cblxuICBhZGRPdmVybGF5KCl7XG4gICAgLy8gdmFyIG92ZXJsYXkgPSAnPGRpdiBjbGFzcz1cImxpYy1vdmVybGF5XCI+PC9kaXY+JztcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdldC1wcm9kdWN0LW92ZXJsYXknKTtcbiAgICBvdmVybGF5LnNldEF0dHJpYnV0ZSgnaWQnLCAnZXQtcHJvZHVjdC1vdmVybGF5Jyk7XG5cbiAgICAvL29uY2xpY2sgYWRkIG91ciBvd24gb3ZlcmxheSB0byBib2R5XG4gICAgLy8gJChcIi5lbHRkZi1mdWxsLXdpZHRoXCIpLmFwcGVuZChvdmVybGF5KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWx0ZGYtZnVsbC13aWR0aCcpLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXG4gICAgLy9oaWRlIHN0aWNreSBoZWFkZXJcbiAgICAvLyAkKFwiLmVsdGRmLXN0aWNreS1oZWFkZXJcIikuYWRkQ2xhc3MoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuYWRkQ2xhc3NFbGVtZW50KCcuZWx0ZGYtc3RpY2t5LWhlYWRlcicsICdtb2RhbC1vcGVuJyk7XG4gIH1cblxuICByZW1vdmVPdmVybGF5KCkge1xuXG4gICAgdGhpcy5yZW1vdmVaKCk7XG5cbiAgICAvLyAkKFwiLmxpYy1vdmVybGF5XCIpLnJlbW92ZSgpO1xuICAgIGxldCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V0LXByb2R1Y3Qtb3ZlcmxheScpO1xuICAgIG92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdmVybGF5KTtcblxuXG4gICAgLy9hbmltYXRlIHN0aWNreSBoZWFkZXIgYmFjayBpblxuICAgIHRoaXMucmVtb3ZlQ2xhc3NFbGVtZW50KCcuZWx0ZGYtc3RpY2t5LWhlYWRlcicsICdtb2RhbC1vcGVuJyk7XG5cbiAgfVxuXG4gIHNldFNyYyggZWw6IEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcgKXtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZhbHVlKTtcbiAgICAgIC8vICQoJy55b3UtdHViZS1wb3AnKS5hdHRyKCdzcmMnLCB5b3V0dWJlTGluayk7XG4gICAgfSwxMDApO1xuXG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdHMgWW91VHViZSBCdG4gTG9hZGVkXCIpO1xuICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgdGhpcy5vbllvdXR1YmVDbG9zZUJ0bigpO1xuXG4gICAgJCgnI2V0X3lvdXR1YmVNb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCB0aGlzLm9uWW91dHViZUNsb3NlLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IFByb2R1Y3RzX1lvdXR1YmVfYnRuID0gbmV3IFByb2R1Y3RzWW91dHViZUJ0bigpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c19Zb3V0dWJlX2J0bjsiXX0=
