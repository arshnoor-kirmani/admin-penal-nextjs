import dbConnect from "@/lib/DatabaseConnect";
import { TeacherModel } from "@/models/TeacherSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teacher_id = searchParams.get("teacher_id"),
      institute_id = searchParams.get("institute_id");
    const _mongoose = await mongoose;

    if (_mongoose.connection.db?.databaseName !== String(institute_id)) {
      await _mongoose.connection
        .close()
        .then(() => {
          console.log("Previous connection closed");
        })
        .catch((error) => {
          console.log("error in closing previes database", error);
        });
    }
    await dbConnect({ Database_name: String(institute_id) });
    try {
      const teacher = await TeacherModel.findOne({ teacher_id });
      if (!teacher) {
        return NextResponse.json(
          { message: "Teacher is not registered", registered: false },
          { status: 200 }
        );
      }
      if (teacher && !teacher.verify.isActive) {
        return NextResponse.json(
          {
            message:
              "This Teacher account is deactivated. Please contact your institute for assistance.",
            registered: false,
          },
          { status: 200 }
        );
      }
      if (teacher) {
        return NextResponse.json(
          {
            message: "Teacher already registered",
            registered: teacher.verify.isActive,
            user: teacher,
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "Teacher is not registered", registered: undefined },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error in finding Teacher", error },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internat Error", error },
      { status: 500 }
    );
  }
}
