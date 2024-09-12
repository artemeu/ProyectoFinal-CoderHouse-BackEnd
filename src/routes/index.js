import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import productRoutes from "./product.router.js";
import cartRoutes from "./cart.router.js";
import viewsRouter from "./views.router.js";
import userRoutes from "./user.router.js";

const app = Router();

app.use(ROUTE_PATH.api_products, productRoutes);
app.use(ROUTE_PATH.api_carts, cartRoutes);
app.use(ROUTE_PATH.view_products, viewsRouter);
app.use(ROUTE_PATH.api_sessions, userRoutes);

export default app