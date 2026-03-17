import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017megapacaDB")

//comprobar que todo funciona
const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB is connected")
})

connection.on("disconnected", (error) =>{
    console.log("DB is disconnected" + error)
})

connection.on("error", (error)=>{
    console.log("error found" + error)
})
