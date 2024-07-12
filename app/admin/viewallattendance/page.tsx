"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
async function AdminViewAllAttendance() {
  const router = useRouter();
  const attendances = await db.attendance.findMany({
    include: {
      user: true,
      // Including user data if needed
    },
  });
  console.log("🚀 ~ allattendance ~ attendances:", attendances);

  return (
    <div className="flex items-center justify-center h-full m-5">
      <div className="bg-gray-500 p-8 rounded-lg shadow-lg w-full">
        <Card>
          <CardHeader>
            <CardTitle>View All Attendance Records</CardTitle>
            <CardDescription>Attendance List</CardDescription>
          </CardHeader>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px 10px rgba(0, 0, 193, 0.5)",
            }}
            style={{
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
              transition: "box-shadow 0.1s ease",
            }}
            className="rounded-xl overflow-hidden"
          >
            <CardContent className="flex-col">
              <div className="h-96 overflow-y-scroll">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {attendances.map((attendance) => (
                    <li
                      key={attendance.id}
                      className="p-4 bg-white rounded-lg shadow-md"
                    >
                      <div>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(attendance.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Status:</strong> {attendance.status || "N/A"}
                        </p>
                        <p>
                          <strong>User:</strong>{" "}
                          {attendance.user?.name || "N/A"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}

export default AdminViewAllAttendance;
