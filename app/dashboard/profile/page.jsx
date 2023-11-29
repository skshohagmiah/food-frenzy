import { authOptions } from "@/libs/AuthOptions";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { getUser } from "@/libs/getUser";
import { User } from "@/models/user";
import Image from 'next/image';

const fetchUser =async (email) => {
   await connectToDatabase()
   const currentUser = await User.findOne({email})
   return currentUser;
}


const Profile = async() => {
    const user = await getUser(authOptions);
    const currentUser =await fetchUser(user.user?.email)
    const img = currentUser?.img || '';

    const handelSubmit = async(FormData) => {
        'use server'
        const {username,email,phone,street,postalCode,city,country} = Object.fromEntries(FormData)
        try {
            await User.updateOne({_id:currentUser._id}, {username,email, img,phone,street,postalCode,city,country})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section className="flex flex-col md:flex-row w-full md:items-start items-center md:w-fit  gap-4">
        <div className="flex items-center justify-center flex-col">
            <Image className="rounded" src={currentUser?.img} alt="user pic" width={200} height={200}/>
            <button className="ring-2 p-2 m-2 rounded-md text-center">Change Image</button>
        </div>
        <div>
            <h2 className="text-3xl font-semibold m-2">User Information</h2>
            <form action={handelSubmit} className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={currentUser?.username} placeholder={currentUser?.username}/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={currentUser?.email} placeholder={currentUser?.email}/>

                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="phone" value={currentUser?.phone}  placeholder={currentUser?.phone}/>

                <label htmlFor="role">Role:</label>
                <input type="text" disabled placeholder={currentUser?.role}/>

                <label htmlFor="street">Street:</label>
                <input type="text" name='street' value={currentUser?.street} placeholder={currentUser?.street}/>

                <label htmlFor="postalcode">Postal code:</label>
                <input type="text" name='postalCode' value={currentUser?.postalCode} placeholder={currentUser?.postalCode}/>  

                <label htmlFor="city">City:</label>
                <input type="text" name='city' value={currentUser?.city} placeholder={currentUser?.city}/>

                <label htmlFor="country">Country:</label>
                <input type="text" name='country' value={currentUser?.country} placeholder={currentUser?.country}/>
                <input className="p-2 bg-orange-500" type="submit" value='Update' name="" id="" />
            </form>
        </div>
    </section>
  )
}

export default Profile