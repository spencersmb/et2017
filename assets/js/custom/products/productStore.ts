const $ = jQuery;
import Utils from "../partials/utils";

/**
 *
 * State for Products
 * ......................
 * 
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

}


let Product_Store = new ProductStore();

export default Product_Store;