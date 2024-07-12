import React from "react";
import Link from "next/link";
import MarkAttendance from "../MarkAttendance/page";

function Sidebar() {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <div className="bg-gray-700 text-white w-64 h-screen flex flex-col justify-between overflow-y-auto p-2">
        <div className="px-6 flex flex-col items-center mt-5">
          <img
            src="/logoipsum-225.svg"
            alt="Logo"
            className="w-13 h-13 rounded-full cursor-pointer"
          />

          <ul className="space-y-4 mt-5">
            <li>
              <Link href="/user" className="block hover:text-blue-500">
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="../user/MarkLeave"
                className="block hover:text-blue-500"
              >
                Mark Leave
              </Link>
            </li>

            {/* <li>
              <Link
                href="../user/MarkAttendance"
                className="block hover:text-blue-500"
              >
                Mark Attendance
              </Link>
            </li> */}

            <li>
              <Link
                href="../user/showleavestatus"
                className="block hover:text-blue-500"
              >
                Leave status
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
