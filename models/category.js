import mongoose, { model, models } from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
})

export const Category = models.Category || model('Category', categorySchema);