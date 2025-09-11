import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    await dbConnect({ Database_name: "institutes" });
    try {
      const exitingInstiute = await InstituteModel.findOne({ email });
      if (exitingInstiute) {
        return NextResponse.json(
          {
            message: "Email already registered",
            registered: exitingInstiute.isVerify,
            user: exitingInstiute,
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "Email not registered", registered: undefined },
        {
          status: 200,
        }
      );
    } catch (error) {}
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
