import dbConnect from "@/lib/DatabaseConnect";
import { TeacherModel } from "@/models/TeacherSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { identifier: teacher_id, institute_id: Database_name } =
      await request.json();
    const _mongoose = await mongoose;

    if (
      _mongoose.connection.db?.databaseName &&
      _mongoose.connection.db?.databaseName !== String(Database_name)
    ) {
      await _mongoose.connection.close().then(() => {
        console.log("Previous connection closed");
      });
    }
    await dbConnect({ Database_name });

    console.log("Get Teacher =>>>>", teacher_id, Database_name);
    try {
      const Teacher = await TeacherModel.findOne({ teacher_id });
      console.log("Get Teacher", Teacher);
      if (Teacher) {
        return NextResponse.json(
          { message: "User Finded", success: true, user: Teacher },
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
