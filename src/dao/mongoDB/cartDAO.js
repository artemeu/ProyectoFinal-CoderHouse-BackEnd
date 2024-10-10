import Cart from '../models/cartModel.js';
import GenericDAO from './genericDAO.js';


export default class CartDAO extends GenericDAO {
    constructor() {
        super(Cart);
    }

    // Método para obtener todos los carritos con populate
    async getAll() {
        try {
            return await this.model.find().populate('products.product');
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    }

    // Método para obtener un carrito por su ID con populate
    async getById(cartId) {
        try {
            return await this.model.findById(cartId).populate('products.product');
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.getById(cartId);
            if (!cart) throw new Error(`Carrito con ID ${cartId} no encontrado`);

            // Buscar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.product.id === productId);
            if (productIndex !== -1) {
                // Si el producto ya existe, lo incrementamos en 1
                cart.products[productIndex].quantity++;
            } else {
                // Si el producto no existe, lo agregamos al carrito con cantidad 1
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
        }
    }

    // Método para eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.getById(cartId);
            if (!cart) throw new Error(`Carrito con ID ${cartId} no encontrado`);
            cart.products = cart.products.filter(p => p.product.id !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
        }
    }

    // Método para actualizar productos en el carrito
    async updateCartProducts(cartId, products) {
        try {
            const cart = await this.getById(cartId);
            if (!cart) throw new Error(`Carrito con ID ${cartId} no encontrado`);
            for (const p of products) {
                const productIndex = cart.products.findIndex(prod => prod.product._id.toString() === p.product);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += p.quantity || 1;
                } else {
                    cart.products.push({ product: p.product, quantity: p.quantity || 1 });
                }
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al actualizar los productos del carrito: ${error.message}`);
        }
    }

    // Método para actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.getById(cartId);
            if (!cart) throw new Error(`Carrito con ID ${cartId} no encontrado`);
            const product = cart.products.find(p => p.product.id === productId);
            if (!product) throw new Error(`Producto con ID ${productId} no encontrado en el carrito`);
            product.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
        }
    }

    // Método para vaciar el carrito
    async clearCart(cartId) {
        try {
            const cart = await this.getById(cartId);
            if (!cart) throw new Error(`Carrito con ID ${cartId} no encontrado`);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al limpiar el carrito: ${error.message}`);
        }
    }
}