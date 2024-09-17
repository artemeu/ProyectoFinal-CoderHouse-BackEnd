import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import CartRouter from "./cart.route.js";
import ProductRouter from "./product.route.js";
import UserRouter from "./user.route.js";
import ViewsRouter from "./views.route.js";

const app = Router();

app.use(ROUTE_PATH.api_products, ProductRouter);
app.use(ROUTE_PATH.api_carts, CartRouter);
app.use(ROUTE_PATH.view_products, ViewsRouter);
app.use(ROUTE_PATH.api_sessions, UserRouter);

export default app