import ProductManagerFS from "../dao/fileSystem/productManager.js";
import ProductRepository from "../repositories/productRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import { __dirname } from "../utils/utils.js";

const productManagerFS = new ProductManagerFS(`${__dirname}/data/products.json`);
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();

export const getProductsFs = async (req, res) => {
    try {
        const products = await productManagerFS.getProducts();
        res.render('home', { title: 'Lista de Productos', products, css: '/css/products.css' });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const getProductsRT = async (req, res) => {
    try {
        const products = await productManagerFS.getProducts();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products, css: '/css/products.css' });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const getProductsMDB = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', category, status } = req.query;
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (status) {
            filter.status = status === 'true';
        }
        const options = {
            page: pageNum,
            limit: limitNum,
            sort: sortOption,
            lean: true
        };
        const result = await productRepository.getProducts({ filter, options });
        const currentUser = req.user ? req.user : null;
        res.render('index', {
            title: 'Lista de Productos',
            products: result.docs,
            currentUser,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevPage ? `/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}` : null,
            nextLink: result.nextPage ? `/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}` : null,
            css: '/css/products.css'
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const productDetail = async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productRepository.getById(productId);
        // Crear una copia plana del producto
        const cleanProduct = {
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            code: product.code,
            stock: product.stock
        };
        const currentUser = req.user ? req.user : null;
        res.render('productDetails', {
            title: `Detalles del Producto`,
            product: cleanProduct,
            currentUser,
            css: '/css/productdetail.css'
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const cartDetail = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartRepository.getById(cartId);
        // Crear una copia plana del carrito
        const cleanCart = {
            id: cart.id.toString(),
            products: cart.products.map(p => ({
                product: {
                    id: p.productId.toString(),
                    title: p.title,
                    price: p.price
                },
                quantity: p.quantity
            }))
        };
        // Calcular el total del carrito sumando el precio por cantidad de cada producto
        const total = cleanCart.products.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);
        const currentUser = req.user ? req.user : null;
        res.render('cartDetails', {
            title: 'Detalles del Carrito',
            cart: cleanCart,
            currentUser,
            total,
            css: '/css/cart.css'
        });
    } catch (error) {
        res.errorServer(error.message);
    }
}

export const userLogin = async (req, res) => {
    res.render('login', { title: "Login" });
}

export const userRegister = async (req, res) => {
    res.render('register', { title: "Register" });
}

export const userLogout = (req, res) => {
    res.clearCookie('currentUser');
    res.redirect('/products');
};

export const forgotPass = async (req, res) => {
    res.render('forgotpass', { title: "Recuperar Contraseña" });
}