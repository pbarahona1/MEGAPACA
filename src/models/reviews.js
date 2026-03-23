import mongoose, { Schema, model } from "mongoose";

const reviewsSchema = new Schema({
    rating:{
        type: Number,
    },
    comment:{
        type: String,
    },
    idEmployee:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    },
    idProfucts:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "products"
    }
}, {
    timestamps: true,
    strict: false
},
);

export default model("Reviews", reviewsSchema)