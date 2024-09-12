import { Router } from "express";
import { cartDetail, getProductsFs, getProductsMDB, getProductsRT, productDetail } from "../controllers/views.controller.js";

const router = Router();

router.get('/', getProductsFs);
router.get('/realtimeproducts', getProductsRT);
router.get('/products', getProductsMDB);
router.get('/products/:pid', productDetail);
router.get('/carts/:cid', cartDetail);

export default router;