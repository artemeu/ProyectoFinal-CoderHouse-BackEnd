import mongoose from "mongoose";

export default class ConnectToDB {
    static #instance = null;

    constructor() {
    }

    static async getInstance() {
        // Verificar si ya existe una instancia
        if (this.#instance) {
            console.log('Conexión ya existente.');
            return this.#instance;
        }
        const mongoUri = process.env.MONGODB_URI;
        const nameBD = process.env.USE_DB;
        try {
            // Establecer la conexión a la base de datos
            this.#instance = await mongoose.connect(mongoUri, { dbName: nameBD });
            console.log('Conexión exitosa a la base de datos');
            return this.#instance;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            process.exit(1);
        }
    }
}
