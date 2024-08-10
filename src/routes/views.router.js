import { Router } from "express";
import ProductManagerFS from "../dao/fileSystem/productManager.js";
import ProductManager from "../dao/mongoDB/productManager.js";
import CartManager from "../dao/mongoDB/cartManager.js";
import { __dirname } from "../utils/utils.js";

const router = Router();
const productManagerFS = new ProductManagerFS(`${__dirname}/data/products.json`);
const productManager = new ProductManager();
const cartManager = new CartManager();

//Ruta para mostrar los productos de FileSystem
router.get('/', async (req, res) => {
    try {
        const products = await productManagerFS.getProducts();
        res.render('home', { title: 'Lista de Productos', products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Ruta para mostrar productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManagerFS.getProducts();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para mostrar todos los productos con paginación
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', category, status } = req.query;
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (status) {
            filter.status = status === 'true';
        }
        const options = {
            page: pageNum,
            limit: limitNum,
            sort: sortOption,
            lean: true
        };
        const result = await productManager.getProducts({ filter, options });
        res.render('index', {
            title: 'Lista de Productos',
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevPage ? `/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}` : null,
            nextLink: result.nextPage ? `/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}` : null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para mostrar los detalles de un producto
router.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productManager.getProductById(productId);
        if (product.error) {
            return res.status(404).json({ error: product.error });
        }
        // Crear una copia plana del producto
        const cleanProduct = {
            _id: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            code: product.code,
            stock: product.stock
        };
        res.render('productDetails', { title: `Detalles del Producto`, product: cleanProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para visualizar un carrito específico
router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart.error) {
            return res.status(404).json({ error: cart.error });
        }
        // Crear una copia plana del carrito
        const cleanCart = {
            _id: cart._id.toString(),
            products: cart.products.map(p => ({
                product: {
                    _id: p.product._id.toString(),
                    title: p.product.title,
                    price: p.product.price
                },
                quantity: p.quantity
            }))
        };
        res.render('cartDetails', { title: `Detalles del Carrito`, cart: cleanCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;