import { authOptions } from "@/libs/AuthOptions";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { getUser } from "@/libs/getUser";
import { User } from "@/models/user";

const fetchUser =async (email) => {
   await connectToDatabase()
   const currentUser = await User.findOne({email})
   return currentUser;
}


const CreateMenu = async() => {

  const user = await getUser(authOptions);
  const currentUser =await fetchUser(user.user?.email)

  return (
    <div>
       <div>
            <h2 className="text-3xl font-semibold m-2">Create A Menu</h2>
            <form action="" className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder={currentUser?.username}/>

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder={currentUser?.email}/>

                <label htmlFor="phone">Phone:</label>
                <input type="phone" placeholder={currentUser?.phone}/>

                <label htmlFor="role">Role:</label>
                <input type="text" placeholder={currentUser?.role}/>

                <label htmlFor="street">Street:</label>
                <input type="text" placeholder={currentUser?.street}/>

                <label htmlFor="postalcode">Postal code:</label>
                <input type="text" placeholder={currentUser?.postalCode}/>  

                <label htmlFor="city">City:</label>
                <input type="text" placeholder={currentUser?.city}/>

                <label htmlFor="country">Country:</label>
                <input type="text" placeholder={currentUser?.country}/>
                <input type="submit" name="" id="" />
            </form>
        </div>
    </div>
  )
}

export default CreateMenu