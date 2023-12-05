'use client'
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const RestaurantPage = () => {
const [restaurant, setRestaurant] = useState([]);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [road, setRoad] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const session = useSession();
  const router = useRouter();

  async function createRestaurant(name,description,road,city,country, downloadURL) {
    const response = await fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,description,road,city,country,image:downloadURL }),
    });
    if (response.ok) {
      toast.success("New restaurant created successfully");
      // Fetch categories again after adding new category
      fetch("/api/restaurant")
        .then((data) => data.json())
        .then((res) => setRestaurant(res));
    } else {
      toast.error("Error while fetching restaurant");
    }
  }

  function handleImageUpload(e) {
    e.preventDefault()
    toast.success("Your Restaurant is Being Created.");
    const storageRef = ref(storage, "restaurant/" + file.name);
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
          createRestaurant(name, description,road,city,country, downloadURL);
        });
      }
    );
  }

  useEffect(() => {
    try {
        fetch('/api/restaurant').then((data) => data.json()).then(res => setRestaurant(res))
    } catch (error) {
        console.log(error)
        toast.error("error white fetching restaurant")
    }

  },[])

  return (
    <div>
       <div>
            <h2 className="text-3xl font-semibold m-2">Create A New Restaurant</h2>
            <form onSubmit={handleImageUpload} action="" className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="title">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='name of product'/>

                <label htmlFor="price">Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}  placeholder='price of produce' />

                <label htmlFor="price">Road No:</label>
                <input type="text" value={road} onChange={(e) => setRoad(e.target.value)}  placeholder='price of produce' />

                <label htmlFor="price">City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  placeholder='price of produce' />

                <label htmlFor="price">country:</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}  placeholder='price of produce' />

                <label htmlFor="image">Image:</label>
                <input type="file"   onChange={(e) => setFile(e.target.files[0])} />

                <input className="p-2 bg-orange-500 ring-0 text-gray-100 hover:text-gray-900 hover:bg-transparent hover:ring-2" type="submit" />
            </form>
      </div>
      <h2 className="text-2xl font-bold text-center border-t-2 mt-6">All Your Restaurant</h2>
      <div className="flex flex-col gap-4 items-center">
        {restaurant?.map((res) => (
            <div key={res._id} className="flex items-center gap-2 justify-between w-full">
                <Image  src={res?.image} className="rounded-full" alt="restaurant image" width={100} height={100}/>
                <h3>{res.name}</h3>
                <p>{res.description.slice(0,100)}...</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantPage