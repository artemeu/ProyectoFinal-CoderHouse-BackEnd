import mongoose from "mongoose";

const userCollection = 'users';

const userShema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: null
    }
})

const User = mongoose.model(userCollection, userShema);

export default User;