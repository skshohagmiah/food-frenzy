'use client'
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";


const CreateMenu = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const session = useSession();

  async function CreateMenu(title,price, downloadURL) {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,price,img:downloadURL }),
    });
    if (response.ok) {
      toast.success("menu item created succesfully");
    }
    const data = await response.json();
    setPrice(' ')
    setTitle(' ')
    setFile("");
  }

  function handleImageUpload(e) {
    e.preventDefault()
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
          CreateMenu(title, price, downloadURL);
        });
      }
    );
  }

  if(session?.data?.user.role !== 'admin'){
    return  <h2 className="text-red-600 m-4 text-center font-bold text-2xl">This Page Is Only Available For Admin User</h2> 
  }



  return (
    <div>
       <div>
            <h2 className="text-3xl font-semibold m-2">Create A Menu</h2>
            <form onSubmit={handleImageUpload} action="" className="flex flex-col gap-2 m-2 md:w-[40rem]">
                <label htmlFor="title">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='name of product'/>

                <label htmlFor="price">Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder='price of produce' />

                <label htmlFor="image">Image:</label>
                <input type="file"   onChange={(e) => setFile(e.target.files[0])} />

                <input className="p-2 bg-orange-500 ring-0 text-gray-100 hover:text-gray-900 hover:bg-transparent hover:ring-2" type="submit" />
            </form>
      </div>
    </div>
  )
}

export default CreateMenu