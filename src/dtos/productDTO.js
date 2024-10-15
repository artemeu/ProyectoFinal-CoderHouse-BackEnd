export default class ProductDTO {
    constructor(product) {
        this.id = product._id.toString();
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.category = product.category;
        this.code = product.code;
        this.stock = product.stock;
        this.status = product.status;
        this.thumbnails = product.thumbnails;
    }
}