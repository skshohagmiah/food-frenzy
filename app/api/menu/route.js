
import { connectToDatabase } from "@/libs/connectToDatabase";
import { Menu } from "@/models/menu";

export async function POST(req){
    const {title,img,price} = await req.json();
    try {
        connectToDatabase();
        const menu = await Menu.create({title,img,price});
        return Response.json({menu},{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({'message':"error creating menu"}, {status:500})
    }
}