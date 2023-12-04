import { connectToDatabase } from "@/libs/connectToDatabase";
import { Category } from "@/models/category";


export async function GET(req){
    try {
        connectToDatabase();
        const category = await Category.find({})
        return Response.json(category,{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json('error while getting restaurant', {status:500})
    }
}




export async function POST(req){
    const {name} = await req.json();
    try {
        connectToDatabase();
        const category = await Category.create({
            name
        })
        return Response.json(category,{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json('error while creating category', {status:500})
    }
}


