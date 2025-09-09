import InstituteModel, { Institute } from "@/models/InstituteSchema";
import axios from "axios";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { verify } from "node:crypto";

export async function POST(request: Request) {
  try {
    const { otp, userId, verifyType } = await request.json();
    console.log(otp, userId, verifyType);
    let user: Institute | null = null;
    if (verifyType === "institute") {
      user = await InstituteModel.findOne({ _id: userId });
      console.log(user);
    }
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const isValid = otp === (user.verifyCode || "")?.toString();
    console.log(isValid, otp, user.verifyCode);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid OTP", success: false },
        { status: 400 }
      );
    }
    const ExpiryDate = new Date(user.verifyExpiry || "");
    const Now = new Date();
    if (ExpiryDate < Now) {
      return NextResponse.json(
        { message: "OTP has expired", success: false },
        { status: 400 }
      );
    }
    user.isVerify = true;
    user.verifyCode = undefined;
    user.verifyExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "OTP verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Hello" }, { status: 200 });
}
