
import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/user";
import Image from 'next/image';

const fetchUser =async () => {
   await connectToDatabase()
   const users = await User.find({})
   return users;
}

const UserPage = async() => {

  const users = await fetchUser();


  return <div className="p-4 text-center w-full">
    <h2 className="text-2xl font-bold m-2">All Your Users</h2>
    <div className="w-full">
      <div className=" flex items-center gap-4 w-full">
        {users?.map(user => (
          <div key={user._id} className="flex items-center justify-between w-full border-2 p-2 rounded-md">
            <Image src={user?.img} alt="user pic" width={100} height={100} />
            <h3>{user?.username}</h3>
            <p>{user?.email}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default UserPage