'use client'
import Link from 'next/link';
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const MobileNavbar = () => {
    const [open, setOpen] = useState(false)


  return (
    <div className='md:hidden'>
        {open ? (
          <div onClick={() => setOpen(false)}>
          <RxCross2 size={25} />
          </div>
        ) : (
        <div onClick={() => setOpen(true)}>
        <FaBars size={25}/>
        </div>
        )}
        {open && (
            <div className='flex items-start mt-8 justify-center w-screen min-h-screen absolute top-10 right-0' style={{zIndex:'99'}}>
            <div className='flex items-center justify-center flex-col gap-4 font-semibold bg-gray-900 text-gray-100 w-full min-h-screen'>
                <Link className='hover:text-gray-300' onClick={() => setOpen(false)} href='/'>Home</Link>
                <Link className='hover:text-gray-300'  onClick={() => setOpen(false)} href='/menu'>Menu</Link>
                <Link className='hover:text-gray-300'  onClick={() => setOpen(false)} href='/about'>About Us</Link>
                <Link className='hover:text-gray-300'  onClick={() => setOpen(false)} href='/contact'>Contact Us</Link>
            </div>
            </div>       
        )}
    </div>
  )
}

export default MobileNavbar