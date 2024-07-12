import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET; // Use your environment variable

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log("🚀 ~ POST ~ values:", values);
    const { email, password } = values;

    if (!email || !password) {
      throw new Error("Missing required fields: email or password");
    }

    // Query the database to find an user with the provided email and password
    const User = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (User) {
      // Sign a token with the user's ID
      const token = jwt.sign(
        {
          data: { id: User.id },
        },
        secret!,
        { expiresIn: "1d" }
      );

      // Set the token as a cookie in the response
      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      return response;
    } else {
      // If no user found, return error response
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
