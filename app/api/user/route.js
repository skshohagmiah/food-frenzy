import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/user";

export async function POST(req){
    const {email} = await req.json();
    try {
        connectToDatabase()
        const user = await User.findOne({email});
        return Response.json({user},{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({"message":"error getting user"},{status:500})
    }
}


export async function PUT(req){
    const {id,downloadURL} = await req.json();
    try {
        connectToDatabase()
        const user = await User.findByIdAndUpdate({_id:id},{img:downloadURL},{new:true});
        return Response.json({user},{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({"message":"error getting user"},{status:500})
    }
}