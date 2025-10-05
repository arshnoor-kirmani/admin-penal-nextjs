import InstituteModel from "@/models/InstituteSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { identifier, userType, password } = await req.json();
    if (!identifier || !userType || !password) {
      return NextResponse.json(
        { message: "Identifier, userType and password are required" },
        { status: 400 }
      );
    }
    console.log({
      identifier: identifier,
      userType: userType,
      password: password,
    });
    let user;
    if (userType === "institutes") {
      user = await InstituteModel.findOne({
        email: identifier,
      });
    }
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return NextResponse.json(
      { message: "password changed successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal server error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
