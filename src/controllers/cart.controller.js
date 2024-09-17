import CartManager from "../dao/mongoDB/cartManager.js";
import ProductManager from "../dao/mongoDB/productManager.js";
import UserManager from "../dao/mongoDB/userManager.js";
import { generadorToken } from "../utils/utils.js";

const cartManager = new CartManager();
const productManager = new ProductManager();
const userManager = new UserManager();

export const getCarts = async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.success(carts);
    } catch (error) {
        res.errorServer(error);
    }
}

export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart.error) {
            return res.notFound(cart.error);
        }
        res.success(cart);
    } catch (error) {
        res.errorServer(error);
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.success(newCart);
    } catch (error) {
        res.errorServer(error);
    }
}

export const addProdToCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const product = await productManager.getProductById(productId);
        if (product.error) {
            return res.notFound(product.error);
        }
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        if (updatedCart.error) {
            return res.notFound(updatedCart.error);
        }
        res.success(updatedCart);
    } catch (error) {
        res.errorServer(error);
    }
}

export const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;
    try {
        const result = await cartManager.updateCartProducts(cartId, products);
        if (result.error) {
            return res.badRequest(result.error);
        }
        res.success(result.products);
    } catch (error) {
        res.errorServer(error);
    }
}

export const updateQProdInCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    try {
        const result = await cartManager.updateProductQuantity(cartId, productId, quantity);
        if (result.error) {
            return res.badRequest(result.error);
        }
        res.success({
            message: `Cantidad del producto con ID ${productId} actualizada en el carrito con ID ${cartId}`,
            payload: result
        });
    } catch (error) {
        res.errorServer(error);
    }
}

export const deleteAllProduct = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const result = await cartManager.clearCart(cartId);
        if (result.error) {
            return res.notFound(result.error);
        }
        res.success({
            message: `Todos los productos eliminados del carrito con ID ${cartId}`
        });
    } catch (error) {
        res.errorServer(error);
    }
}

export const deleteProductSelect = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const result = await cartManager.removeProductFromCart(cartId, productId);
        if (result.error) {
            return res.notFound(result.error);
        }
        res.success({
            message: `Producto con ID ${productId} eliminado del carrito con ID ${cartId}`
        });
    } catch (error) {
        res.errorServer(error);
    }
}

export const deleteCart = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.notFound(`Carrito con ID ${cartId} no encontrado.`);
        }
        const result = await cartManager.removeCart(cartId);
        if (result.error) {
            return res.notFound(result.error);
        }
        if (!req.user) {
            return res.unauthorized('No autenticado');
        }
        const userId = req.user._id;
        await userManager.updateUser(userId, { cart: null });
        const token = generadorToken({
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            rol: req.user.rol,
            cart: null
        });
        return res.success({
            message: `Carrito con ID ${cartId} eliminado y token actualizado`
        }).cookie('currentUser', token, {
            maxAge: 24 * 60 * 60 * 1000,
            signed: true,
            httpOnly: true
        });
    } catch (error) {
        res.errorServer(error);
    }
};
