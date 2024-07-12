import { db } from "@/lib/db";
import { DialogDemo } from "./_components/add-form";
import { DataTable } from "./_components/table-data"; // Adjust as per your structure
import { Attendance } from "./_components/table-data";

async function ManageAttendance() {
  // Fetch attendance data using db.attendance.findMany()
  const users = await db.attendance.findMany();
  console.log("🚀 ~ Attendance ~ list:", users);
  const formattedUsers: Attendance[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    status: user.status,
    date: user.date, // Convert Date to ISO string
    userid: String(user.userid), // Convert userid to string
  }));

  return (
    <div className="bg-gray-400 p-8 space-y-8 m-8">
      <div>
        <h2 className="mb-4 flex items-center justify-center font-bold text-xl">
          Manage Attendance
        </h2>
        <DialogDemo />
      </div>

      <div>
        <DataTable data={formattedUsers} />
      </div>
    </div>
  );
}

export default ManageAttendance;
