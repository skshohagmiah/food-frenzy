'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const CategoryPage = () => {
const [category, setCategory] = useState([]);
  const [name, setName] = useState();
  const router = useRouter();


  async function createCategory(e,name) {
    e.preventDefault()
    const response = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name}),
    });
    if (response.ok) {
      toast.success("New category created successfully");
      // Fetch categories again after adding new category
      fetch("/api/category")
        .then((data) => data.json())
        .then((res) => setCategory(res));
    } else {
      toast.error("Error while fetching categories");
    }
    const data = await response.json();
    setName(' ')
  }

  useEffect(() => {
    try {
        fetch('/api/category').then((data) => data.json()).then(res => setCategory(res))
    } catch (error) {
        console.log(error)
        toast.error("error white fetching category")
    }

  },[])

  return (
    <div>
       <div>
            <h2 className="text-3xl font-semibold m-2">Create A New Category</h2>
            <form onSubmit={(e) => createCategory(e,name)} action="" className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="title">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='name of product'/>

                <input className="p-2 bg-orange-500 ring-0 text-gray-100 hover:text-gray-900 hover:bg-transparent hover:ring-2" type="submit" />
            </form>
      </div>
      <h2 className="text-2xl font-bold text-center border-t-2 mt-6">All Your Categories</h2>
      <div className="flex flex-col gap-4 items-center">
        {category?.map((res) => (
            <div key={res._id} className="flex items-center justify-between w-full">
                <h3 className="text-xl p-4 rounded-md bottom-2 text-center w-full">{res.name}</h3>
            </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage