import express from "express";
 
//crea una constante que guarde Express
const app = express();

//Que acepte los JSON desde postman
app.use(express.json())
 
app.use("/api/products")

export default app;
 