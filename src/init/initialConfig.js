import express from "express";
import dotenv from 'dotenv';
import router from '../routes/index.js';
import { create } from 'express-handlebars';
import { __dirname } from '../utils/utils.js';
import { connectToDB } from "../dao/connectDB/connection.js";
import cookieParser from "cookie-parser";
import initializePassport from "../passport/jwt.passport.js";
import passport from "passport";

export const AppInit = (app) => {
    dotenv.config();
    connectToDB();
    const hbs = create();

    // Configuración de Handlebars
    app.engine('handlebars', hbs.engine);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');

    // Configuracion de Passport
    app.use(cookieParser(process.env.SECRET))
    initializePassport();
    app.use(passport.initialize());

    // Configuración de Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));

    app.use('/', router);
}