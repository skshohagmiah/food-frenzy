import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";


const CategoryLink = ({ pathname,color }) => {
    const [categories, setCategories] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try {
          fetch("/api/category")
            .then((data) => data.json())
            .then((res) => setCategories(res));
        } catch (error) {
          console.log(error);
          toast.error("error white fetching categories");
        }
      }, []);
    

  return (
    <div class="relative">
      <Link
        className={
          pathname === '/categories'
            ? 'md:text-gray-950 underline'
            :`hover:text-gray-500 group ${color}`
        }
        href="/categories"
      >
        <div class="relative  flex gap-1 items-center" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          Categories
          <IoIosArrowDropdown />
       {isOpen && (
           <ul
           class="absolute z-10  top-5  dropdown-menu bg-white border border-gray-300 rounded-md shadow-lg p-4" onMouseLeave={() => setIsOpen(false)}
         >
        {categories?.map((cat) => (
            <Link key={cat._id} href={`/categories/${cat?._id}`} className={pathname === `/categories/${cat?._id}` && 'text-gray-900 underline h-full '}>
                {cat?.name}
                <br />
            </Link>
        ))}
         </ul>
       )}
        </div>
      </Link>
    </div>
  );
};

export default CategoryLink;
