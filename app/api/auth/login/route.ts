import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log("🚀 ~ POST ~ values:", values);
    const { email, password } = values;

    if (!email || !password) {
      throw new Error("Missing required fields: email or password");
    }

    // Query the database to find an admin with the provided email and password
    const admin = await prisma.admin.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (admin) {
      // If admin found, return success response
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      // If no admin found, return error response
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error(error.message);
    // Handle any errors that occur during the process
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
