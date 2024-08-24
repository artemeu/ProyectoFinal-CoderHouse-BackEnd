import fs from 'fs/promises';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    // Método para cargar los datos desde el archivo
    async loadData() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch {
            this.products = [];
        }
    }

    // Método para guardar los datos en el archivo
    async saveData() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            return { error: `Error al guardar los datos en el archivo '${this.path}': ${error.message}` };
        }
    }

    // Método para obtener todos los productos
    async getProducts() {
        await this.loadData();
        return this.products;
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        await this.loadData();
        const product = this.products.find(p => p.id === productId);
        if (!product) return { error: `Producto con ID ${productId} no encontrado` };
        return product;
    }

    // Método para agregar un nuevo producto
    async addProduct(productData) {
        const { title, description, price, category, code, stock } = productData;
        if (!title || !description || price === undefined || !category || !code || stock === undefined) {  // || !thumbnails || !Array.isArray(thumbnails)
            return { error: 'Todos los campos son obligatorios' };
        }
        // Convertir price y stock a números antes de validarlos
        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stock, 10);

        // Validación de precio y stock negativos
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return { error: 'El precio no puede ser negativo o es inválido' };
        }

        if (isNaN(parsedStock) || parsedStock < 0) {
            return { error: 'El stock no puede ser negativo o es inválido' };
        }
        await this.loadData();
        if (this.products.some(p => p.code === code)) {
            return { error: `Ya existe un producto con el código '${code}'` };
        }
        // Encontrar el próximo ID único disponible
        const id = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
        const newProduct = {
            id,
            ...productData
        };
        this.products.push(newProduct);
        await this.saveData();
        return newProduct;
    }

    // Método para actualizar un producto por su ID
    async updateProduct(productId, updatedProductData) {
        await this.loadData();
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) return false;
        // Combina los datos existentes del producto con los datos actualizados proporcionados
        const updatedProduct = { ...this.products[index], ...updatedProductData };
        // Reemplaza el producto existente con el producto actualizado
        this.products[index] = updatedProduct;
        await this.saveData();
        return updatedProduct;
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(productId) {
        await this.loadData();
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) return false;
        this.products.splice(index, 1); // Elimina 1 elemento en la posición index del array
        await this.saveData();
        return true;
    }
}

export default ProductManager;