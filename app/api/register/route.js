import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/user";
import bcrypt from 'bcrypt';

export async function POST(req){
    const {username, email, password} = await req.json();
    try {
        await connectToDatabase()
        const existingUser = await User.findOne({email});
        if(existingUser){
            return Response.json({message:'user already exist with this email'},{status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({username,email,password:hashedPassword});
        return Response.json('User sign up succesfully', {status:200})


    } catch (error) {
        console.log(error)
        return Response.json(error,{status:500})
    }
}