import express from "express";
 
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";
 
const router = express.Router();
 
router.route("/requestCode").post(recoveryPasswordController.requestcode);
router.route("/verifyCode").post(recoveryPasswordController.verifyCode);
router.route("/NewPassword").post(recoveryPasswordController.newPassword);
 
export default router;