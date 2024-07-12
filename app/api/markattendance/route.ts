import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log("🚀 ~ POST ~ values:", values);
    // Validate the inputs (you should also validate userid and date if necessary)
    const { userid, name, status, date } = values;

    if (!userid || !name || !status || !date) {
      throw new Error("Missing required fields: userid, name, status, date");
    }

    // Insert the values into the Attendance model
    const newAttendance = await prisma.attendance.create({
      data: {
        name,
        date,
        status,
        user: { connect: { id: Number(userid) } }, // Connect to the User with the specified userid
      },
    });

    return NextResponse.json(
      { message: "success", data: newAttendance },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating attendance:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
