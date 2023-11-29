'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCartPlus } from "react-icons/fa";
import MobileNavbar from './MobileNavbar';


const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname)
  const {data:session} = useSession();
  return (
    <header className='flex items-center justify-between sticky bg-gray-50 top-0 w-full py-2' style={{zIndex:'10'}}>
       <Link className='grow md:grow-0' href='/'>
       <div className="logo font-semibold text-2xl md:text-3xl ">Food <span className="text-orange-400">Frenzy</span>
        </div>
       </Link>
        <div className=' gap-8 font-semibold hidden md:flex text-gray-700'>
            <Link className={pathname ==='/' ?"text-gray-950 underline" : "hover:text-gray-500 text-gray-700"} href='/'>Home</Link>
            <Link className={pathname ==='/menu' ?"text-gray-950 underline" : "hover:text-gray-500 text-gray-700"} href='/menu'>Menu</Link>
            <Link className={pathname ==='/about' ?"text-gray-950 underline" : "hover:text-gray-500 text-gray-700"} href='/about'>About Us</Link>
            <Link className={pathname ==='/contact' ?"text-gray-950 underline" : "hover:text-gray-500 text-gray-700"} href='/contact'>Contact Us</Link>
        </div>
        <div className='flex gap-4 items-center mr-4 md:mr-0 '>
           {session ?(
             <Link href='/dashboard' className='flex gap-2 items-center hover:text-gray-300 p-1 md:px-4 md:py-2 font-semibold ring-2 rounded'>Dashboard</Link>
           ):(
            <Link href='/signin' className='hover:text-gray-300 px-4 py-2 font-semibold ring-2 rounded'>Sign In</Link>
           )}
            <Link href='/card' className='relative hover:text-gray-300'>
            <FaCartPlus  className=' text-2xl md:text-3xl'/>
            <span className='absolute md:-right-3 md:-top-2 -top-1 -right-1 text-[8px] md:text-xs bg-red-600
            md:w-5 md:h-5 flex items-center justify-center text-gray-100 rounded-full ' >12</span>
            </Link>
        </div>
        {/* mobile navbar */}
        <MobileNavbar />
    </header>
  )
}

export default Navbar