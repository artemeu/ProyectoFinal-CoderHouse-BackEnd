import CustomRouter from "./customRouter.js";
import * as ViewsController from "../controllers/views.controller.js";
import { userPassport } from "../middlewares/authJWT.js";


class ViewsRouter extends CustomRouter {
    init() {
        this.get('/', [], ViewsController.getProductsFs);
        this.get('/realtimeproducts', [], ViewsController.getProductsRT);
        this.get('/login', [], ViewsController.userLogin);
        this.get('/logout', [], ViewsController.userLogout);
        this.get('/register', [], ViewsController.userRegister);
        this.get('/forgotpass', [], ViewsController.forgotPass);
        this.get('/products', [], userPassport('current'), ViewsController.getProductsMDB);
        this.get('/products/:pid', [], ViewsController.productDetail);
        this.get('/carts/:cid', ['authenticated', 'admin', 'user'], userPassport('current'), ViewsController.cartDetail);
    }
}

export default new ViewsRouter().getRouter();