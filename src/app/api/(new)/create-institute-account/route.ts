import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, email, password, institute_name } = await request.json();
    await dbConnect({ Database_name: "institutes" });
    try {
      const existingInstitute = await InstituteModel.findOne({ email });
      const verifyCode = Math.floor(100000 + Math.random() * 900000);
      console.log("Verification code (for testing purposes):", verifyCode);
      const verifyExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
      if (existingInstitute) {
        existingInstitute.verifyCode = verifyCode;
        existingInstitute.verifyExpiry = verifyExpiry;
        existingInstitute.save();
        return NextResponse.json(
          {
            message: "Email is already registered",
            user: existingInstitute,
            success: true,
          },
          {
            status: 200,
          }
        );
      }
      try {
        // Here, you would typically send the verification code via email.
        // For this example, we'll skip the email sending part.
        const hash = await bcrypt.hash(password, 10);
        if (!hash) {
          return new Response("Error hashing password", { status: 500 });
        }
        const newInstitute = new InstituteModel({
          username,
          email,
          password: hash,
          institute_name,
          verifyCode,
          verifyExpiry,
          isVerify: false,
        });
        await newInstitute.save();
        return NextResponse.json(
          {
            message: "Institute created successfully",
            user: newInstitute,
            success: true,
          },
          { status: 201 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Error creating institute", success: false },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error finding existing institute:", error);
      return NextResponse.json(
        { message: "Error checking existing institute" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}
