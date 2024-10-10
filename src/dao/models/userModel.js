import mongoose from "mongoose";

const userCollection = 'users';

const userShema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: null
    }
})

const User = mongoose.model(userCollection, userShema);

export default User;