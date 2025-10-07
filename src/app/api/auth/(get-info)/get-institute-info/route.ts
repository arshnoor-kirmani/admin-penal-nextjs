import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();

    await dbConnect("institutes");

    console.log("Get Institute =>>>>", identifier);
    try {
      const user = await InstituteModel.findOne({
        $or: [{ email: identifier }, { institute_code: identifier }],
      });
      console.log("Get Institute", user);
      if (user) {
        return NextResponse.json(
          { message: "User Finded", success: true, user },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          { message: "Email not registered", success: false },
          {
            status: 200,
          }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Email not registered", success: false, error },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
