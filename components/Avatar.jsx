'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from './Modal';

const Avatar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState();
    const session = useSession();
    
    useEffect(() => {

      if(session){
        fetch(`/api/user/${session?.data?.user?.email}`).then(data => data.json()).then(user => setUser(user))
      }
    }, [session])

console.log(user)

  return (
    <div className='relative'>
    <div onClick={() => setOpen(!open)} className='relative w-[3rem] h-[3rem] cursor-pointer rounded-full ring-2 overflow-hidden object-cover'>
        <Image fill src={user?.image || '/avatar.png'} alt='user pic'/>
    </div>
    {open && <div><Modal setOpen={setOpen} /></div>}
    </div>
  )
}

export default Avatar