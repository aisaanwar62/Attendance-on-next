import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log("Received values:", values);

    const user = await auth();
    console.log("Authenticated user:", user.data.id);

    if (!user || !user.data.id) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    console.log("Authenticated user:", user);

    const { From, To, name, Reason, status } = values;

    // Create a new leave request using Prisma
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        userId: parseInt(user.data.id), // Assuming userId is a number in req.body
        From: new Date(From), // Convert date string to Date object
        To: new Date(To), // Convert date string to Date object
        name,
        Reason,
        status,
      },
    });

    return NextResponse.json({ leaveRequest });
  } catch (error) {
    console.error("Error creating leave request:", error);
    return NextResponse.json(
      { error: "Failed to create leave request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
