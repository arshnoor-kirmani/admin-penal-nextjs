import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, Database_name } = await request.json();
  console.log("forget Password", email);
  if (!email) {
    throw new Error("Prams messing!!");
  }
  await dbConnect("institutes");
  // Finding Account

  if (Database_name === "institutes") {
    const institute = await InstituteModel.findOne({ email });
    console.log("forget password", institute);
    if (!institute) {
      return NextResponse.json(
        { message: "account not found!!", success: false },
        { status: 202 }
      );
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const verifyExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
    institute.forget_password_code = verifyCode;
    // institute.verifyCode = verifyCode;
    console.log(institute.forget_password_code, verifyCode);
    institute.forget_password_code_expriy = verifyExpiry;
    // institute.reset_password_request = true;
    console.log("Verification code (for testing purposes):", verifyCode);
    institute.save();
    console.log("after Save forget password", institute.forget_password_code);
    return NextResponse.json(
      { message: "User founded", success: true, institute },
      { status: 200 }
    );
  }
}
/** console.log("forget Password", email);
  if (!email) {
    throw new Error("Prams messing!!");
  }
  await dbConnect("institutes");

  if (Database_name === "institutes") {
    const institute = await InstituteModel.findOne({ email });
    if (!institute) {
      return NextResponse.json(
        { message: "account not found!!", success: false },
        { status: 202 }
      );
    }
    console.log("forget password", institute);
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const verifyExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
    institute.forget_password_code = verifyCode.toString();
    institute.forget_password_code_expriy = verifyExpiry;
    await institute.save();
    return NextResponse.json(
      { message: "User founded", success: true },
      { status: 200 }
    );
  } */
