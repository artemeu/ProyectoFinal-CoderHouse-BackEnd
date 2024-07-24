import { Server } from 'socket.io';
import ProductManager from '../Class/productManager.js';
import { __dirname } from './utils.js';

const productManager = new ProductManager(`${__dirname}/data/products.json`);

// Función para emitir productos a todos los clientes
async function emitProducts(io) {
    try {
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    } catch (error) {
        console.error('Error al emitir productos:', error);
    }
}

// Función para emitir productos a un cliente
async function socketProducts(socket) {
    try {
        const products = await productManager.getProducts();
        socket.emit('getProducts', products);
    } catch (error) {
        console.error('Error al emitir productos:', error);
    }
}

// Función principal para configurar WebSocket
function webSocket(httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        // Enviar la lista de productos a los nuevos clientes que lo soliciten
        socket.on('requestProducts', () => {
            socketProducts(socket);
        });

        // Enviar la lista de productos a todos los clientes en tiempo real
        emitProducts(io);

        // Añadir un nuevo producto
        socket.on('addProduct', async (productData) => {
            try {
                await productManager.addProduct(productData);
                emitProducts(io);
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });

        // Eliminar un producto
        socket.on('deleteProduct', async (productId) => {
            try {
                await productManager.deleteProduct(Number(productId));
                emitProducts(io);
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });

    return io;
}

export default webSocket;
