import dbConnect from "@/lib/DatabaseConnect";
import { StudentModel } from "@/models/StudentsSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { student_id, student_name, password, institute_id } =
      await request.json();
    await dbConnect({ Database_name: institute_id });
    try {
      const existingStudent = await StudentModel.findOne({ student_id });
      if (existingStudent) {
        return new Response("Student already exists", { status: 409 });
      }
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new StudentModel({
          student_id,
          student_name,
          password: hashPassword,
        });
        await newStudent.save();
        return new Response("Student added successfully", { status: 201 });
      } catch (error) {
        console.error("Error adding new student:", error);
        return new Response("Error adding new student", { status: 500 });
      }
    } catch (error) {
      console.error("Error checking for existing student:", error);
      return new Response("Error checking for existing student", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return new Response("Invalid JSON in request body", { status: 400 });
  }
}
