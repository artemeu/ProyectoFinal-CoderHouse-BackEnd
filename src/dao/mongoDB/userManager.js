import User from '../models/userModel.js';

class UserManager {
    // Metodo para crear un nuevo usuario
    async createUser(userData) {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            return { error: `Error al crear el usuario: ${error.message}` };
        }
    }

    // Metodo para obtener todos los usuarios
    async getAllUsers() {
        try {
            const users = await User.find().populate('cart');
            return users;
        } catch (error) {
            return { error: `Error al obtener los usuarios: ${error.message}` };
        }
    }

    // Metodo para obtener un usuario por su ID
    async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) return { error: 'Usuario no encontrado' };
            return user;
        } catch (error) {
            return { error: `Error al obtener el usuario: ${error.message}` };
        }
    }

    // Metodo para obtener un usuario por su email
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email }).lean();
            if (!user) return { error: 'Usuario no encontrado' };
            return user;
        } catch (error) {
            return { error: `Error al obtener el usuario: ${error.message}` };
        }
    }

    // Metodo para actualizar un usuario por su ID
    async updateUser(userId, updateData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser) return { error: 'Usuario no encontrado' };
            return updatedUser;
        } catch (error) {
            return { error: `Error al actualizar el usuario: ${error.message}` };
        }
    }

    // Metodo para eliminar un usuario por su ID
    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) return { error: 'Usuario no encontrado' };
            return deletedUser;
        } catch (error) {
            return { error: `Error al eliminar el usuario: ${error.message}` };
        }
    }
}

export default UserManager; 
