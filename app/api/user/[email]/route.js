import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/user";


export async function GET(req,{params}){
    const {email} =await params;
    try {
        connectToDatabase()
        const user = await User.findOne({email})
        return Response.json(user, {status:200})
    } catch (error) {
        return Response.json({message:'getting single user error', error})
    }
}