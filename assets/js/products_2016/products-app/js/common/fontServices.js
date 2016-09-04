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
