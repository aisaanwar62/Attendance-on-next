"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AdminDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-lime-100 m-10 rounded-xl border">
      <h2 className="font-bold text-2xl mt-5">Admin Dashboard</h2>
      <div className="flex flex-col items-center justify-center h-full bg-gray-600 m-8 rounded-xl p-1">
        <ul className="flex gap-4 m-10">
          <li>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px 10px rgba(136, 165, 193, 0.5)",
              }}
              style={{
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                transition: "box-shadow 0.1s ease",
              }}
              className="rounded-xl overflow-hidden"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Manage Attendance</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="/admin/ManageAttendance"
                    className="hover:text-blue-500"
                  >
                    Manage Attendance
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px 10px  rgba(136, 165, 193, 0.5)",
              }}
              style={{
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                transition: "box-shadow 0.1s ease",
              }}
              className="rounded-xl overflow-hidden"
            >
              <Card>
                <CardHeader>
                  <CardTitle> Approve Leaves</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="/admin/LeaveApproval"
                    className="hover:text-blue-500"
                  >
                    Approve Leaves
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
