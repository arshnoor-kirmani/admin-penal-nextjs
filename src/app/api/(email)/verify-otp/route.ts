import InstituteModel, { Institute } from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { otp, userId, verifyType, VerificationType } = await request.json();
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
    const Code =
      VerificationType === "verify"
        ? user.verifyCode?.toString()
        : VerificationType === "forget-password"
        ? user.forget_password_code?.toString()
        : "";
    const isValid = otp === (Code || "");
    console.log(isValid, "otp", otp, "Code", Code);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid OTP", success: false },
        { status: 401 }
      );
    }
    const expiry =
      VerificationType === "verify"
        ? user.verifyExpiry
        : VerificationType === "forget-password"
        ? user.forget_password_code_expriy
        : "";
    const ExpiryDate = expiry ? new Date(expiry) : new Date(0);
    const Now = new Date();
    if (ExpiryDate < Now) {
      return NextResponse.json(
        { message: "OTP has expired", success: false },
        { status: 400 }
      );
    }
    user.isVerify = true;
    // user.verifyCode = undefined;
    // user.verifyExpiry = undefined;
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
