import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (req: Request) => {
  try {
    // Parse the request body to get the values
    const values = await req.json();
    console.log("🚀 ~ Edit ~ values:", values);

    // Validate the inputs (assuming you receive an ID for the record to update)
    const { id, name, date, status } = values;

    // Ensure that all required fields are present
    if (!id || !name || !date || status === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const parsedDate = new Date(date);
    // Update the attendance record based on the provided ID
    const updatedAttendance = await prisma.attendance.update({
      where: { id: Number(id) }, // Assuming id is a number; adjust if it's a string or UUID
      data: {
        name,
        date: parsedDate,
        status,
      },
    });

    // Return a success response with the updated record
    return NextResponse.json(
      { message: "success", data: updatedAttendance },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating attendance record:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
