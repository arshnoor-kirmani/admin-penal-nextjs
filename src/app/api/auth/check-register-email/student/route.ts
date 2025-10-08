import dbConnect from "@/lib/DatabaseConnect";
import { StudentModel } from "@/models/StudentsSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const student_id = searchParams.get("student_id");
    const Database_name = searchParams.get("institute_id");
    if (!student_id || !Database_name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect(String(Database_name));

    try {
      const exitingStudent = await StudentModel.findOne({ student_id });
      console.log("=====>>>", student_id, exitingStudent);
      if (!exitingStudent) {
        return NextResponse.json(
          { message: "Student is not registered", registered: false },
          { status: 200 }
        );
      }
      if (exitingStudent && !exitingStudent.verify.isActive) {
        return NextResponse.json(
          {
            message:
              "This student account is deactivated. Please contact your institute for assistance.",
            registered: false,
          },
          { status: 200 }
        );
      }
      if (exitingStudent) {
        return NextResponse.json(
          {
            message: "Student already registered",
            registered: exitingStudent.verify.isActive,
            user: exitingStudent,
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "Student is not registered", registered: undefined },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error in finding account", error },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
