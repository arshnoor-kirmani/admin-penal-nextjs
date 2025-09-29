import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json();
    const _mongoose = await mongoose;

    console.log(
      "==========> Current DB, Identifier : ",
      _mongoose.connection.db?.databaseName,
      "institutes"
    );
    if (
      _mongoose.connection.db?.databaseName &&
      _mongoose.connection.db?.databaseName !== String("institutes")
    ) {
      await _mongoose.connection.close().then(() => {
        console.log("Previous connection closed");
      });
    }
    await dbConnect({ Database_name: "institutes" });

    console.log("Get Institute", identifier);
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
