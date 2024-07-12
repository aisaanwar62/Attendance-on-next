import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (req: Request) => {
  try {
    // Extract the record ID from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    // Delete the attendance record based on the provided ID
    const deletedAttendance = await prisma.attendance.delete({
      where: { id: Number(id) }, // Assuming id is a number; adjust if it's a string or UUID
    });

    // Return a success response with the deleted record
    return NextResponse.json(
      { message: "Record deleted successfully", data: deletedAttendance },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting attendance record:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
