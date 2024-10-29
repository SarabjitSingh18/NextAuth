'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

 export default function ProfilePage() {
  const router = useRouter()
  const handleLogout = () => {
    router.push('/login')
  }
  const [user, setUser] = useState("nothing")
  const getUserDetails = async () => {
    try {
        const res = await axios.get('/api/users/me');
        if (res.data && res.data.data) {
            setUser(res.data.data);
            console.log(res.data.data)
        } else {
            console.error("Unexpected API response:", res);
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};


  useEffect(()=>{
    getUserDetails()
  },[])

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Your Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <p className="mt-1 text-white">{user?.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-white">{user?.email}</p>
          </div>
          <h2 className="p-1 rounded bg-green-500">{user === 'nothing' ? "Nothing" : <Link className='hover:underline ' href={`/profile/${user?._id}`}>Visit Profile {user?._id}
          </Link>}</h2>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}


