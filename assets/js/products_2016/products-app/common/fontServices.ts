module app.common {

    //the interface for the service
    interface IDataAccessService {
        fontName: string;
        fontTitle: string;
        open: boolean;
        openPanel: boolean;
        element: any;
    }


    export class FontAccessService implements IDataAccessService {
        fontName: string;
        fontTitle: string;
        open: boolean;
        openPanel: boolean;
        element: any;

        //must be injected in the same order, item1, item2
        static $inject = [ '$rootScope' ];
        constructor(public $rootScope: angular.IRootScopeService) {

            this.fontName = 'old name';
            this.open = false;
            this.openPanel = false;

        }

        isOpen($event): void {
            this.open = true;
            this.element = $event;
            this.fontName = $event.target.getAttribute('data-name');
            this.fontTitle = $event.target.getAttribute('data-title');
        }

        close():void {
            //this.open = false;
            this.element = null;
        }

    }

    //register service as an angular Service - define a service with a lowercase for the name and the upper for the actual class.
    angular.module('common.services')
        .service('fontAccessService', FontAccessService);
}
