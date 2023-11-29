import mongoose from "mongoose";


const menuSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);