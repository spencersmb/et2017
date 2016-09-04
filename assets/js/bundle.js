(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */
"use strict";
var utils_1 = require("./partials/utils");
var search_1 = require("./partials/search");
var navigation_1 = require("./navigation/navigation");
var products_react_1 = require("./partials/products-react");
var $ = jQuery;
(function () {
    var App = (function () {
        function App() {
        }
        App.prototype.init = function () {
            // console.log("Neat loaded");
            utils_1.default.init();
            navigation_1.default.init();
            search_1.default.init();
            products_react_1.default.init();
        };
        return App;
    }());
    var bootstrap = new App();
    /** run all functions */
    $(document).ready(function () {
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

},{"./navigation/navigation":2,"./partials/products-react":3,"./partials/search":4,"./partials/utils":5}],2:[function(require,module,exports){
"use strict";
var $ = jQuery;
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
        // console.log("Nav loaded");
        var _this = this;
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

},{}],3:[function(require,module,exports){
"use strict";
var $ = jQuery;
var ProductsComponent = (function () {
    function ProductsComponent() {
        this.fontPreviewArray = $(".font-preview");
        this.app = $('#app');
    }
    ProductsComponent.prototype.addButtonClick = function () {
        var _this = this;
        this.fontPreviewArray.each(function (index, el) {
            $(el).on("click", _this.buttonClick.bind(_this));
        });
    };
    ProductsComponent.prototype.createEvent = function () {
        this.event = new CustomEvent("fontCheck", {
            detail: {
                message: "Hello World!",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });
    };
    ProductsComponent.prototype.setData = function (data) {
        this.app.attr({
            "data-placeholder": data.placeholder,
            "data-name": data.name,
            "data-styles": data.styles
        });
    };
    ProductsComponent.prototype.buttonClick = function (e) {
        e.preventDefault();
        // Build font attr
        var element = $(e.currentTarget);
        var name = element.data("name");
        var data = {
            placeholder: name + " preview",
            name: name,
            styles: element.data("styles").split(',')
        };
        // set new data on react app
        this.setData(data);
        // fire event to notify React app to update
        e.currentTarget.dispatchEvent(this.event);
        // open slider
        this.open();
    };
    ProductsComponent.prototype.open = function () {
        if (this.isOpen) {
            return;
        }
        else {
            this.app.addClass("open");
        }
    };
    ProductsComponent.prototype.close = function () {
        this.app.removeClass("open");
    };
    ProductsComponent.prototype.init = function () {
        console.log("products");
        this.createEvent();
        this.addButtonClick();
    };
    return ProductsComponent;
}());
var Products = new ProductsComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products;

},{}],4:[function(require,module,exports){
"use strict";
var $ = jQuery;
var SearchComponent = (function () {
    function SearchComponent() {
        this.searchContainer = document.getElementById("et-search-container");
    }
    SearchComponent.changePlaceholderText = function (object, text) {
        if (object) {
            object[0].placeholder = text;
        }
    };
    SearchComponent.prototype.init = function () {
        if (this.searchContainer) {
            this.searchInput = this.searchContainer.querySelectorAll('.eltdf-search-field');
        }
        SearchComponent.changePlaceholderText(this.searchInput, "ex: Watercolor Typography");
    };
    return SearchComponent;
}());
var Search = new SearchComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Search;

},{}],5:[function(require,module,exports){
"use strict";
var $ = jQuery;
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
        // console.log("Utilities loaded");
        // set breakpoint on window load
        this._setBreakpoint();
        this._setWindowWidth();
        console.log("Current Breakpoint is:", this.breakpoint);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9kdWN0cy1yZWFjdC50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvc2VhcmNoLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7R0FHRzs7QUFFSCxzQkFBa0Isa0JBQWtCLENBQUMsQ0FBQTtBQUNyQyx1QkFBbUIsbUJBQW1CLENBQUMsQ0FBQTtBQUN2QywyQkFBZ0IseUJBQXlCLENBQUMsQ0FBQTtBQUMxQywrQkFBcUIsMkJBQTJCLENBQUMsQ0FBQTtBQUVqRCxJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFakIsQ0FBQztJQUNDO1FBQ0U7UUFDQSxDQUFDO1FBRUQsa0JBQUksR0FBSjtZQUNFLDhCQUE4QjtZQUM5QixlQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixvQkFBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1gsZ0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLHdCQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUNILFVBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQUVELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFFMUIsd0JBQXdCO0lBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpCLDRDQUE0QztRQUM1QyxvQkFBb0I7UUFDcEIsRUFBRTtRQUNGLCtCQUErQjtRQUMvQixpQkFBaUI7UUFDakIsTUFBTTtRQUNOLGdC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QUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0E1R0EsQUE0R0MsSUFBQTtBQUVELElBQUksS0FBSyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUVuQztrQkFBZSxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiBSZWYgcGF0aCBpcyBub3QgbmVlZGVkIGZvciBzb21lIHJlYXNvblxuIDxyZWZlcmVuY2UgcGF0aD1cIi9Vc2Vycy95b3NlbWV0aWUvRHJvcGJveC9kZXZlbG9wbWVudC92aG9zdHMvd3d3Lmx5bmRhc2NvcmUuZGV2L3dwLWNvbnRlbnQvdGhlbWVzL25lYXQvdHlwaW5ncy90c2QuZC50c1wiIC8+XG4gKi9cblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL3BhcnRpYWxzL3NlYXJjaFwiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBQcm9kdWN0cyBmcm9tIFwiLi9wYXJ0aWFscy9wcm9kdWN0cy1yZWFjdFwiO1xuXG5jb25zdCAkID0galF1ZXJ5O1xuXG4oZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiTmVhdCBsb2FkZWRcIik7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgU2VhcmNoLmluaXQoKTtcbiAgICAgIFByb2R1Y3RzLmluaXQoKTtcbiAgICB9XG4gIH1cblxuICBsZXQgYm9vdHN0cmFwID0gbmV3IEFwcCgpO1xuXG4gIC8qKiBydW4gYWxsIGZ1bmN0aW9ucyAqL1xuICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgYm9vdHN0cmFwLmluaXQoKTtcblxuICAgIC8vIGxldCBhcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG4gICAgLy8gY29uc29sZS5sb2coYXBwKTtcbiAgICAvL1xuICAgIC8vIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcbiAgICAvLyAgIFwiZm9udENoZWNrXCIsXG4gICAgLy8gICB7XG4gICAgLy8gICAgIGRldGFpbDoge1xuICAgIC8vICAgICAgIG1lc3NhZ2U6IFwiSGVsbG8gV29ybGQhXCIsXG4gICAgLy8gICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAvLyAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgIC8vICAgfVxuICAgIC8vICk7XG4gICAgLy8gbGV0IG15QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKTtcbiAgICAvL1xuICAgIC8vXG4gICAgLy9cbiAgICAvLyBteUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiYnV0dG9uIGNsaWNrXCIpO1xuICAgIC8vXG4gICAgLy8gICBsZXQgdGVzdERhdGEgPSB7XG4gICAgLy8gICAgIHRpdGxlOiBcIlR1ZXNkYXkgU2NyaXB0XCIsXG4gICAgLy8gICAgIHRleHQ6IFwiVHVlc2RheSBmb250IHByZXZpZXdcIixcbiAgICAvLyAgICAgbmFtZTogXCJUdWVzZGF5XCIsXG4gICAgLy8gICAgIHN0eWxlczogW1wiUmVndWxhclwiXVxuICAgIC8vICAgfTtcbiAgICAvL1xuICAgIC8vICAgJChhcHApLmF0dHIoJ2RhdGEtdGl0bGUnLCB0ZXN0RGF0YS50aXRsZSk7XG4gICAgLy8gICAvLyBhcHAuZGF0YXNldC50aXRsZSA9IHRlc3REYXRhLnRpdGxlO1xuICAgIC8vICAgLy8gbGV0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAvLyAgIC8vICAgdGl0bGU6IGFwcC5kYXRhc2V0LnRpdGxlLFxuICAgIC8vICAgLy8gICB0ZXh0OiBhcHAuZGF0YXNldC50ZXh0LFxuICAgIC8vICAgLy8gICBuYW1lOiBhcHAuZGF0YXNldC5uYW1lLFxuICAgIC8vICAgLy8gICBzdHlsZXM6IGFwcC5kYXRhc2V0LnN0eWxlcy5zcGxpdCgnLCcpXG4gICAgLy8gICAvLyB9O1xuICAgIC8vXG4gICAgLy8gICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgLy9cbiAgICAvLyB9KTtcblxuXG4gIH0pO1xuXG59KSgpO1xuXG4iLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuY2xhc3MgTmF2Q29tcG9uZW50IHtcblxuICBzdG9yZUljb246IEpRdWVyeTtcbiAgY3VycmVudFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLnN0b3JlSWNvbiA9ICQoJy5zdG9yZS1mcm9udCcpO1xuICAgIHRoaXMuY3VycmVudFBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gIH1cblxuICBjaGVja1N0b3JlKCkge1xuICAgIHRoaXMuY3VycmVudFBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIGlmICggdGhpcy5jdXJyZW50UG9zaXRpb24gPCAyMDAgKSB7XG4gICAgICAvLyByZW1vdmUgaGlkZGVuXG4gICAgICB0aGlzLnN0b3JlSWNvbi5yZW1vdmVDbGFzcygnc3RvcmUtaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBzdG9yZS1oaWRkZW5cbiAgICAgIHRoaXMuc3RvcmVJY29uLmFkZENsYXNzKCdzdG9yZS1oaWRkZW4nKTtcblxuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5jaGVja1N0b3JlKCk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgPyB0aGlzLmNoZWNrU3RvcmUuYmluZCh0aGlzKSA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja1N0b3JlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuXG5cbiAgfVxufVxuXG5sZXQgTmF2ID0gbmV3IE5hdkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcblxuY2xhc3MgUHJvZHVjdHNDb21wb25lbnQge1xuICBmb250UHJldmlld0FycmF5OiBhbnk7XG4gIGV2ZW50OiBFdmVudDtcbiAgYXBwOiBKUXVlcnk7XG4gIGlzT3BlbjogQm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbnRQcmV2aWV3QXJyYXkgPSAkKFwiLmZvbnQtcHJldmlld1wiKTtcbiAgICB0aGlzLmFwcCA9ICQoJyNhcHAnKTtcbiAgfVxuXG4gIGFkZEJ1dHRvbkNsaWNrKCkge1xuICAgIHRoaXMuZm9udFByZXZpZXdBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB0aGlzLmJ1dHRvbkNsaWNrLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlRXZlbnQoKSB7XG4gICAgdGhpcy5ldmVudCA9IG5ldyBDdXN0b21FdmVudChcbiAgICAgIFwiZm9udENoZWNrXCIsXG4gICAgICB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1lc3NhZ2U6IFwiSGVsbG8gV29ybGQhXCIsXG4gICAgICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzZXREYXRhKCBkYXRhICkge1xuICAgIHRoaXMuYXBwLmF0dHIoe1xuICAgICAgXCJkYXRhLXBsYWNlaG9sZGVyXCI6IGRhdGEucGxhY2Vob2xkZXIsXG4gICAgICBcImRhdGEtbmFtZVwiOiBkYXRhLm5hbWUsXG4gICAgICBcImRhdGEtc3R5bGVzXCI6IGRhdGEuc3R5bGVzXG4gICAgfSk7XG4gIH1cblxuICBidXR0b25DbGljayggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBCdWlsZCBmb250IGF0dHJcbiAgICBsZXQgZWxlbWVudCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgbmFtZSA9IGVsZW1lbnQuZGF0YShcIm5hbWVcIik7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIHBsYWNlaG9sZGVyOiBuYW1lICsgXCIgcHJldmlld1wiLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHN0eWxlczogZWxlbWVudC5kYXRhKFwic3R5bGVzXCIpLnNwbGl0KCcsJylcbiAgICB9O1xuXG4gICAgLy8gc2V0IG5ldyBkYXRhIG9uIHJlYWN0IGFwcFxuICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcblxuICAgIC8vIGZpcmUgZXZlbnQgdG8gbm90aWZ5IFJlYWN0IGFwcCB0byB1cGRhdGVcbiAgICBlLmN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcblxuICAgIC8vIG9wZW4gc2xpZGVyXG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGlmICggdGhpcy5pc09wZW4gKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmFwcC5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwicHJvZHVjdHNcIik7XG4gICAgdGhpcy5jcmVhdGVFdmVudCgpO1xuICAgIHRoaXMuYWRkQnV0dG9uQ2xpY2soKTtcbiAgfVxuXG59XG5cbmxldCBQcm9kdWN0cyA9IG5ldyBQcm9kdWN0c0NvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0czsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICBzZWFyY2hDb250YWluZXI6IGFueTtcbiAgc2VhcmNoSW5wdXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlYXJjaENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXQtc2VhcmNoLWNvbnRhaW5lclwiKTtcblxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjaGFuZ2VQbGFjZWhvbGRlclRleHQoIG9iamVjdDogYW55LCB0ZXh0OiBzdHJpbmcgKSB7XG4gICAgaWYgKCBvYmplY3QgKSB7XG4gICAgICBvYmplY3RbIDAgXS5wbGFjZWhvbGRlciA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIGlmICggdGhpcy5zZWFyY2hDb250YWluZXIgKSB7XG4gICAgICB0aGlzLnNlYXJjaElucHV0ID0gdGhpcy5zZWFyY2hDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmVsdGRmLXNlYXJjaC1maWVsZCcpO1xuICAgIH1cblxuICAgIFNlYXJjaENvbXBvbmVudC5jaGFuZ2VQbGFjZWhvbGRlclRleHQodGhpcy5zZWFyY2hJbnB1dCwgXCJleDogV2F0ZXJjb2xvciBUeXBvZ3JhcGh5XCIpO1xuICB9XG59XG5cbmxldCBTZWFyY2ggPSBuZXcgU2VhcmNoQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaDsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSAwO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IDMyMDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgdGhpcy5icHMgPSB7XG4gICAgICBtb2JpbGU6IDU0NCxcbiAgICAgIHRhYmxldDogNzY4LFxuICAgICAgbGFwdG9wOiA5OTIsXG4gICAgICBkZXNrdG9wOiAxMjAwLFxuICAgICAgZGVza3RvcF94bDogMTYwMFxuICAgIH07XG4gICAgdGhpcy5icm93c2VyID0gVXRpbGl0eUNvbXBvbmVudC53aGljaEJyb3dzZXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludHMgPSAoIGJwczogQnBzSW50ZXJmYWNlICkgPT4ge1xuICAgIGxldCBhcnIgPSBbXTtcblxuICAgIGZvciAoIGxldCBrZXkgaW4gYnBzICkge1xuICAgICAgaWYgKCBicHMuaGFzT3duUHJvcGVydHkoa2V5KSApIHtcbiAgICAgICAgYXJyLnB1c2goYnBzWyBrZXkgXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyci5yZXZlcnNlKCk7XG4gIH07XG4gIHByaXZhdGUgX2NoZWNrQnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBtYWtlIGJyZWFrcG9pbnQgZXZlbnQgYXZhaWxhYmxlIHRvIGFsbCBmaWxlcyB2aWEgdGhlIHdpbmRvdyBvYmplY3RcbiAgICBsZXQgb2xkX2JyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG5cbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG5cbiAgICBpZiAoIG9sZF9icmVha3BvaW50ICE9PSB0aGlzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICQod2luZG93KS50cmlnZ2VyKFwiYnJlYWtwb2ludENoYW5nZVwiLCBVdGlscy5icmVha3BvaW50KTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gZ2V0IGJyZWFrcG9pbnQgZnJvbSBjc3NcbiAgICAvLyBjb25zb2xlLmxvZygkKCdib2R5JykuY3NzKFwiei1pbmRleFwiKSk7XG5cbiAgICBsZXQgYm9keSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSksXG4gICAgICB6aW5kZXggPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWyBcInotaW5kZXhcIiBdO1xuXG4gICAgdGhpcy5icmVha3BvaW50ID0gcGFyc2VJbnQoemluZGV4LCAxMCk7XG4gIH07XG4gIHByaXZhdGUgX3NldFdpbmRvd1dpZHRoID0gKCkgPT4ge1xuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfTtcblxuXG4gIHB1YmxpYyBzdGF0aWMgd2hpY2hCcm93c2VyKCkge1xuICAgIGlmICggKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwic2FmYXJpXCIpID4gLTEpICYmICEoXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgPT09XG4gICAgICBcIk5ldHNjYXBlXCIpICkge1xuXG4gICAgICBpZiAoIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgIT09IG51bGwgKSB7XG4gICAgICAgIHJldHVybiBcImlwYWRcIjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBidWlsZEh0bWwoIHR5cGU6IHN0cmluZywgYXR0cnM/OiBPYmplY3QsIGh0bWw/OiBzdHJpbmcgKSB7XG5cbiAgICAvLyBodHRwOi8vbWFyY2dyYWJhbnNraS5jb20vYnVpbGRpbmctaHRtbC1pbi1qcXVlcnktYW5kLWphdmFzY3JpcHQvXG5cbiAgICBsZXQgaCA9ICc8JyArIHR5cGU7XG5cbiAgICBmb3IgKCBsZXQgYXR0ciBpbiBhdHRycyApIHtcbiAgICAgIGlmICggYXR0cnNbIGF0dHIgXSA9PT0gZmFsc2UgKSBjb250aW51ZTtcbiAgICAgIGggKz0gJyAnICsgYXR0ciArICc9XCInICsgYXR0cnNbIGF0dHIgXSArICdcIic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGggKz0gaHRtbCA/IFwiPlwiICsgaHRtbCArIFwiPC9cIiArIHR5cGUgKyBcIj5cIiA6IFwiLz5cIjtcbiAgfVxuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiVXRpbGl0aWVzIGxvYWRlZFwiKTtcblxuICAgIC8vIHNldCBicmVha3BvaW50IG9uIHdpbmRvdyBsb2FkXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgQnJlYWtwb2ludCBpczpcIiwgdGhpcy5icmVha3BvaW50KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYnJvd3Nlcik7XG5cbiAgICAvLyBjcmVhdGUgZnVsbCBhcnJheSBmb3IgaW1hZ2UgY29tcHJlc3Npb24gcmVmXG4gICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMuX3NldEJyZWFrcG9pbnRzKHRoaXMuYnBzKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLl9jaGVja0JyZWFrcG9pbnQpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFV0aWxzID0gbmV3IFV0aWxpdHlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7Il19
