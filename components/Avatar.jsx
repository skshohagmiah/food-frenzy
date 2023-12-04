'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';

const Avatar = () => {
    const [open, setOpen] = useState(false);
    const user = useSession();


  return (
    <div className='relative'>
    <div onClick={() => setOpen(!open)} className='relative w-[3rem] h-[3rem] cursor-pointer rounded-full ring-2 overflow-hidden object-cover'>
        <Image fill src={user?.data?.user?.image || '/avatar.png'} alt='user pic'/>
    </div>
    {open && <div><Modal setOpen={setOpen} /></div>}
    </div>
  )
}

export default Avatar