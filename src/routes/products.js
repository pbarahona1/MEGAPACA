import express from "express";
import products from "../models/products";

//router() nos ayuda a colocar los metodos
// que tendra el endpoint

const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts);

router.route("/:id")
.put(productsController.deleteProducts)
.delete(productsController.updateProducts);

export default router;

