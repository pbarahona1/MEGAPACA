const branchesController = {};
 
import branchesModel from "../models/branches.js"
 
branchesController.getbranches = async (req, res) => {
    const branches = await branchesModel.find();
    res.json(branches)
};
 
branchesController.insertBranches = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
 
    const newBranch = branchesModel({name, address, schedule, isActive});
 
    await newBranch.save();
 
    res.json({message: "Branch saved"})
};
 
branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Branch deleted"})
}
 
branchesController.updateBranches = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
 
    await branchesModel.findByIdAndUpdate(req.params.id, {
        name,
        address,
        schedule,
        isActive
    },
    {new: true},
);
res.json({message: "Branch updated"})
 
 
};
 
export default branchesController
 
 
 