//Creamos un array de funciones
const employeeController = {};

//Importa el Schema de la coleccion que voy a utilizar
import employeesModel from "../models/employees.js";

//SELECT
employeeController.getEmployees =  async(req, res) => {
    const employees = await employeesModel.find();
    res.json(employees);
}

//INSERT
employeeController.insertEmployee = async (req,res)=>{
    //1- Solicito los datos
    const {name, lastname, salary, DUI, phone, email, password, idBranches} = req.body;

    //2- Lleno mi modelo con los datos que acabo de pedir
    const newEmployee = new employeesModel({
        name,
        lastname,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranches,
    });

    //3- Guardo todo en la base de datos
    await newEmployee.save();

    res.json({message: "Employee saved"})
};

//ELIMINAR
employeeController.deleteEmployee = async (req, res) => {
    await employeesModel.findbyIdAndDelete(req.params.id);
    res.json({message: "Employee deleted"})
};

//ACTUALIZAR
employeeController.updateEmployee = async (req, res) => {
    const {name, lastname, salary, DUI, phone, email, password, idBranches} = req.body;
    await employeesModel.findByIdAndUpdate(
        req.params.id,
        {
        name,
        lastname,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranches,
        },
        {new: true },
    );
    res.json({message:"Employee updated"})
};

export default employeeController; 
