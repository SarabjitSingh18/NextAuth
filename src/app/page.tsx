import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div className="">

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Welcome to Our App</h1>
        <nav className="space-y-4">
          <Link href="/profile" className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-center text-lg font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Profile
          </Link>
        </nav>
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Experience the power of our application. Your journey starts here!
          </p>
          <p className="text-gray-300 text-base">
            Explore your profile to see all the amazing features we offer.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
