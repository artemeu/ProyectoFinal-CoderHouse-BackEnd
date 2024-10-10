import Product from '../models/productModel.js';
import GenericDAO from './genericDAO.js';

export default class ProductDAO extends GenericDAO {
    constructor() {
        super(Product);
    }

    // Método para obtener todos los productos
    async getProducts(queryOptions) {
        try {
            const { filter, options } = queryOptions;
            const result = await this.model.paginate(filter, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    // Método para agregar un nuevo producto
    async addProduct(productData) {
        const { title, description, price, category, code, stock } = productData;
        // Validar campos obligatorios y valores válidos
        if ([title, description, price, category, code, stock].some(field => !field && field !== 0)) {
            throw new Error('Todos los campos son obligatorios y deben ser válidos');
        }
        if (price <= 0 || stock < 0) {
            throw new Error('El precio debe ser mayor que 0 y el stock no puede ser negativo');
        }
        try {
            // Verificar si ya existe un producto con el mismo código
            const existingProduct = await this.model.findOne({ code });
            if (existingProduct) {
                throw new Error(`Ya existe un producto con el código '${code}'`);
            }
            return await this.create(productData);
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    // Método para actualizar un producto por su ID
    async updateProduct(productId, updatedProductData) {
        // Validar campos obligatorios si se están actualizando
        const { price, stock } = updatedProductData;
        if (price <= 0 || stock < 0) {
            throw new Error('El precio debe ser mayor que 0 y el stock no puede ser negativo');
        }
        return await this.update(productId, updatedProductData);
    }
}