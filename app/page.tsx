import Link from "next/link";
import Navbarmain from "./Navbar/page";
import { db } from "@/lib/db";

export default function Home() {
  // const users = await db.user.findMany();
  // console.log("🚀 ~ Home ~ users:", users);
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Add the Navbarmain component */}
      <Navbarmain />

      <main className="flex flex-col items-center justify-center pt-20">
        {/* Rest of the content */}
        <div className="grid grid-cols-2 w-full max-w-6xl mx-auto divide-x-2">
          <div className="flex flex-col items-center justify-center text-center p-10">
            <h1 className="text-4xl text-green-700 font-bold">
              Welcome to the Attendance System
            </h1>
            <div className="space-x-4 mt-20">
              <Link
                href="/Registration"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                User Registration
              </Link>
              <Link
                href="/UserLogin"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Student Login
              </Link>
              <Link
                href="/AdminLogin"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Admin Login
              </Link>
            </div>
          </div>
          <div
            className="flex flex-col justify-center items-center p-10"
            style={{
              backgroundImage: "url('/attendance.jpg')",
              backgroundSize: "contain", // Adjust this property as needed (contain, cover, fill, 100% etc.)
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", // Ensure the image is not repeated
              minHeight: "calc(100vh - 5rem)", // Adjust height to fit within the viewport
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}
