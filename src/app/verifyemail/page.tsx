'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';



export default function VerifyEmail() {

    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [isResending, setResending] = useState(false);
    const verifyUserEmail = async () => {
        setResending(true)
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
        finally {
            setResending(false)
        }

    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

    }, []);

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">Verify Your Email</h2>
                <p className="text-gray-300 mb-6">
                    We've sent a verification email to your registered email address. Please check your inbox and click on the verification link to complete your registration.
                </p>
                <div className="mb-6">
                    <button
                        onClick={verifyUserEmail}
                        disabled={isResending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isResending ? 'Resending...' : 'Resend Verification Email'}
                    </button>
                </div>
                {verified && (
                    <div>
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/login">
                            Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 p-2 rounded-md   text-white">Error</h2>

                    </div>
                )}


                <button
                    onClick={() => router.push('/signup')}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 underline"
                >
                    Return to Sign Up
                </button>
            </div>
        </div>
    )
}


