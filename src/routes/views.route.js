import CustomRouter from "./customRouter.js";
import { cartDetail, forgotPass, getProductsFs, getProductsMDB, getProductsRT, productDetail, userLogin, userLogout, userRegister } from "../controllers/views.controller.js";
import { invokePassport, userPassport } from "../middlewares/authJWT.js";


class ViewsRouter extends CustomRouter {
    init() {
        this.get('/', getProductsFs);
        this.get('/login', userLogin);
        this.get('/logout', userLogout);
        this.get('/register', userRegister);
        this.get('/realtimeproducts', getProductsRT);
        this.get('/forgotpass', forgotPass);
        this.get('/products', userPassport('current'), getProductsMDB);
        this.get('/products/:pid', userPassport('current'), productDetail);
        this.get('/carts/:cid', invokePassport('current'), userPassport('current'), cartDetail);
    }
}

export default new ViewsRouter().getRouter();