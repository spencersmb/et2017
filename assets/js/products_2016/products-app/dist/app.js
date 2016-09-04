var app;
(function (app) {
    var main = angular.module('fontPreviewer', [
        'common.services',
        'ngAnimate'
    ]);
})(app || (app = {}));

//# sourceMappingURL=app.js.map

var app;
(function (app) {
    var common;
    (function (common) {
        angular.module('common.services', []);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=common.services.js.map

var app;
(function (app) {
    var common;
    (function (common) {
        var FontAccessService = (function () {
            function FontAccessService($rootScope) {
                this.$rootScope = $rootScope;
                this.fontName = 'old name';
                this.open = false;
                this.openPanel = false;
            }
            FontAccessService.prototype.isOpen = function ($event) {
                this.open = true;
                this.element = $event;
                this.fontName = $event.target.getAttribute('data-name');
                this.fontTitle = $event.target.getAttribute('data-title');
            };
            FontAccessService.prototype.close = function () {
                //this.open = false;
                this.element = null;
            };
            //must be injected in the same order, item1, item2
            FontAccessService.$inject = ['$rootScope'];
            return FontAccessService;
        })();
        common.FontAccessService = FontAccessService;
        //register service as an angular Service - define a service with a lowercase for the name and the upper for the actual class.
        angular.module('common.services')
            .service('fontAccessService', FontAccessService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

//# sourceMappingURL=fontServices.js.map

var app;
(function (app) {
    var previewCtrl;
    (function (previewCtrl) {
        var FontPreviewCtrl = (function () {
            function FontPreviewCtrl(fontAccessService, $scope) {
                var _this = this;
                this.fontAccessService = fontAccessService;
                this.$scope = $scope;
                this.itemName = 'Font Previewer';
                this.selectedSize = 72;
                if (this.itemName === 'Tuesday' || this.itemName === 'Honeymoon') {
                    this.myStyle = {
                        fontSize: '72px',
                        lineHeight: '88px'
                    };
                }
                else {
                    this.myStyle = {
                        fontSize: '72px',
                        lineHeight: '125px'
                    };
                }
                this.isActive = false;
                //set link to service - then we can access or $watch data change on that service
                //data is changed via an event in the list controller using the same pattern to set a refrence on the ctrler.
                this.setEvent = fontAccessService;
                //watch the element that is clicked so that open can stay open if the element that was clicked is a product
                $scope.$watch(function () {
                    return _this.setEvent.element;
                }, function (newValue, oldValue) {
                    console.log('fire main watchers');
                    _this.isActive = fontAccessService.open;
                    _this.itemName = fontAccessService.fontName;
                    _this.fontTitle = fontAccessService.fontTitle;
                    _this.etFont = _this.fontTitle + ' Font Preview';
                });
            }
            FontPreviewCtrl.prototype.close = function () {
                this.isActive = false;
            };
            FontPreviewCtrl.prototype.font120 = function () {
                if (this.itemName === 'Tuesday' || this.itemName === 'Honeymoon') {
                    this.myStyle = {
                        fontSize: '120px',
                        lineHeight: '153px'
                    };
                }
                else {
                    this.myStyle = {
                        fontSize: '120px',
                        lineHeight: '233px'
                    };
                }
                this.selectedSize = 120;
            };
            FontPreviewCtrl.prototype.font72 = function () {
                if (this.itemName === 'Tuesday' || this.itemName === 'Honeymoon') {
                    this.myStyle = {
                        fontSize: '72px',
                        lineHeight: '88px'
                    };
                }
                else {
                    this.myStyle = {
                        fontSize: '72px',
                        lineHeight: '125px'
                    };
                }
                this.selectedSize = 72;
            };
            FontPreviewCtrl.prototype.font48 = function () {
                if (this.itemName === 'Tuesday' || this.itemName === 'Honeymoon') {
                    this.myStyle = {
                        fontSize: '48px',
                        lineHeight: '54px'
                    };
                }
                else {
                    this.myStyle = {
                        fontSize: '48px',
                        lineHeight: '86px'
                    };
                }
                this.selectedSize = 48;
            };
            FontPreviewCtrl.prototype.font36 = function () {
                if (this.itemName === 'Tuesday' || this.itemName === 'Honeymoon') {
                    this.myStyle = {
                        fontSize: '36px',
                        lineHeight: '48px'
                    };
                }
                else {
                    this.myStyle = {
                        fontSize: '36px',
                        lineHeight: '71px'
                    };
                }
                this.selectedSize = 36;
            };
            FontPreviewCtrl.$inject = ['fontAccessService', '$scope'];
            return FontPreviewCtrl;
        })();
        angular
            .module('fontPreviewer')
            .controller('FontPreviewCtrl', FontPreviewCtrl);
    })(previewCtrl = app.previewCtrl || (app.previewCtrl = {}));
})(app || (app = {}));

//# sourceMappingURL=mainCtrl.js.map

var app;
(function (app) {
    var productsList;
    (function (productsList) {
        var ProductListCtrl = (function () {
            function ProductListCtrl(fontAccessService, $rootScope, $scope) {
                this.fontAccessService = fontAccessService;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                //set reference to this controller to have access to the service obj
                //we can now call the methods on the service obj through this controller
                this.setEvent = fontAccessService;
            }
            ProductListCtrl.$inject = ['fontAccessService', '$rootScope', '$scope'];
            return ProductListCtrl;
        })();
        angular
            .module('fontPreviewer')
            .controller('ProductListCtrl', ProductListCtrl);
    })(productsList = app.productsList || (app.productsList = {}));
})(app || (app = {}));

//# sourceMappingURL=productsListCtrl.js.map
