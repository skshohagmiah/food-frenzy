import mongoose, { Schema } from "mongoose";


const orderSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    menuItem:[
        {
            type:Schema.Types.ObjectId,
            ref:"Menu",
            quantity:Number,
            required:true
        }
    ],
    isPaid:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['pending', 'preparing', 'shipping', 'delivered'],
        default:'pending'
    }
},{timestamps:true})

export const Order = mongoose.models.Menu || mongoose.model("Order", orderSchema);