const $ = jQuery;
import Utils from "../partials/utils";

/**
 *
 * License Select Class
 * ......................
 * Inspired by CodyHouse.co
 *
 * */
interface IProductStore{
  isOpen:boolean;
  currentIndex: number;
}

class ProductStore {

  state: IProductStore;

  constructor() {
    this.state = {
      isOpen: false,
      currentIndex: 0
    }
  }


  createStore(): void {

  }

}


let Product_Store = new ProductStore();

export default Product_Store;