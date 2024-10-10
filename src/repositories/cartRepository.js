import CartDAO from '../dao/mongoDB/cartDAO.js';
import CartDTO from '../dtos/cartDTO.js';
import GenericRepository from './genericRepository.js';

export default class CartRepository extends GenericRepository {
    constructor() {
        super(CartDAO, CartDTO);
    }

    async addProductToCart(cartId, productId) {
        try {
            const updatedCart = await this.dao.addProductToCart(cartId, productId);
            return new this.dto(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCartProducts(cartId, products) {
        try {
            const updatedCart = await this.dao.updateCartProducts(cartId, products);
            return new this.dto(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async clearCart(cartId) {
        try {
            const clearedCart = await this.dao.clearCart(cartId);
            return new this.dto(clearedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const updatedCart = await this.dao.removeProductFromCart(cartId, productId);
            return new this.dto(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const updatedCart = await this.dao.updateProductQuantity(cartId, productId, quantity);
            return new this.dto(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}