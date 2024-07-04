import fs from 'fs/promises';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.carts = JSON.parse(data);
        } catch {
            this.carts = [];
        }
    }

    async saveData() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
        } catch (error) {
            return { error: `Error al guardar los datos en el archivo '${this.path}': ${error.message}` };
        }
    }

    async getCarts() {
        await this.loadData();
        return this.carts;
    }

    async getCartById(cartId) {
        await this.loadData();
        const cart = this.carts.find(c => c.id === cartId);
        if (!cart) return { error: `Carrito con ID ${cartId} no encontrado` };
        return cart;
    }

    async createCart() {
        await this.loadData();
        const id = this.generateUniqueId();
        const newCart = { id, products: [] };
        this.carts.push(newCart);
        await this.saveData();
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        await this.loadData();
        // Buscar el índice del carrito en el array de carritos
        const cartIndex = this.carts.findIndex(c => c.id === cartId);
        if (cartIndex === -1) return { error: `Carrito con ID ${cartId} no encontrado` };
        // Buscar si el producto que ya existe en el carrito actual
        const productIndex = this.carts[cartIndex].products.findIndex(p => p.product === productId);
        // Si el producto ya existe, incrementar la cantidad
        if (productIndex !== -1) {
            this.carts[cartIndex].products[productIndex].quantity++;
        } else {
            // Si el producto no existe, agregarlo al carrito con cantidad 1
            this.carts[cartIndex].products.push({ product: productId, quantity: 1 });
        }
        await this.saveData();
        return this.carts[cartIndex];
    }

    generateUniqueId() {
        return Date.now().toString() + Math.floor(Math.random() * 100);
    }
}

export default CartManager;
