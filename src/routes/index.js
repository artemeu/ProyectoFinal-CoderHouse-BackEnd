import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import CartRouter from "./cart.route.js";
import ProductRouter from "./product.route.js";
import UserRouter from "./user.route.js";
import ViewsRouter from "./views.route.js";
import TicketRouter from "./ticket.route.js"

const app = Router();

app.use(ROUTE_PATH.api_products, ProductRouter);
app.use(ROUTE_PATH.api_carts, CartRouter);
app.use(ROUTE_PATH.api_tickets, TicketRouter);
app.use(ROUTE_PATH.view_products, ViewsRouter);
app.use(ROUTE_PATH.api_sessions, UserRouter);
app.use('*', (req, res) => {
    res.status(404).json({ status: 'not found', error: { message: 'El endpoint solicitado no existe.' } });
});

export default app