import mongoose, { model, models } from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    road:String,
    city:String,
    country:String,
})

export const Restaurant = models.Restaurant || model('Restaurant', restaurantSchema);