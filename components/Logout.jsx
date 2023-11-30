'use client';
import { signOut } from 'next-auth/react';
import { IoIosLogOut } from "react-icons/io";


const Logout = () => {
  return (
    <button onClick={() => signOut({callbackUrl:'/'})} className="flex text-xl items-center gap-2 hover:opacity-50 bg-red-500 justify-center text-gray-100 p-2 mt-auto rounded">
    <IoIosLogOut /> Logout
  </button>
  )
}

export default Logout