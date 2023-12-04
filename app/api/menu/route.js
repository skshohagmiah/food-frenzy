
import { connectToDatabase } from "@/libs/connectToDatabase";
import { Category } from "@/models/category";
import { Menu } from "@/models/menu";
import { Restaurant } from "@/models/restaurant";


export async function GET(req){
    try {
        connectToDatabase();
        const menu = await Menu.find({})
        return Response.json(menu,{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json('error while getting menu', {status:500})
    }
}



export async function POST(req){
    const {title,img,price,description,category,restaurant} = await req.json();
    try {
        connectToDatabase();
        const cat =await Category.findOne({name:category})
        const res = await Restaurant.findOne({name:restaurant})
        const menu = await Menu.create({
            title,
            img,
            price,
            description,
            category:cat._id,
            restaurant:res._id,
        });
        return Response.json(menu,{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({'message':"error creating menu"}, {status:500})
    }
}