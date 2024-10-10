export default class GenericDAO {
    constructor(model) {
        this.model = model;
    }

    // Método para obtener todos los documentos
    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(`Error al obtener los documentos: ${error.message}`);
        }
    }

    // Método para obtener un documento por su ID
    async getById(id) {
        try {
            const document = await this.model.findById(id);
            if (!document) throw new Error(`${this.model.modelName} con ID ${id} no encontrado`);
            return document;
        } catch (error) {
            throw new Error(`Error al obtener el documento: ${error.message}`);
        }
    }

    // Método para crear un nuevo documento
    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error(`Error al crear el documento: ${error.message}`);
        }
    }

    // Método para actualizar un documento por su ID
    async update(id, updateData) {
        try {
            const updatedDocument = await this.model.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedDocument) throw new Error(`${this.model.modelName} no encontrado`);
            return updatedDocument;
        } catch (error) {
            throw new Error(`Error al actualizar el documento: ${error.message}`);
        }
    }

    // Método para eliminar un documento por su ID
    async delete(id) {
        try {
            const deletedDocument = await this.model.findByIdAndDelete(id);
            if (!deletedDocument) throw new Error(`${this.model.modelName} no encontrado`);
            return deletedDocument;
        } catch (error) {
            throw new Error(`Error al eliminar el documento: ${error.message}`);
        }
    }
}