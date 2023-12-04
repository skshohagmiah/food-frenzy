import { connectToDatabase } from "@/libs/connectToDatabase";
import { Restaurant } from "@/models/restaurant";


export async function GET(req){
    try {
        connectToDatabase();
        const restaurant = await Restaurant.find({})
        return Response.json(restaurant,{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json('error while getting restaurant', {status:500})
    }
}




export async function POST(req){
    const {name, description, image,road,city,country} = await req.json();
    try {
        connectToDatabase();
        const restaurant = await Restaurant.create({
            name, description,image,road,city,country
        })
        return Response.json(restaurant,{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json('error while creating restaurant', {status:500})
    }
}


