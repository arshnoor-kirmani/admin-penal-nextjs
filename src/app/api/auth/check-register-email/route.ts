import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const _mongoose = await mongoose;

    console.log(
      "==========> Current DB, Identifier : ",
      _mongoose.connection.db?.databaseName,
      "institutes"
    );
    if (_mongoose.connection.db?.databaseName !== String("institutes")) {
      await _mongoose.connection.close().then(() => {
        console.log("Previous connection closed");
      });
    }
    await dbConnect({ Database_name: "institutes" });
    try {
      const exitingInstiute = await InstituteModel.findOne({ email });
      console.log("exitingInstiute", exitingInstiute);
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
    } catch (error) {
      return NextResponse.json(
        { message: "Error in finding account" },
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
