import Product from '../models/productModel.js';

class ProductManager {

    // Método para obtener todos los productos
    async getProducts(queryOptions) {
        try {
            const { filter, options } = queryOptions;
            const result = await Product.paginate(filter, options);
            return result;
        } catch (error) {
            return { error: `Error al obtener los productos: ${error.message}` };
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) return { error: `Producto con ID ${productId} no encontrado` };
            return product;
        } catch (error) {
            return { error: `Error al obtener el producto: ${error.message}` };
        }
    }

    // Método para agregar un nuevo producto
    async addProduct(productData) {
        const { title, description, price, category, code, stock } = productData;
        // Validar campos obligatorios y valores válidos
        if ([title, description, price, category, code, stock].some(field => !field && field !== 0)) {
            return { error: 'Todos los campos son obligatorios y deben ser válidos' };
        }
        if (price <= 0 || stock < 0) {
            return { error: 'El precio debe ser mayor que 0 y el stock no puede ser negativo' };
        }
        try {
            // Verificar si ya existe un producto con el mismo código
            const existingProduct = await Product.findOne({ code });
            if (existingProduct) {
                return { error: `Ya existe un producto con el código '${code}'` };
            }
            const newProduct = await Product.create(productData);
            return newProduct;
        } catch (error) {
            return { error: `Error al agregar el producto: ${error.message}` };
        }
    }

    // Método para actualizar un producto por su ID
    async updateProduct(productId, updatedProductData) {
        try {
            // Validar campos obligatorios si se están actualizando
            const { price, stock } = updatedProductData;
            if (price <= 0 || stock < 0) {
                return { error: 'El precio debe ser mayor que 0 y el stock no puede ser negativo' };
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updatedProductData,
                { new: true } // Devuelve el documento actualizado
            );
            if (!updatedProduct) return { error: `Producto con ID ${productId} no encontrado` };
            return updatedProduct;
        } catch (error) {
            return { error: `Error al actualizar el producto: ${error.message}` };
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) return { error: `Producto con ID ${productId} no encontrado` };
            return { message: `Producto con ID ${productId} eliminado` };
        } catch (error) {
            return { error: `Error al eliminar el producto: ${error.message}` };
        }
    }
}

export default ProductManager;
