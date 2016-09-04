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
