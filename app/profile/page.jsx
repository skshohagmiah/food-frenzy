import ImageUpload from "@/components/ImageUpload";
import { authOptions } from "@/libs/AuthOptions";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { getUser } from "@/libs/getUser";
import { User } from "@/models/user";
import { revalidatePath } from 'next/navigation';

const fetchUser =async (email) => {
   await connectToDatabase()
   const currentUser = await User.findOne({email})
   return currentUser;
}


const Profile = async() => {
    const user = await getUser(authOptions);
    const currentUser =await fetchUser(user?.user?.email)
    const img = currentUser?.image || '';

    const handelSubmit = async(FormData) => {
        'use server'
        const {username,email,phone,street,postalCode,city,country} = Object.fromEntries(FormData)
        try {
            await User.updateOne({_id:currentUser?._id}, {name:username,email, image:img,phone,street,postalCode,city,country})
            revalidatePath('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section className="flex flex-col md:flex-row w-full md:items-start items-center md:w-fit  gap-4">
        <div className="flex items-center justify-center flex-col w-full">
            <ImageUpload />
        </div>
        <div className="w-full">
            <h2 className="text-3xl font-semibold m-2">User Information</h2>
            <form action={handelSubmit} className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username"  placeholder={currentUser?.name}/>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email"  placeholder={currentUser?.email}/>

                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="phone"   placeholder={currentUser?.phone}/>

                <label htmlFor="role">Role:</label>
                <input type="text" disabled placeholder={currentUser?.role}/>

                <label htmlFor="street">Street:</label>
                <input type="text" name='street'  placeholder={currentUser?.street}/>

                <label htmlFor="postalcode">Postal code:</label>
                <input type="number" name='postalCode' placeholder={currentUser?.postalCode}/>  

                <label htmlFor="city">City:</label>
                <input type="text" name='city'  placeholder={currentUser?.city}/>

                <label htmlFor="country">Country:</label>
                <input type="text" name='country'  placeholder={currentUser?.country}/>
                <input className="p-2 hover:ring-2 hover:bg-transparent hover:text-gray-900 transition-all rounded-md bg-orange-500 text-gray-100 ring-0" type="submit" value='Update' name="" id="" />
            </form>
        </div>
    </section>
  )
}

export default Profile