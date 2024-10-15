import CustomRouter from "./customRouter.js";
import * as CartController from "../controllers/cart.controller.js";



class CartRouter extends CustomRouter {
    init() {
        this.get('/', [], CartController.getCarts);
        this.get('/:cid', [], CartController.getCartById);
        this.post('/', ['authenticated', 'admin', 'user'], CartController.createCart);
        this.post('/:cid/products/:pid', ['authenticated', 'admin', 'user'], CartController.addProdToCart);
        this.post('/:cid/purchase', ['authenticated', 'admin', 'user'], CartController.purchaseCart);
        this.put('/:cid', ['authenticated', 'admin', 'user'], CartController.updateCart);
        this.put('/:cid/products/:pid', ['authenticated', 'admin', 'user'], CartController.updateQProdInCart);
        this.delete('/:cid', ['authenticated', 'admin', 'user'], CartController.deleteAllProduct);
        this.delete('/:cid/products/:pid', ['authenticated', 'admin', 'user'], CartController.deleteProductSelect);
        this.delete('/:cid/empty', ['authenticated', 'admin'], CartController.deleteCart);
    }
}

export default new CartRouter().getRouter();

