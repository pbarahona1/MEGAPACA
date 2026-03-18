import express from "express";
import productsRoutes from "./src/routes/products.js"
 
//crea una constante que guarde Express
const app = express();

//Que acepte los JSON desde postman
app.use(express.json())
 
app.use("/api/products", productsRoutes)

export default app;
 