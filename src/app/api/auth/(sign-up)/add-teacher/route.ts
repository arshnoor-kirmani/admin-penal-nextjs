import dbConnect from "@/lib/DatabaseConnect";
import { TeacherModel } from "@/models/TeacherSchema";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { institute_id, teacher_id, name, password } = await request.json();
    const _mongoose = await mongoose;

    console.log(
      teacher_id,
      name,
      password,
      "==>",
      _mongoose.connection.db?.databaseName
    );
    if (
      _mongoose.connection.db?.databaseName &&
      _mongoose.connection.db?.databaseName !== String(institute_id)
    ) {
      await _mongoose.connection
        .close()
        .then(() => {
          console.log("Previous connection closed");
        })
        .catch((err) => {
          console.error("Error closing previous connection:", err);
        });
    }
    await dbConnect({ Database_name: institute_id });
    try {
      const existingTeacher = await TeacherModel.findOne({ teacher_id });
      if (existingTeacher) {
        return NextResponse.json(
          { message: "Teacher ID already exists", success: false },
          { status: 400 }
        );
      }
      const hashPassword = await bcrypt.hash(password, 10);
      try {
        const newTeacher = new TeacherModel({
          teacher_id,
          teacher_name: name,
          password: hashPassword,
        });
        await newTeacher.save();
        return NextResponse.json(
          { message: "Teacher added successfully", success: true },
          { status: 201 }
        );
      } catch (error) {
        console.error("Error creating new teacher:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    } catch (error) {
      console.error("Error checking existing teacher:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    console.error("Error adding teacher:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
