module app.previewCtrl {

  interface IFontPreviewModel {
    itemName: string;
    selectedSize: number;
    myStyle: IStyleObject;
    font120(): void;
    font72(): void;
    font48(): void;
    font36(): void;
    setEvent: any;
    isActive: boolean;
    fontTitle: string;
    etFont: string;
  }

  interface IStyleObject {
    fontSize: string;
    lineHeight: string;
  }

  class FontPreviewCtrl implements IFontPreviewModel {
    itemName: string;
    selectedSize: number;
    setEvent: any;
    myStyle: IStyleObject;
    isActive: boolean;
    fontTitle: string;
    etFont: string;

    static $inject = [ 'fontAccessService', '$scope' ];

    constructor( private fontAccessService: app.common.FontAccessService,
                 public $scope: angular.IScope ) {

      this.itemName = 'Font Previewer';
      this.selectedSize = 72;

      if ( this.itemName === 'Tuesday' || this.itemName === 'Honeymoon' ) {
        this.myStyle = {
          fontSize: '72px',
          lineHeight: '88px'
        };
      } else {
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
      $scope.$watch(() => {
        return this.setEvent.element;
      }, ( newValue, oldValue ) => {
        console.log('fire main watchers');
        this.isActive = fontAccessService.open;
        this.itemName = fontAccessService.fontName;
        this.fontTitle = fontAccessService.fontTitle;
        this.etFont = this.fontTitle + ' Font Preview';

      });

    }

    close(): void {
      this.isActive = false;
    }

    font120(): void {

      if ( this.itemName === 'Tuesday' || this.itemName === 'Honeymoon' ) {
        this.myStyle = {
          fontSize: '120px',
          lineHeight: '153px'
        };
      } else {
        this.myStyle = {
          fontSize: '120px',
          lineHeight: '233px'
        };
      }

      this.selectedSize = 120;
    }

    font72(): void {
      if ( this.itemName === 'Tuesday' || this.itemName === 'Honeymoon' ) {
        this.myStyle = {
          fontSize: '72px',
          lineHeight: '88px'
        };
      } else {
        this.myStyle = {
          fontSize: '72px',
          lineHeight: '125px'
        };
      }

      this.selectedSize = 72;
    }

    font48(): void {
      if ( this.itemName === 'Tuesday' || this.itemName === 'Honeymoon' ) {
        this.myStyle = {
          fontSize: '48px',
          lineHeight: '54px'
        };
      } else {
        this.myStyle = {
          fontSize: '48px',
          lineHeight: '86px'
        };
      }

      this.selectedSize = 48;
    }

    font36(): void {
      if ( this.itemName === 'Tuesday' || this.itemName === 'Honeymoon' ) {
        this.myStyle = {
          fontSize: '36px',
          lineHeight: '48px'
        };
      } else {
        this.myStyle = {
          fontSize: '36px',
          lineHeight: '71px'
        };
      }

      this.selectedSize = 36;
    }

  }

  angular
    .module('fontPreviewer')
    .controller('FontPreviewCtrl',
      FontPreviewCtrl
    );
}