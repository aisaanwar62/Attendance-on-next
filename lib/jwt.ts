import jwt from "jsonwebtoken";

const SECRET_KEY = "Ayesha"; // Replace with your actual secret key

export const signToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "2d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as { userId: number };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
