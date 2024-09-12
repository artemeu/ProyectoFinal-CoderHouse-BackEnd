import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'El precio debe ser mayor que 0']
    },
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser menor que 0']
    },
    status: {
        type: Boolean,
        default: true
    },
    thumbnails: [{ type: String }]
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

export default Product;
