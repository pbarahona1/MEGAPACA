import express from "express";
import productsRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import employees from "./src/routes/employee.js";
import reviews from "./src/routes/reviews.js"
import customerRoutes from "./src/routes/customers.js";
import loginCustomerRoutes from "./src/routes/login.js"
import registerCustomer from "./src/routes/registerCustomer.js"
import cookieParser from "cookie-parser";
//crea una constante que guarde Express
const app = express();

app.use(cookieParser())
//Que acepte los JSON desde postman
app.use(express.json())
 
app.use("/api/products", productsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employee", employees);
app.use("/api/reviews", reviews);
app.use("/api/customers", customerRoutes);
app.use("/api/register", registerCustomer);
app.use("/api/login", loginCustomerRoutes);
export default app;
 