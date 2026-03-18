import express from "express";
import productsController  from "../controllers/productsController.js";
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

