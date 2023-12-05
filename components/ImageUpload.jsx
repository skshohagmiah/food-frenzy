"use client";
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ImageUpload = () => {
  const [user, setUser] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [file, setFile] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((data) => data.json())
      .then((res) => {
        setUser(res);
        console.log(res);
      });
    console.log("hello");
  }, [session]);

  async function UpdateImage(id, downloadURL) {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, downloadURL }),
    });
    if (response.ok) {
      toast.success("profile Image updated succesfull");
    }
    const data = await response.json();
    setUser(data);
    setFile("");
  }

  function handleImageUpload() {
    toast.success("Your Profile Image is Being uploaded.");
    const storageRef = ref(storage, "images/" + file.name);
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
          UpdateImage(user?.user?._id, downloadURL);
        });
      }
    );
  }

  if (!session) {
    return <h1>loading ...</h1>;
  }

  return (
    <>
      <Image
        className="rounded"
        src={user?.user?.image}
        alt="user pic"
        width={300}
        height={300}
      />
      <input
        type="file"
        className="hidden"
        id="file"
        value=""
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file === "" ? (
        <label
          className="p-2 mt-2 hover:ring-2 hover:bg-transparent hover:text-gray-900 transition-all rounded-md bg-orange-500 text-gray-100"
          htmlFor="file"
        >
          Change Image
        </label>
      ) : (
        <button
          className="p-2 mt-2 hover:ring-2 hover:bg-transparent hover:text-gray-900 transition-all rounded-md bg-orange-500 text-gray-100"
          onClick={() => handleImageUpload()}
        >
          Save Image
        </button>
      )}
    </>
  );
};

export default ImageUpload;
