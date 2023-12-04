"use client";
import { useCartContext } from "@/context/ContextPovider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import Avatar from "./Avatar";
import CategoryLink from "./CategoryLink";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { state } = useCartContext();
  return (
    <header
      className="flex items-center justify-between sticky bg-gray-50 top-0 w-full py-2"
      style={{ zIndex: "10" }}
    >
      <Link className="grow md:grow-0" href="/">
        <div className="logo font-semibold text-2xl md:text-3xl ">
          Food <span className="text-orange-400">Frenzy</span>
        </div>
      </Link>
      <div className=" gap-4 text-sm font-semibold hidden md:flex text-gray-700">
        <Link
          className={
            pathname === "/"
              ? "text-gray-950 underline"
              : "hover:text-gray-500 text-gray-600"
          }
          href="/"
        >
          Home
        </Link>
        <Link
          className={
            pathname === "/menu"
              ? "text-gray-950 underline"
              : "hover:text-gray-500 text-gray-600"
          }
          href="/menu"
        >
          Menu
        </Link>
        <Link
          className={
            pathname === "/restaurant"
              ? "text-gray-950 underline"
              : "hover:text-gray-500 text-gray-600"
          }
          href="/restaurant"
        >
          Restaurant
        </Link>
        <CategoryLink pathname={pathname} />
        <Link
          className={
            pathname === "/about"
              ? "text-gray-950 underline"
              : "hover:text-gray-500 text-gray-600"
          }
          href="/about"
        >
          About Us
        </Link>
        <Link
          className={
            pathname === "/contact"
              ? "text-gray-950 underline"
              : "hover:text-gray-500 text-gray-600"
          }
          href="/contact"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex gap-4 items-center mr-4 md:mr-0 ">
        {session ? (
          <Avatar />
        ) : (
          <Link
            href="/signin"
            className="hover:text-gray-300 px-4 py-2 font-semibold ring-2 rounded"
          >
            Sign In
          </Link>
        )}
        <Link
          href="/cart"
          className="relative bg-gray-900 p-2 text-gray-100 rounded-md  flex items-center justify-center  hover:text-gray-300 "
        >
          <FaCartPlus className=" text-2xl md:text-3xl" />
          <span
            className="absolute md:-right-0 md:top-0 -top-1 -right-2 text-[10px] md:text-xs bg-red-600
           w-5 h-5 flex items-center justify-center text-gray-100 rounded-full"
          >
            {state?.cart?.length}
          </span>
        </Link>
      </div>
      {/* mobile navbar */}
      <MobileNavbar />
    </header>
  );
};

export default Navbar;
