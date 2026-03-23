import express from "express";
import productsRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import employees from "./src/routes/employee.js";
import reviews from "./src/routes/reviews.js"
 
//crea una constante que guarde Express
const app = express();

//Que acepte los JSON desde postman
app.use(express.json())
 
app.use("/api/products", productsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employee", employees);
app.use("/api/reviews", reviews)

export default app;
 