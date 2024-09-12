import ProductManager from "../dao/mongoDB/productManager.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', query = {} } = req.query;
        // Validar y parsear parámetros
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
        const filter = {};
        if (query.category) {
            filter.category = query.category;
        }
        if (query.status) {
            filter.status = query.status === 'true';
        }
        // Opciones para la paginación
        const options = {
            page: pageNum,
            limit: limitNum,
            sort: sortOption,
            lean: true // Para obtener un objeto plano en lugar de un documento Mongoose
        };
        // Obtener productos con paginación, filtros y ordenamiento
        const result = await productManager.getProducts({ filter, options });
        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevPage ? `/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}` : null,
            nextLink: result.nextPage ? `/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}` : null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productManager.getProductById(productId);
        if (product.error) {
            return res.status(404).json(product);
        }
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProductData = { ...req.body };
        const newProduct = await productManager.addProduct(newProductData);
        if (newProduct.error) {
            return res.status(400).json({ error: newProduct.error });
        }
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.pid;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(productId, updatedProductData);
        if (updatedProduct.error) {
            return res.status(404).json(updatedProduct);
        }
        res.json({ message: `Producto con ID ${productId} actualizado correctamente`, updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    try {
        const result = await productManager.deleteProduct(productId);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}