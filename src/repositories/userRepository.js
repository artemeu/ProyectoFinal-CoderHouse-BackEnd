import UserDAO from '../dao/mongoDB/userDAO.js';
import UserDTO from '../dtos/userDTO.js';
import GenericRepository from './genericRepository.js';

export default class UserRepository extends GenericRepository {
    constructor() {
        super(UserDAO, UserDTO);
    }

    async getUserByEmail(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            return user ? new this.dto(user, true) : null;
        } catch (error) {
            throw new Error(`Error al obtener el usuario por email: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await this.dao.delete(userId);
            return deletedUser ? new this.dto(deletedUser, false) : null;
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

    async getCurrentUserById(userId) {
        try {
            const user = await this.dao.getById(userId);
            return user ? new this.dto(user, false) : null;
        } catch (error) {
            throw new Error(`Error al obtener el usuario actual: ${error.message}`);
        }
    }

    async createUser(userData) {
        try {
            const newUser = await this.dao.create(userData);
            return newUser ? new this.dto(newUser, false) : null;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }
}