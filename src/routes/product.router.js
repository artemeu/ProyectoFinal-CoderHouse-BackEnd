import { Router } from "express";
import ProductManager from "../Class/productManager.js";
import { __dirname } from "../utils/utils.js";


const router = Router();
const productManager = new ProductManager(`${__dirname}/data/products.json`);

router.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        const limit = parseInt(req.query.limit);
        if (!isNaN(limit)) {
            products = products.slice(0, limit); // Aplicar el límite si está definido
        }
        res.render('home', { title: 'Lista de Productos', products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProductData = {
            ...req.body,
            status: true
        };
        const newProduct = await productManager.addProduct(newProductData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProductData = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(productId, updatedProductData);
        if (updatedProduct) {
            res.json({ message: `Producto con ID ${productId} actualizado correctamente` });
        } else {
            res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const deleted = await productManager.deleteProduct(productId);
        if (deleted) {
            res.json({ message: `Producto con ID ${productId} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;