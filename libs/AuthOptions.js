import { User } from "@/models/user";
import bcrypt from "bcrypt";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from "./connectToDatabase";

export const authOptions = {
  pages:{
    signIn:"/signin"
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      id:"credentials",
      session:{
        strategy:'jwt',
      },
      secret:process.env.NEXTAUTH_SECRET,
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDatabase();
          const existingUser = await User.findOne({ email });

          const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser?.password
          );

          if (isPasswordMatch) {
            return existingUser;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks:{
    async signIn({user, account}){
      if(account.provider === 'credentials'){
        return true;
      }

      if(account.provider === 'google'){
        await connectToDatabase()
        const userExist = await User.findOne({email:user?.email});
        if(userExist){
          return true
        }
        await User.create({username:user?.name,email:user?.email, img:user?.image})
        return true
      }
    }
  }
};
