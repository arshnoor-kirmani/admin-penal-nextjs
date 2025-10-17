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
  all_permissions: boolean;
  profile_edit: boolean;
  send_message: boolean;
  inbox_message: boolean;
  website_setting: boolean;
  add_teacher: boolean;
  edit_teacher: boolean;
  delete_teacher: boolean;
  salary_management: boolean;
  add_student: boolean;
  edit_student: boolean;
  delete_student: boolean;
  fees_management: boolean;
  result_permession: boolean;
  attendance: boolean;
  manage_users: boolean;
  settings: boolean;
  show_student: boolean;
  show_teacher: boolean;
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
      all_permissions: true,
      profile_edit: true,
      send_message: true,
      inbox_message: true,
      website_setting: true,
      add_teacher: true,
      edit_teacher: true,
      delete_teacher: true,
      salary_management: true,
      add_student: true,
      edit_student: true,
      delete_student: true,
      fees_management: true,
      result_permession: true,
      attendance: true,
      manage_users: true,
      settings: true,
      show_student: true,
      show_teacher: true,
    },
  },
});

const InstituteModel =
  (models.Institute as Model<Institute>) ||
  model<Institute>("Institute", InstituteSchema);

export default InstituteModel;
