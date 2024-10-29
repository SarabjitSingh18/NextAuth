'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import {  useEffect, useState } from "react"

export default function UserProfile({params}:any){

    const router = useRouter()
    const [user, setUser] = useState("nothing")
    const getUserDetails = async () => {
        try {
            const res = await axios.get(`/api/users/me`)
            if (res.data && res.data.data) {
                setUser(res.data.data)
                console.log(res.data.data)
            } else {
                console.error("Unexpected API response:", res)
            }
        } catch (error:any) {
            console.error("Error fetching user details:", error)
        }
    }


    
    useEffect(() => {
        getUserDetails()
    }, [])


    const handleLogout = () => {
        router.push('/login')
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.username}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-300">User ID: {user?._id}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log Out
          </button>
        </div>
      </div>
    )


}