import { Router } from "express";
import CartManager from "../Class/cartManager.js";
import ProductManager from "../Class/productManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const cartManager = new CartManager(`${__dirname}/data/carts.json`);
const productManager = new ProductManager(`${__dirname}/data/products.json`);

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
        }
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
