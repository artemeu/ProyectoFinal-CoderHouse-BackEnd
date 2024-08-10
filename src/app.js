import express from "express";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from 'express-handlebars';
import { __dirname } from './utils/utils.js';
import webSocket from "./utils/websocket.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuración de Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log('Listo el server http');
});

async function connectToDB() {
    try {
        await mongoose.connect(mongoUri, { dbName: 'ecommerce' });
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

connectToDB();
webSocket(httpServer);
