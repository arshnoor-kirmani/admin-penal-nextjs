import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
// import { StudentModel } from "@/models/StudentsSchema";
import { NextResponse } from "next/server";
export async function GET() {
  await dbConnect("institutes");
  const data1 = await InstituteModel.findOne({
    email: "try.arshnoorkirmani+1@gmail.com",
  });
  if (!data1) throw new Error("User not fount");
  data1.rules = {
    all: true,
    dashboard: true,
    profile_show: true,
    profile_edit: true,
    send_message: true,
    inbox_show: true,
    users_show: true,
    add_user: true,
    edit_user: true,
    delete_user: true,
    website_setting: true,
    teachers_show: true,
    students_show: true,
    courses_show: true,
    fees_management: true,
    result_show: true,
    attendance_show: true,
    account_setting: true,
    password_change: true,
    add_teacher: true,
    edit_teacher: true,
    delete_teacher: true,
    add_student: true,
    edit_student: true,
    delete_student: true,
    add_course: true,
    edit_course: true,
    delete_course: true,
    salary_management: true,
    add_fees: true,
    edit_fees: true,
    delete_fees: true,
    add_result: true,
    edit_result: true,
    delete_result: true,
    add_attendance: true,
    edit_attendance: true,
    delete_attendance: true,
  };
  await data1.save();
  // const data = await StudentModel.aggregate([{ $match: { gender: "male" } }]);
  // await dbConnect("68c8fa3c234b48b642040fde");
  // const data = await StudentModel.aggregate([
  //   { $match: { "fees.status": "unpaid" } },
  // ]);

  return NextResponse.json({ students: [], institute: data1 });
}
