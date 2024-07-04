import express from "express";
import productRoutes from "./routes/product.router.js"
import cartRoutes from "./routes/cart.router.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => {
    console.log("Servidor ON");
});
