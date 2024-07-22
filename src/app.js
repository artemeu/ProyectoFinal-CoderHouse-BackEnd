import express from "express";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import handlebars from 'express-handlebars';
import { __dirname } from './utils/utils.js';
import webSocket from "./utils/websocket.js";

const app = express();
const PORT = 8080;

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

const httpServer = app.listen(PORT, () => {
    console.log('Listo el server http');
});

// Configuración de Socket.io
webSocket(httpServer); 