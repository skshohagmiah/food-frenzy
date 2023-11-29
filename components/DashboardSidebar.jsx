'use client';
import Logout from '@/components/Logout';
import Link from 'next/link';
import { CgProfile } from "react-icons/cg";
import { FaHistory, FaUserFriends } from "react-icons/fa";

import { usePathname } from 'next/navigation';
import { MdOutlineRestaurantMenu } from "react-icons/md";

const DashboardSidebar = () => {

    const pathname = usePathname();

  return (
    <aside className=" border-r-2 p-2  flex flex-col gap-4 w-full md:max-w-[15rem] ">
    <Link href='/dashboard/profile' className={pathname === '/dashboard/profile' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <CgProfile /> Profile
    </Link>
    <Link href='/dashboard/orders' className={pathname === '/dashboard/orders' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <FaHistory /> Orders
    </Link>
    <Link href='/dashboard/createmenu' className={pathname === '/dashboard/createmenu' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <MdOutlineRestaurantMenu /> Create Menu
    </Link>
    <Link href='/dashboard/users' className={pathname === '/dashboard/users' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}s>
      <FaUserFriends />
      Users
    </Link>
    <Logout />
  </aside>
  )
}

export default DashboardSidebar