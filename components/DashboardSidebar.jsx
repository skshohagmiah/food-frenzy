'use client';
import Logout from '@/components/Logout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHistory, FaUserFriends } from "react-icons/fa";
import { IoIosRestaurant } from "react-icons/io";
import { MdCategory, MdOutlineRestaurantMenu } from "react-icons/md";

const DashboardSidebar = () => {

    const pathname = usePathname();

  return (
    <aside className=" border-r-2 p-2  flex flex-col gap-4 w-full md:max-w-[15rem] ">
    <Link href='/dashboard/orders' className={pathname === '/dashboard/orders' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <FaHistory /> Orders
    </Link>
    <Link href='/dashboard/createmenu' className={pathname === '/dashboard/createmenu' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <MdOutlineRestaurantMenu /> Create Menu
    </Link>
    <Link href='/dashboard/restaurant' className={pathname === '/dashboard/restaurant' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <IoIosRestaurant /> Restaurant
    </Link>
    <Link href='/dashboard/categories' className={pathname === '/dashboard/categories' ? 'flex text-xl items-center gap-2 underline text-gray-500 hover:opacity-50  p-2 rounded':'flex text-xl items-center gap-2 hover:opacity-50  p-2 rounded'}>
      <MdCategory /> Categories
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