import dbConnect from "@/lib/DatabaseConnect";
import { StudentModel } from "@/models/StudentsSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { identifier: student_id, institute_id: Database_name } =
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

    console.log("Get Student =>>>>", student_id, Database_name);
    try {
      const Student = await StudentModel.findOne({ student_id });
      console.log("Get Student", Student);
      if (Student) {
        return NextResponse.json(
          { message: "User Finded", success: true, user: Student },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          { message: "Student ID not registered", success: false },
          {
            status: 200,
          }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Student ID not registered", success: false, error },
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
