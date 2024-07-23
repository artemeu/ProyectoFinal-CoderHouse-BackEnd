import { Router } from "express";
import ProductManager from "../Class/productManager.js";
import { __dirname } from "../utils/utils.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/data/products.json`);

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;