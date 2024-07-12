import React from "react";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <div className="bg-gray-700 text-white w-64  flex justify-center overflow-y-auto p-2">
        <div className="px-6 flex-col items-center mt-5">
          <img
            src="/logoipsum-225.svg"
            alt="Logo"
            className="w-13 h-13 rounded-full cursor-pointer"
          />

          <ul className="space-y-4">
            <li>
              <Link href="/admin" className="block hover:text-blue-500 mt-10">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="../admin/viewallattendance"
                className="block hover:text-blue-500 mt-10"
              >
                View Attendance Record
              </Link>
            </li>
            <li>
              <Link
                href="../admin/ManageAttendance"
                className="block hover:text-blue-500 "
              >
                Manage Attendance
              </Link>
            </li>
            <li>
              <Link
                href="../admin/LeaveRequests"
                className="block hover:text-blue-500 "
              >
                Leaves Requests
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
