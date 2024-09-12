import { Router } from "express";
import { addProdToCart, createCart, deleteAllProduct, deleteCart, deleteProductSelect, getCartById, getCarts, updateCart, updateQProdInCart } from "../controllers/cart.controller.js";

const router = Router();

router.get('/', getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/products/:pid', addProdToCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateQProdInCart);
router.delete('/:cid', deleteAllProduct);
router.delete('/:cid/products/:pid', deleteProductSelect);
router.delete('/:cid/empty', deleteCart);

export default router;
