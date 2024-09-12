import CartManager from "../dao/mongoDB/cartManager.js";
import ProductManager from "../dao/mongoDB/productManager.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

export const getCarts = async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart.error) {
            return res.status(404).json(cart);
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addProdToCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const product = await productManager.getProductById(productId);
        if (product.error) {
            return res.status(404).json(product);
        }
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        if (updatedCart.error) {
            return res.status(404).json(updatedCart);
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;
    try {
        const result = await cartManager.updateCartProducts(cartId, products);
        if (result.error) {
            return res.status(400).json(result);
        }
        res.json({
            status: 'success',
            payload: result.products,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateQProdInCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    try {
        const result = await cartManager.updateProductQuantity(cartId, productId, quantity);
        if (result.error) {
            return res.status(400).json(result);
        }
        res.json({ status: 'success', message: `Cantidad del producto con ID ${productId} actualizada en el carrito con ID ${cartId}`, payload: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteAllProduct = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const result = await cartManager.clearCart(cartId);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json({ status: 'success', message: `Todos los productos eliminados del carrito con ID ${cartId}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProductSelect = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const result = await cartManager.removeProductFromCart(cartId, productId);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json({ status: 'success', message: `Producto con ID ${productId} eliminado del carrito con ID ${cartId}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCart = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const result = await cartManager.removeCart(cartId);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json({ status: 'success', message: `Carrito con ID ${cartId} eliminado exitosamente` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}