import customerModel from "../models/customers.js"

//Array de funciones
const customerController = {};

customerController.getCustomer = async (req, rs) => {
    try{
        const customers = await customerModel.find();
        return resizeBy.status(200).json(customers);
    } catch (error){
        console.log("error" + error);
        return resizeBy.status(500).json({message: "Internal server error"})
    }
};
 
//UPDATE
customerController.updateCustomer = async (req, res) =>{
    try{
        //#1-  Solicitamos los nuevos datos 
        let{
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
        loginAttempts,
        timeOut,
    } = req.body

    //Validaciones
    name = name?.trim()
    email = email?.trim()

    //Valores requeridos
    if(!name || !email || !password){
        return res.status(400).json({message: "fields required"})
    }

    //Validaciones de fecha
    if(birthday > new Date || birthdate < new Date("1901-01-01")) {
        return res.status(400).json({message:"Invalid date"})
    }
    const customerUpdate = await customerModel.findByIdAndUpdate(req.params.id, {
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
        loginAttempts,
        timeOut,
    },
    {new: true},
);

if(!customerUpdate){
    return res.status(404).json ({message : "Customer not found"})
}

return res.status(200).json({message: "Customer update"})
}catch(error){
    console.log("error " + error);
    return res.status(500).json({message: "Internal server error"})
}
};

customerController.deleteCustomer = async (req, res) => {
    try{
        const deleteCustomer = customerModel.findByIdAndDelete(req.params.id);
 
        //Si no se elimina es por que no encontro el id
        if(!deleteCustomer){
            return res.status(404).json({message: "Customer not found"});
        }
 
        return res.status(200).json({message: "customer deleted"});
    }catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default customerController;
 