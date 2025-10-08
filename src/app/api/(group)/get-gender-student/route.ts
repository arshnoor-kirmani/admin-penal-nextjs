import { NextResponse } from "next/server";
import dbConnect from "@/lib/DatabaseConnect";
import { StudentModel } from "@/models/StudentsSchema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const Database_name = searchParams.get("institute_id");
    const gender = searchParams.get("gender");

    if (!Database_name) {
      return NextResponse.json(
        { message: "Missing institute_id parameter" },
        { status: 400 }
      );
    }

    await dbConnect(String(Database_name)).catch((error) => {
      console.error("Failed to connect to database:", error);
      throw new Error("Database connection failed");
    });
    const students = await StudentModel.aggregate([{ $match: { gender } }]);
    if (!students) {
      return NextResponse.json(
        { message: "No students found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "students found", students },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/(group)/gender-student:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
