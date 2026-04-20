import express from "express";
import productsRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import employees from "./src/routes/employee.js";
import reviews from "./src/routes/reviews.js"
import customerRoutes from "./src/routes/customers.js";
import loginCustomerRoutes from "./src/routes/login.js"
import registerCustomer from "./src/routes/registerCustomer.js"
import cookieParser from "cookie-parser";
import logoutRoutes from "./src/routes/logout.js";
import cors from "cors";
//crea una constante que guarde Express
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true,
}),
);
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
app.use("/api/logout", logoutRoutes);
export default app;
 