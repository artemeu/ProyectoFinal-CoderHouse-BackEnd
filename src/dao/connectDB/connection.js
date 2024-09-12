import mongoose from "mongoose";

export const connectToDB = async () => {
    const mongoUri = process.env.MONGODB_URI;
    const nameBD = process.env.USE_DB;
    try {
        await mongoose.connect(mongoUri, { dbName: nameBD });
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}