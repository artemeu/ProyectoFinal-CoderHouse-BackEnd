import ProductRepository from "../repositories/productRepository.js";

const productRepository = new ProductRepository();

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
            lean: true
        };
        // Obtener productos con paginación, filtros y ordenamiento
        const result = await productRepository.getProducts({ filter, options });
        res.success({
            products: result.docs,
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
        res.errorServer(error.message);
    }
}

export const getProductById = async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productRepository.getById(productId);
        if (product.error) {
            return res.notFound(product.error);
        }
        res.success(product);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProductData = { ...req.body };
        const newProduct = await productRepository.create(newProductData);
        if (newProduct.error) {
            return res.badRequest(newProduct.error);
        }
        res.success(newProduct);
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.pid;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await productRepository.update(productId, updatedProductData);
        if (updatedProduct.error) {
            return res.notFound(updatedProduct.error);
        }
        res.success({
            message: `Producto con ID ${productId} actualizado correctamente`,
            payload: updatedProduct
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    try {
        const result = await productRepository.delete(productId);
        if (result.error) {
            return res.notFound(result.error);
        }
        res.success(result);
    } catch (error) {
        res.errorServer(error.message);
    }
}