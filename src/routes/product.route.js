import CustomRouter from "./customRouter.js";
import * as ProductController from "../controllers/product.controller.js";


class ProductRouter extends CustomRouter {
    init() {
        this.get('/', [], ProductController.getProducts);
        this.get('/:pid', [], ProductController.getProductById);
        this.post('/', ['authenticated', 'admin'], ProductController.createProduct);
        this.put('/:pid', ['authenticated', 'admin'], ProductController.updateProduct);
        this.delete('/:pid', ['authenticated', 'admin'], ProductController.deleteProduct);
    }
}

export default new ProductRouter().getRouter();