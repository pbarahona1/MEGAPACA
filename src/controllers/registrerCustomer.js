import nodemailer from "nodemailer"; // Enviar correo
import crypto from "crypto"; //Generar codigo aleatorio
import jsonwebtoken from "jsonwebtoken";// Token
import bcryptjs from "bcryptjs"; //Encriptar
 
import customerModel from "../models/customers.js";
import { config } from "../../config.js";
import { error, info } from "console";
 
//array de funciones
const registerCustomerController = {};
 
registerCustomerController.register = async (req, res) =>{
   
//#1. -Solicitar los datos
const {
    name,
    lastName,
    birtdate,
    email,
    password,
    isVerified,
} = req.body;
 
try {
 
    //Validar que el correo no exista en la base de datos
    const existsCustomer = await customerModel.findOne({email});
    if(existsCustomer){
        return res.status(400).json({message: "Customer already exists"})
    }
 
    //Encriptar la contraseña
    const passwordHashed = await bcryptjs.hash(password, 10)
 
    //generar un codigo aleatorio
    const randomNumber = crypto.randomBytes(3).toString("hex")
 
    //Guardamos en un token la informacion
    const token = jsonwebtoken.sign(
        //#1. ¿Que vamos a guardar?
        {randomNumber,
        name,
        lastName,
        birtdate,
        email,
        password: passwordHashed,
        isVerified,
        },

        //#2 Secret Key
        config.JWT.secret,
        //#3- cuando expira
        {expiresIn: "15m"}
    );
    console.log("este es mi token" + token)
    res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})
 
    //Enviamos el codigo aleatorio por correo electronico
    //#1- Transporte -> quien envia el correo
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: config.email.user_email,
            pass: config.email.user_password
        }
    })

    //#2- mailOption -> ¿Quien lo recibe y como?
    const mailOption ={
        from: config.email.user_email,
        to: email,
        subject: "verificacion de cuenta",
        text: "para verificar tu cuenta utiliza este codigo:"
        + randomNumber + "expira en 15 min"
    }

    transporter.sendMail(mailOption, (error, info) => {
        if(error){
            console.log("error "+error)
            return res.status(500).json({message: "Error sending email"})
        }
        return res.status(200).json({message: "Email sent"})
    })
 
}catch (error){
   console.log("error"+error)
   return res.status(500).json({message: "Internal Several error"})
}
};
 
//Verificar el codigo que acabamos de enviar
registerCustomerController.verifycode = async (req, res) => {
    try{
        //Solicitamos el código que escribieron en el frontend
        const {verificationCodeRequest } = req.body

        //Obtener el token de las cookies
        const token = req.cookies.registrationCookie

        //Extraer toda la informacion del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomNumber: storedCode,
            name,
            lastName,
            birthdate,
            email,
            password,
        } = decoded;

        //Comparar lo que el usuario escribio con el codigo que esta en el token
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        //Si todo esta bien, y el usuario escribe el codigo, lo registramos en la base de datos
        const NewCustomer = new customerModel({
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified: true,
        });

        await NewCustomer.save();

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Customer registered"});
    } catch(error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerCustomerController;