import express from "express";
import { AppInit } from "./init/initialConfig.js";
import webSocket from "./utils/websocket.js";

const app = express();

AppInit(app);

const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
    console.log('Listo el server http');
});

webSocket(httpServer);