import { db } from "@/lib/db";
import { DataTable } from "./_components/table"; // Adjust as per your structure
import { LeaveRequest } from "./_components/table";

async function ManageAttendance() {
  // Fetch attendance data using db.attendance.findMany()
  const users = await db.leaveRequest.findMany();
  console.log("🚀 ~ Attendance ~ list:", users);
  const format: LeaveRequest[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    status: user.status,
    From: user.From,
    To: user.To,
    Reason: user.Reason, // Convert Date to ISO string
    userId: String(user.userId), // Convert userid to string
  }));

  return (
    <div className="bg-gray-400 p-8 space-y-8 m-8">
      <div>
        <DataTable data={format} />
      </div>
    </div>
  );
}

export default ManageAttendance;
