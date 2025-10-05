import mongoose, { Document, Schema } from "mongoose";

export interface Teacher extends Document {
  verify: { isVerify: boolean; isActive: boolean };
  user_type: string;
  teacher_id: string;
  teacher_name: string;
  password: string;
  institute_id: string;
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
  //     add_teacher: boolean;
  //     edit_teacher: boolean;
  //     delete_teacher: boolean;
  //     fees_management: boolean;
  //     result_permession: boolean;
  //   };
}

const teacherSchema: Schema<Teacher> = new mongoose.Schema({
  teacher_id: { type: String, required: true, unique: true },
  teacher_name: { type: String, required: true, default: "teacher" },
  password: { type: String, required: true },
  institute_id: { type: String, required: true },
  verify: {
    isVerify: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  user_type: { type: String, required: true, default: "teacher" },
});

export const TeacherModel =
  (mongoose.models.teacher as mongoose.Model<Teacher>) ||
  mongoose.model<Teacher>("teacher", teacherSchema);
