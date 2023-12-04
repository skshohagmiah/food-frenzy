"use client";
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateMenu = () => {
  const [menus, setMenus] = useState([]);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [categorySelect, setCategorySelect] = useState('');
  const [restaurantSelect, setRestaurantSelect] = useState('');
  const [categories, setCategories] = useState();
  const [restaurant, setRestaurant] = useState();
  const [price, setPrice] = useState();
  const session = useSession();
  const router = useRouter()

  useEffect(() => {
    try {
      fetch("/api/restaurant")
        .then((data) => data.json())
        .then((res) => setRestaurant(res));
    } catch (error) {
      console.log(error);
      toast.error("error white fetching restaurant");
    }
  }, []);

  useEffect(() => {
    try {
      fetch("/api/menu")
        .then((data) => data.json())
        .then((res) => setMenus(res));
    } catch (error) {
      console.log(error);
      toast.error("error white fetching menus");
    }
  }, []);

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

  async function CreateMenu(
    title,
    price,
    description,
    categorySelect,
    restaurantSelect,
    downloadURL
  ) {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description: description,
        category: categorySelect,
        restaurant: restaurantSelect,
        img: downloadURL,
      }),
    });
    if (response.ok) {
      toast.success("New menu created successfully");
      // Fetch categories again after adding new category
      fetch("/api/menu")
        .then((data) => data.json())
        .then((res) => setMenus(res));
    } else {
      toast.error("Error while fetching menus");
    }
    const data = await response.json();
  }

  function handleImageUpload(e) {
    e.preventDefault();
    toast.success("Your menu item is Being Created.");
    const storageRef = ref(storage, "menu/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          CreateMenu(
            title,
            price,
            description,
            categorySelect,
            restaurantSelect,
            downloadURL
          );
        });
      }
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold m-2">Create A Menu</h2>
        <form
          onSubmit={handleImageUpload}
          action=""
          className="flex flex-col gap-2 m-2 md:w-[40rem]"
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="name of product"
          />


          <label htmlFor="price">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="price of produce"
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price of produce"
          />

          <label htmlFor="image">Image:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="category">Select a Category:</label>
          <select
            name="category"
            id="category"
            className="bg-gray-200 p-2 rounded-md"
            value={categorySelect}
            onChange={(e) => setCategorySelect(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <label htmlFor="restaurant">Select a Restaurant:</label>
          <select
            name="restaurant"
            id="restaurant"
            className="bg-gray-200 p-2 rounded-md"
            value={restaurantSelect}
            onChange={(e) => setRestaurantSelect(e.target.value)}
          >
            <option value="" disabled>
              Select a restaurant
            </option>
            {restaurant?.map((res) => (
              <option key={res._id} value={res.name}>
                {res.name}
              </option>
            ))}
          </select>

          <input
            className="p-2 bg-orange-500 ring-0 text-gray-100 hover:text-gray-900 hover:bg-transparent hover:ring-2"
            type="submit"
          />
        </form>
      </div>
      <div>
        <h2 className="mt-6 text-center text-2xl p-2">All the Menus</h2>
        {menus?.map((menu) => (
          <div
            key={menu._id}
            className="flex items-center justify-between mb-2 border-b-2"
          >
            <Image src={menu?.img} alt="menu" width={100} height={100} />
            <h3>{menu.title}</h3>
            <p>${menu.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMenu;
