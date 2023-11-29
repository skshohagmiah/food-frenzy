
import { authOptions } from "@/libs/AuthOptions";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { getUser } from "@/libs/getUser";
import { User } from "@/models/user";

const fetchUser =async (email) => {
   await connectToDatabase()
   const currentUser = await User.findOne({email})
   return currentUser;
}

const UserPage = async() => {

  const user = await getUser(authOptions);
  const currentUser =await fetchUser(user.user?.email)


  if(currentUser?.role !== 'admin'){
    return <h2 className="text-red-600 m-4 text-center font-bold text-2xl">This Page Is Only Available For Admin User</h2> 
  }

  return <div>users</div>
}

export default UserPage