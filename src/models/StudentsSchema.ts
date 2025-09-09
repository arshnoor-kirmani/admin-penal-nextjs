import mongoose, { Document, Schema } from "mongoose";

export interface Student extends Document {
  //   verify: { isVerify: boolean };
  //   user_type: string;
  student_id: string;
  student_name: string;
  password: string;
  //   institute_info: {
  //     institute_name: string;
  //     branch: { name: string };
  //     institute_short_name: string;
  //     insitute_id: string;
  //   };
  //   results: any[];
  //   catificates: any[];
  //   courses: {
  //     course_type: string;
  //     course_name: string;
  //     course_short_name: string;
  //     fees: {
  //       full_fee: { $numberInt: string };
  //       fixed_fee: { $numberInt: string };
  //       paid_fee: any[];
  //       belance_fee: { $numberInt: string };
  //     };
  //     admint_card: any[];
  //   }[];
  //   recent: any[];
  //   rules: {
  //     all: boolean;
  //     profile_edit: boolean;
  //     send_message: boolean;
  //     inbox_message: boolean;
  //     website_setting: boolean;
  //     add_teacher: boolean;
  //     edit_teacher: boolean;
  //     delete_teacher: boolean;
  //     salary_management: boolean;
  //     add_student: boolean;
  //     edit_student: boolean;
  //     delete_student: boolean;
  //     fees_management: boolean;
  //     result_permession: boolean;
  //   };
}

const StudentSchema: Schema<Student> = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  student_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const StudentModel =
  (mongoose.models.Student as mongoose.Model<Student>) ||
  mongoose.model<Student>("Student", StudentSchema);
