import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

const Modal = ({setOpen}) => {
  const session = useSession();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div ref={modalRef} className="p-2 shadow-md flex flex-col gap-4 absolute top-16 w-[15rem] min-h-[20rem] bg-gray-300 rounded-md md:right-0 -right-12">
      <div className="flex flex-col text-2xl items-center justify-center">
        hello,
        <Image
          className="rounded-full ring-2 text-center overflow-hidden"
          src={session?.data?.user?.image}
          alt="pic"
          width={100}
          height={100}
        />
        <p className="text-xs">{session?.data?.user?.name}</p>
        <p className="text-xs">{session?.data?.user?.email}</p>
      </div>
      <Link href="/profile" className="flex items-center gap-4 text-sm justify-center mt-4 hover:opacity-50">
        <ImProfile />
        Update Profile
      </Link>
      <Link href="/orders" className="flex items-center gap-4 text-sm justify-center hover:opacity-50">
        <FaCreditCard />
        Your Orders
      </Link>
      <Link href="/dashboard" className="flex items-center gap-4 text-sm justify-center hover:opacity-50">
        <MdDashboard />
        Dashboard
      </Link>
      <button onClick={() => signOut()} className="mt-auto bg-red-600 p-2 rounded-md flex items-center justify-center gap-4 text-gray-100 hover:ring-2 hover:bg-transparent hover:text-gray-900"><IoIosLogOut />Logout</button>
    </div>
  );
};

export default Modal;
