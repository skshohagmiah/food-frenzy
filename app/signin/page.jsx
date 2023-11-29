"use client";
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", { email, password, redirect:false});
      if(res.ok){
        router.replace('/')
      }
      if(res.error){
        throw new Error()
      }
    } catch (error) {
      toast.error("email or password incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" min-h-[30rem] w-[25rem] text-gray-100 bg-gray-700 p-4 rounded-md">
        <h2 className="text-2xl text-center font-semibold">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-md bg-transparent ring-2"
            type="email"
            name="email"
            id="email"
            required
            placeholder="example@gmail.com"
          />
          <label htmlFor="pass">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-md bg-transparent ring-2"
            type="password"
            name="password"
            id="pass"
          />
          <button
            type="submit"
            className="p-4 bg-orange-600 my-2 rounded-md hover:bg-transparent hover:ring-1 hover:text-gray-100"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-2xl m-2">Or</p>
        <div className="flex items-center gap-8 ring-2 justify-center text-xl p-2 rounded-md hover:opacity-50" onClick={() => signIn('google',{callbackUrl:'/'})}>
          <Image src="/google.png" alt="google logo" width={50} height={50} />
          <button>Sign In With Google</button>
        </div>

        <p className="flex gap-4 items-center justify-center my-2">
          Don't have an account ?
          <Link className="underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
