import CartRepository from "../repositories/cartRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import UserRepository from "../repositories/userRepository.js";
import TicketRepository from '../repositories/ticketRepository.js';
import { generadorToken } from "../utils/utils.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const ticketRepository = new TicketRepository();

// Obtener los carritos
export const getCarts = async (req, res) => {
    try {
        const carts = await cartRepository.getAll();
        res.success(carts);
    } catch (error) {
        res.errorServer(error.message);
    }
}

// Obtener carrito por id
export const getCartById = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartRepository.getById(cartId);
        res.success(cart);
    } catch (error) {
        res.errorServer(error.message);
    }
}

// Crear carrito
export const createCart = async (req, res) => {
    try {
        const newCart = await cartRepository.create();
        res.success(newCart);
    } catch (error) {
        res.errorServer(error.message);
    }
}

// Agregar producto al carrito
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

// Agregar un array de productos al carrito
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

// Actualizar la cantidad del producto en el carrito
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

// Eliminar todos los productos del carrito
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

// Eliminar un producto del carrito
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

// Eliminar el carrito
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

//Finalizar la compra del carrito
export const purchaseCart = async (req, res) => {
    const cartId = req.params.cid;
    const userEmail = req.user.email;

    try {
        const user = await userRepository.getUserByEmail(userEmail);
        if (!user || user.cart.toString() !== cartId) {
            return res.unauthorized('No tienes permiso para procesar este carrito');
        }

        const cart = await cartRepository.getById(cartId);
        const itemsToBuy = [];
        const pendingItems = [];

        // Iterar sobre los productos del carrito
        for (const item of cart.products) {
            const product = await productRepository.getById(item.productId);
            const purchaseQuantity = Math.min(item.quantity, product.stock);

            if (purchaseQuantity > 0) {
                itemsToBuy.push({ ...item, quantity: purchaseQuantity });
                await productRepository.update(product.id, { stock: product.stock - purchaseQuantity });
            }
            // Solo agregar a pendingItems si hay cantidad restante
            const remainingQuantity = item.quantity - purchaseQuantity;
            if (remainingQuantity > 0) {
                pendingItems.push({ productId: item.productId, quantity: remainingQuantity });
            }
        }
        // Generar ticket si hay productos para comprar
        if (itemsToBuy.length > 0) {
            const totalAmount = itemsToBuy.reduce((total, item) => total + item.price * item.quantity, 0);
            await ticketRepository.create({ amount: totalAmount, purchaser: userEmail, products: itemsToBuy });
        }
        // Actualizar el carrito con los productos restantes
        await cartRepository.update(cartId, {
            products: pendingItems.map(item => ({
                product: item.productId,
                quantity: item.quantity
            }))
        });
        return res.success({
            message: itemsToBuy.length > 0 ? 'Compra finalizada con éxito' : 'No se pudieron procesar los productos',
            unavailableProducts: pendingItems
        });
    } catch (error) {
        return res.errorServer('Error al procesar la compra');
    }
};
