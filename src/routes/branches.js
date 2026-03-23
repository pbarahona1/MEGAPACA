import express from "express";
import branchesController from "../controllers/branches.js";
 
const router = express.Router();
 
router.route("/")
.get(branchesController.getbranches)
.post(branchesController.insertBranches);
 
router
.route("/:id")
.put(branchesController.updateBranches)
.delete(branchesController.deleteBranches);
 
export default router;