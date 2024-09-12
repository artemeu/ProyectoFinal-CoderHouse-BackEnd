import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;
