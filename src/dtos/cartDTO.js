export default class CartDTO {
    constructor(cart) {
        this.id = cart._id ? cart._id.toString() : null;
        this.products = cart.products ? cart.products.map(({ product, quantity }) => ({
            productId: product ? product._id.toString() : null,
            title: product ? product.title : 'Unknown',
            description: product ? product.description : 'No description',
            price: product ? product.price : 0,
            category: product ? product.category : 'No category',
            code: product ? product.code : 'No code',
            stock: product ? product.stock : 0,
            status: product ? product.status : false,
            thumbnails: product ? product.thumbnails : [],
            quantity: quantity || 0
        })) : [];
    }
}
