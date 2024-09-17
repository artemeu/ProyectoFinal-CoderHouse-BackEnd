import CustomRouter from "./customRouter.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";


class ProductRouter extends CustomRouter {
    init() {
        this.get('/', getProducts);
        this.get('/:pid', getProductById);
        this.post('/', createProduct);
        this.put('/:pid', updateProduct);
        this.delete('/:pid', deleteProduct);
    }
}

export default new ProductRouter().getRouter();