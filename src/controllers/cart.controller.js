import CartRepository from "../repositories/cartRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import UserRepository from "../repositories/userRepository.js";
import { generadorToken } from "../utils/utils.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();

export const getCarts = async (req, res) => {
    try {
        const carts = await cartRepository.getAll();
        res.success(carts);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartRepository.getById(cartId);
        res.success(cart);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const createCart = async (req, res) => {
    try {
        const newCart = await cartRepository.create();
        res.success(newCart);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const addProdToCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        await productRepository.getById(productId);
        const updatedCart = await cartRepository.addProductToCart(cartId, productId);
        res.success(updatedCart);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const updateCart = async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;
    try {
        const result = await cartRepository.updateCartProducts(cartId, products);
        res.success(result.products);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const updateQProdInCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    try {
        const result = await cartRepository.updateProductQuantity(cartId, productId, quantity);
        res.success({
            message: `Cantidad del producto con ID ${productId} actualizada en el carrito con ID ${cartId}`,
            payload: result
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const deleteAllProduct = async (req, res) => {
    const cartId = req.params.cid;
    try {
        await cartRepository.clearCart(cartId);
        res.success({
            message: `Todos los productos eliminados del carrito con ID ${cartId}`
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const deleteProductSelect = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        await cartRepository.removeProductFromCart(cartId, productId);
        res.success({
            message: `Producto con ID ${productId} eliminado del carrito con ID ${cartId}`
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const deleteCart = async (req, res) => {
    const cartId = req.params.cid;
    if (!req.user) return res.unauthorized('No autenticado');
    try {
        const cart = await cartRepository.getById(cartId);
        if (!cart) return res.notFound(`Carrito con ID ${cartId} no encontrado.`);
        await cartRepository.delete(cartId);
        const userId = req.user.id;
        const user = await userRepository.getById(userId);
        // Si el carrito eliminado es el del usuario autenticado, actualiza el carrito del usuario a null
        if (user?.cart === cartId) {
            await userRepository.update(userId, { cart: null });
            // Genera un nuevo token sin carrito
            const token = generadorToken({
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                rol: user.rol,
                cart: null
            });
            // Actualiza la cookie con el nuevo token
            res.cookie('currentUser', token, {
                maxAge: 24 * 60 * 60 * 1000, // 24 horas
                signed: true,
                httpOnly: true
            });
            return res.success({ message: `Carrito con ID ${cartId} eliminado y token actualizado` });
        }
        return res.success({ message: `Carrito con ID ${cartId} eliminado` });
    } catch (error) {
        return res.errorServer(error.message);
    }
};
