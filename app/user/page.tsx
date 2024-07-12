import React from "react";
import { auth } from "@/lib/auth";
import UserDashboard from "./dashboard/page";
import { db } from "@/lib/db";

import MonthlyRecord from "./monthly record/page";
import Sidebar from "./userlayout/sidebar";
interface Attendance {
  userid: number;
  status: string | null;
  date: Date; // Assuming there is a date field in the attendance record
}

async function User() {
  const user = await auth();
  console.log(user);
  let attendancerecord: Attendance[] = [];

  if (user) {
    attendancerecord = await db.attendance.findMany({
      where: { userid: user.data.id },
    });
  }
  console.log(attendancerecord);

  const monthlyCounts = Array.from({ length: 12 }, () => ({
    present: 0,
    absent: 0,
  }));

  attendancerecord.forEach((record) => {
    const month = new Date(record.date).getMonth();
    console.log("Month:", month);
    if (record.status === "Present") {
      monthlyCounts[month].present += 1;
    } else if (record.status === "absent") {
      monthlyCounts[month].absent += 1;
    }
  });
  console.log("Monthly Counts:", monthlyCounts);

  const presentCount = monthlyCounts.reduce(
    (acc, curr) => acc + curr.present,
    0
  );
  const absentCount = monthlyCounts.reduce((acc, curr) => acc + curr.absent, 0);

  return (
    // <div className="flex ">
    //   <Sidebar />
    <div className="flex items-center justify-center h-full bg-slate-200 mx-28 mt-10 p-5 rounded-xl space-x-5 ">
      <UserDashboard
        presentCount={presentCount}
        absentCount={absentCount}
        monthlyCounts={monthlyCounts}
      />
      <MonthlyRecord
        presentCount={presentCount}
        absentCount={absentCount}
        monthlyCounts={monthlyCounts}
      />
    </div>
  );
}

export default User;
