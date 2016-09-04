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
