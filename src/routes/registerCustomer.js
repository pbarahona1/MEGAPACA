import express from "express";
import registrerCustomer from "../controllers/registrerCustomer.js"

const router = express.Router();

router.route("/").post(registrerCustomer.register);
router.route("/verifyCodeEmail").post(registrerCustomer.verifycode);

export default router;