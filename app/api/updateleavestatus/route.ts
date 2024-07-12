import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export const PATCH = async (req: Request) => {
  try {
    // Parse the request body to get the values
    const values = await req.json();

    // Validate the inputs (assuming you receive an ID for the record to update)
    const { id, status } = values;

    // Ensure that all required fields are present
    if (!id || status === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the leave request record based on the provided ID
    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: Number(id) }, // Assuming id is a number; adjust if it's a string or UUID
      data: {
        status,
      },
    });

    // Return a success response with the updated record
    return NextResponse.json(
      {
        message: "Leave request status updated successfully",
        data: updatedLeaveRequest,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating leave request:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure to disconnect from Prisma client
  }
};
