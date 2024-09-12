import Cart from '../models/cartModel.js';

class CartManager {
    // Método para obtener todos los carritos
    async getCarts() {
        try {
            const carts = await Cart.find().populate('products.product');
            return carts;
        } catch (error) {
            return { error: `Error al obtener los carritos: ${error.message}` };
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate('products.product');
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            return cart;
        } catch (error) {
            return { error: `Error al obtener el carrito: ${error.message}` };
        }
    }

    // Método para crear un nuevo carrito
    async createCart() {
        try {
            const newCart = await Cart.create({ products: [] });
            return newCart;
        } catch (error) {
            return { error: `Error al crear el carrito: ${error.message}` };
        }
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            // Buscar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
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
            return { error: `Error al agregar el producto al carrito: ${error.message}` };
        }
    }

    // Método para eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            return { error: `Error al eliminar el producto del carrito: ${error.message}` };
        }
    }

    // Método para agregar producto al carrito
    async updateCartProducts(cartId, products) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            cart.products = products.map(p => ({
                product: p.product,
                quantity: p.quantity !== undefined ? p.quantity : 1
            }));
            await cart.save();
            const updatedCart = await Cart.findById(cartId).populate('products.product');
            return updatedCart;
        } catch (error) {
            return { error: `Error al actualizar los productos del carrito: ${error.message}` };
        }
    }

    // Método para actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            const product = cart.products.find(p => p.product.toString() === productId);
            if (!product) return { error: `Producto con ID ${productId} no encontrado en el carrito` };
            product.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            return { error: `Error al actualizar la cantidad del producto en el carrito: ${error.message}` };
        }
    }

    // Método para vaciar el carrito
    async clearCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            return { error: `Error al limpiar el carrito: ${error.message}` };
        }
    }

    // Método para eliminar un carrito completo
    async removeCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
            await Cart.deleteOne({ _id: cartId });
            return { status: 'success', message: `Carrito con ID ${cartId} eliminado exitosamente` };
        } catch (error) {
            return { error: `Error al eliminar el carrito: ${error.message}` };
        }
    }
}

export default CartManager;
