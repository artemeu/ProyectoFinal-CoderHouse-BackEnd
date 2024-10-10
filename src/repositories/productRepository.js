import ProductDAO from '../dao/mongoDB/productDAO.js';
import ProductDTO from '../dtos/productDTO.js';
import GenericRepository from './genericRepository.js';

export default class ProductRepository extends GenericRepository {
    constructor() {
        super(ProductDAO, ProductDTO);
    }

    async getProducts(queryOptions) {
        try {
            const products = await this.dao.getProducts(queryOptions);
            return {
                ...products,
                docs: products.docs.map(product => new this.dto(product)),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}