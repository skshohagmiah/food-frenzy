import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },
    street:String,
    city:String,
    postalcode:String,
    country:String,
    phone:Number,
},{timestamps:true})

export const User = mongoose.models.User || mongoose.model("User", userSchema) 