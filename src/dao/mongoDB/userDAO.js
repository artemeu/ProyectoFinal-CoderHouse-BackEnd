import User from '../models/userModel.js';
import GenericDAO from './genericDAO.js';

export default class UserDAO extends GenericDAO {
    constructor() {
        super(User);
    }

    // Método para obtener todos los usuarios
    async getAll() {
        try {
            return await this.model.find().populate('cart');
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    // Método para obtener un usuario por su email
    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({ email }).lean();
            return user || null;
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    }
}