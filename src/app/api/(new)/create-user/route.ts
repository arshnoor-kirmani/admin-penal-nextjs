import dbConnect from "@/lib/DatabaseConnect";
import UserModel from "@/models/UserSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, email, password, instituteId } = await request.json();
    console.log("Received data:", { username, email, password, instituteId });
    await dbConnect({ Database_name: instituteId });
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          {
            message: "User with this email already exists",
            user: existingUser,
          },
          { status: 400 }
        );
      }
      try {
        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const verifyExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
        console.log("Verification code (for testing purposes):", verifyCode);
        // Here, you would typically send the verification code via email.
        // For this example, we'll skip the email sending part.
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
          return NextResponse.json(
            { message: "Error hashing password" },
            { status: 500 }
          );
        }
        const newUser = new UserModel({
          username,
          email,
          password: hashedPassword,
          verifyCode,
          verifyExpiry,
        });
        await newUser.save();
        return NextResponse.json(
          { message: "User created successfully" },
          { status: 201 }
        );
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { message: "Error creating user:" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error checking for existing user:", error);
      return NextResponse.json(
        { message: "Error checking for existing user:" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return new Response("Invalid JSON in request body", { status: 400 });
  }
}
