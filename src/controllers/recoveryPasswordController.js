import jsonwebtoken from "jsonwebtoken" 

import bcrypt from "bcryptjs"

import crypto from "crypto"

import nodemailer from "nodemailer"

import HTMLRecoveryEmail from "../utils/sendMailRecovery.js"

import { config } from "../../config.js"

import customerModel from "../models/customers.js"
 
const recoveryPasswordController = {}
 
// 1. SOLICITAR CÓDIGO

recoveryPasswordController.requestcode = async (req, res) => {

    try {

        const { email } = req.body;

        const userFound = await customerModel.findOne({ email })
 
        if (!userFound) {

            return res.status(404).json({ message: "user not found" })

        }
 
        const randomCode = crypto.randomBytes(3).toString("hex")
 
        const token = jsonwebtoken.sign(

            { email, randomCode, userType: "customer", verified: false },

            config.JWT.secret,

            { expiresIn: "15m" }

        )
 
        // IMPORTANTE: Decidimos usar "recoveryCookie" (en singular)

        res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000, httpOnly: true })
 
        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: config.email.user_email,

                pass: config.email.user_password

            }

        })
 
        const mailOptions = {
    from: config.email.user_email,
    to: email,
    subject: "Codigo por recuperacion",
    text: `Hola ${userFound.name}, tu código es: ${randomCode}`, // Texto plano de respaldo
    html: HTMLRecoveryEmail(userFound.name, randomCode) // <--- PRIMERO el nombre, SEGUNDO el código
}
 
        transporter.sendMail(mailOptions, (err) => {

            if (err) console.log("Error enviando correo:", err);

        })
 
        return res.status(200).json({ message: "email sent" })

    } catch (err) {

        console.log("error " + err)

        return res.status(500).json({ message: "Internal server error" })

    }

}
 
// 2. VERIFICAR CÓDIGO

recoveryPasswordController.verifyCode = async (req, res) => {

    try {

        const { code } = req.body;

        // CORRECCIÓN: Antes decía recoveryCookies o recoveryCookie. Usamos "recoveryCookie".

        const token = req.cookies.recoveryCookie;
 
        if (!token) {

            return res.status(400).json({ message: "Token not found" });

        }
 
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
 
        if (code !== decoded.randomCode) {

            return res.status(400).json({ message: "Invalid code" })

        }
 
        const newToken = jsonwebtoken.sign(

            { email: decoded.email, userType: "customer", verified: true },

            config.JWT.secret,

            { expiresIn: "15m" },

        );
 
        // Volvemos a guardar como "recoveryCookie"

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000, httpOnly: true });
 
        return res.status(200).json({ message: "code verified successfully" })

    } catch (err) {

        console.log("error " + err)

        return res.status(500).json({ message: "Internal server error" })

    }

};
 
// 3. NUEVA CONTRASEÑA

recoveryPasswordController.newPassword = async (req, res) => {

    try {

        const { newPassword, confirmNewPassword } = req.body;
 
        if (newPassword !== confirmNewPassword) {

            return res.status(400).json({ message: "password doesnt match" })

        }
 
        // CORRECCIÓN: Antes decía req.cookie (en singular), debe ser req.cookies (con S)

        const token = req.cookies.recoveryCookie;
 
        if (!token) {

            return res.status(400).json({ message: "Session expired" });

        }
 
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
 
        if (!decoded.verified) {

            return res.status(400).json({ message: "code not verified" })

        }
 
        const passwordHash = await bcrypt.hash(newPassword, 10)
 
        await customerModel.findOneAndUpdate(

            { email: decoded.email },

            { password: passwordHash }

        );
 
        res.clearCookie("recoveryCookie");
 
        return res.status(200).json({ message: "password updated" })

    } catch (err) {

        console.log("error " + err)

        return res.status(500).json({ message: "Internal server error" })

    }

};
 
export default recoveryPasswordController;
 