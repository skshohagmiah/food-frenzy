"use client";
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';



const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      const res =  await fetch('/api/register', {
            method:'POST',
            'Content-Type':"application/json",
            body:JSON.stringify({username,email,password})
        });
        if(res.ok){
            toast.success("Sign up succesfull")
        }
        if(!res.ok) {
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        toast.error('Somethin went wrong, try again')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" min-h-[30rem] w-[25rem] text-gray-100 bg-gray-700 p-4 rounded-md">
        <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
          <label htmlFor="name">Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="p-4 rounded-md bg-transparent ring-2"
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-4 rounded-md bg-transparent ring-2"
            type="email"
            name="email"
            id="email"
            required
            placeholder="example@gmail.com"
          />
          <label htmlFor="pass">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-4 rounded-md bg-transparent ring-2"
            type="password"
            name="password"
            id="pass"
            required
          />
          <button type="submit" className="p-4 bg-orange-600 my-2 rounded-md hover:bg-transparent hover:ring-1 hover:text-gray-100">
            Sign Up
          </button>
        </form>
        <p className="flex gap-4 items-center justify-center my-2">
          Already have an account ?
          <Link className="underline" href="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
