class CartDTO {
    constructor(cart) {
        this.id = cart._id.toString();
        this.products = cart.products.map(({ product, quantity }) => ({
            productId: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            code: product.code,
            stock: product.stock,
            status: product.status,
            thumbnails: product.thumbnails,
            quantity: quantity
        }));
    }
}

export default CartDTO;
