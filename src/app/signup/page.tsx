'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    
    try {
      setLoading(true);
      const response = axios.post("/api/users/signup",user);
      console.log("Signup successful", response);
      router.push("/login")
      


    } catch (error: any) {
      console.log("Signup failed", error.message)
      toast.error(error.message)

    }
    finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  },[user])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}

            value={user.username}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder='Enter your name'
          />

        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder='example@gmail.com'
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder='Enter your password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

            required
          />

        </div>

        <button
          onClick={onSignup}
          className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">{buttonDisabled ? "No signup" : "Signup"}
        </button>

        <Link className='mt-4 text-center text-sm text-gray-400' href="/login">Visit login page</Link>
      </div>
    </div>
  )
}



