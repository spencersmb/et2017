module app.productsList {

    export interface IProductListModel {
        setEvent: any;
    }


    class ProductListCtrl implements IProductListModel {

        setEvent: any;
        static $inject = ['fontAccessService', '$rootScope', '$scope'];

        constructor(public fontAccessService: app.common.FontAccessService,
                    public $rootScope: angular.IRootScopeService,
                    public $scope: angular.IScope
        ) {

            //set reference to this controller to have access to the service obj
            //we can now call the methods on the service obj through this controller
            this.setEvent = fontAccessService;

        }

    }
    angular
        .module('fontPreviewer')
        .controller('ProductListCtrl',
        ProductListCtrl
    );

}