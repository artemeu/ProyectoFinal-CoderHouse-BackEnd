export default class GenericRepository {
    constructor(DAO, DTO) {
        this.dao = new DAO();
        this.dto = DTO;
    }

    async getAll() {
        try {
            const items = await this.dao.getAll();
            return items.map(item => new this.dto(item));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id) {
        try {
            const item = await this.dao.getById(id);
            return item ? new this.dto(item) : null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(data) {
        try {
            const newItem = await this.dao.create(data);
            return new this.dto(newItem);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, data) {
        try {
            const updatedItem = await this.dao.update(id, data);
            return updatedItem ? new this.dto(updatedItem) : null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const result = await this.dao.delete(id);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
