import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const values = await req.json();
    console.log("🚀 ~ POST ~ values:", values);

    // Validate the inputs
    const { name, email, password, confirmPassword } = values;

    if (!email || !password) {
      throw new Error("Missing required fields: email or password");
    }

    // Insert the values into the User model
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        confirmpassword: confirmPassword, // Ensure this field is included in the schema and the request body
      },
    });

    return NextResponse.json(
      { message: "success", data: newUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
