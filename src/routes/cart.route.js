import CustomRouter from "./customRouter.js";
import { addProdToCart, createCart, deleteAllProduct, deleteCart, deleteProductSelect, getCartById, getCarts, updateCart, updateQProdInCart } from "../controllers/cart.controller.js";
import { invokePassport } from "../middlewares/authJWT.js";


class CartRouter extends CustomRouter {
    init() {
        this.get('/', getCarts);
        this.get('/:cid', getCartById);
        this.post('/', createCart);
        this.post('/:cid/products/:pid', addProdToCart);
        this.put('/:cid', updateCart);
        this.put('/:cid/products/:pid', updateQProdInCart);
        this.delete('/:cid', deleteAllProduct);
        this.delete('/:cid/products/:pid', deleteProductSelect);
        this.delete('/:cid/empty', invokePassport('current'), deleteCart);
    }
}

export default new CartRouter().getRouter();

