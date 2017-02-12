const $ = jQuery;
import Utils from "../utils/utilities.ts";
import ProductStore from "./productStore.ts"

/**
 *
 * License Select Class
 * ......................
 * Inspired by CodyHouse.co
 *
 * */


class ProductsSelectBtn {
  cta: JQuery;
  selectBox: JQuery;
  licenseBox: JQuery;
  initialPrice: string;
  addtoCart: JQuery;
  index: number;
  gumroadLink: string;
  gumroadPrice: string;

  constructor(index:number, item: Element) {

    this.cta = $(item);
    this.licenseBox = this.cta.find('.select');
    this.selectBox = this.cta.find('[data-type="select"]');
    this.initialPrice = this.licenseBox.find('.stnd').data('link');
    this.addtoCart = this.cta.find('.add-to-cart');
    this.index = index;

  }

  setPriceUrl(){
   this.addtoCart.find('a').attr('href', this.initialPrice);
  }

  onSelectButtonClick(e:Event){

    let $this = $(e.currentTarget); //targets the div wrapper

    //check if another box has been opened
    if(ProductStore.state.isOpen){
      this.resetSelectBox($this);
    }

    //toggle open
    $this.toggleClass('is-open');
    ProductStore.state.isOpen = true;


    //target the actual element that was clicked - this gets fired everytime a user clicks, so it doesnt matter
    //because the item you select first is always the active item since only one is shown at a time.
    if( $(e.target).is('li')){

      //index is kinda a hack to select the item that gets selected by always adding one to the index
      let activeItem = $(e.target),
          index = activeItem.index() + 1; //get position of element clicked relative to its siblings

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

  }

  resetSelectBox(target:JQuery){

    //closes the ul if left open or user is not interacting with them
    target.parents('.et-box-item').siblings('div').find('[data-type="select"]').removeClass('is-open');
  }

  safariCheck(){
    if(Utils.browser === 'safari'){
      let css = {
        '-webkit-transition': '0',
        'transition': '0'
      };
      this.selectBox.find('ul').css(css)
    }
  }
  

  initDropdown(): void {

    this.safariCheck();

    this.setPriceUrl();

    this.selectBox.on('click', this.onSelectButtonClick.bind(this));

  }

}

export default ProductsSelectBtn;