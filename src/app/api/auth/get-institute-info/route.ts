import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();
    await dbConnect({ Database_name: "institutes" });
    console.log(identifier);
    try {
      const user = await InstituteModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
      console.log(user);
      if (user) {
        return NextResponse.json(
          { message: "User Finded", success: true, user },
          {
            status: 200,
          }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Email not registered", success: false },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
