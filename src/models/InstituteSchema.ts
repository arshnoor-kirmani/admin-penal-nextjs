import { User } from "./UserSchema";
import { Document, Model, Schema, model, models } from "mongoose";

export interface Course {
  courses_type: string;
  institute: string;
  course_name: string;
  total_students: number;
  base_fee: number;
  offer: Array<string>;
  syllabus: object;
  teacher: string;
}
export interface rules {
  all: boolean;
  // Dashboard
  dashboard: boolean;
  // Profile
  profile_show: boolean;
  profile_edit: boolean;
  // Messages
  send_message: boolean;
  inbox_show: boolean;
  // User Management
  users_show: boolean;
  add_user: boolean;
  edit_user: boolean;
  delete_user: boolean;
  // Settings
  website_setting: boolean;
  account_setting: boolean;
  password_change: boolean;
  // Teacher Management
  teachers_show: boolean;
  add_teacher: boolean;
  edit_teacher: boolean;
  delete_teacher: boolean;
  // Student Management
  students_show: boolean;
  add_student: boolean;
  edit_student: boolean;
  delete_student: boolean;
  // Course Management
  courses_show: boolean;
  add_course: boolean;
  edit_course: boolean;
  delete_course: boolean;
  // Finance
  salary_management: boolean;
  fees_management: boolean;
  add_fees: boolean;
  edit_fees: boolean;
  delete_fees: boolean;
  // Academic Documents
  result_show: boolean;
  add_result: boolean;
  edit_result: boolean;
  delete_result: boolean;
  attendance_show: boolean;
  add_attendance: boolean;
  edit_attendance: boolean;
  delete_attendance: boolean;
}

export interface Institute extends Document {
  information: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    landline: string;
    mobile: string;
    email: string;
    website: string;
    short_name: string;
    currency: string;
    timezone: string;
    working_hours: string;
    institute_type: string;
    affiliation: string;
    established_year: number;
    institute_code: string;
    institute_name: string;
    logo: string;
    profile_url: string;
  };
  username: string;
  email: string;
  password: string;
  institute_short_name: string;
  institute_name: string;
  user_type: string;
  address?: string;
  official_website?: string;
  owner?: string;
  users?: Array<User>;
  total_teachers?: number;
  total_students?: number;
  courses?: Array<Course>;
  isVerify: boolean;
  verifyCode?: number;
  verifyExpiry?: Date;
  forget_password_code?: number;
  forget_password_code_expriy?: Date;
  rules: rules;
  institute_code: string;
}

const InstituteSchema = new Schema<Institute>({
  information: {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    country: { type: String, default: "" },
    landline: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    short_name: { type: String, default: "" },
    currency: { type: String, default: "" },
    timezone: { type: String, default: "" },
    working_hours: { type: String, default: "" },
    institute_type: { type: String, default: "" },
    affiliation: { type: String, default: "" },
    established_year: { type: Number, default: 0 },
    institute_code: { type: String, default: "" },
    institute_name: { type: String, default: "" },
    logo: { type: String, default: "" },
    profile_url: { type: String, default: "" },
  },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institute_name: { type: String, required: true, default: "" },
  institute_code: { type: String, required: true, unique: true },
  institute_short_name: { type: String, default: "" },
  user_type: { type: String, required: true, default: "institute" },
  address: { type: String, default: "" },
  official_website: { type: String, default: "" },
  owner: { type: String, default: "" },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  total_teachers: { type: Number, default: 0 },
  total_students: { type: Number, default: 0 },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  isVerify: { type: Boolean, default: false },
  verifyCode: { type: Number, default: null },
  verifyExpiry: { type: Date, default: null },
  forget_password_code: { type: Number, default: 12345 },
  forget_password_code_expriy: { type: Date, default: null },
  rules: {
    type: Object,
    default: {
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
    },
  },
});

const InstituteModel =
  (models.Institute as Model<Institute>) ||
  model<Institute>("Institute", InstituteSchema);

export default InstituteModel;
