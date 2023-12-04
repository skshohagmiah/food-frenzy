import mongoose, { Schema } from "mongoose";


const menuSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
    img:{
        type:String,
        required:true,
    },
    restaurant:{
        type:Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
},{timestamps:true})

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);