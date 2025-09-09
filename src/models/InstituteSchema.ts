import { User } from "./UserSchema";
import mongoose, { Document, Model, Schema, model, models } from "mongoose";

export interface Course {
  courses_type: String;
  institute: String;
  course_name: String;
  total_students: Number;
  base_fee: Number;
  offer: Array<String>;
  syllabus: Object;
  teacher: String;
}

export interface Institute extends Document {
  username: String;
  email: String;
  password: String;
  institute_name: String;
  address?: String;
  official_website?: String;
  owner?: String;
  users?: Array<User>;
  total_teachers?: Number;
  total_students?: Number;
  courses?: Array<Course>;
  isVerify: boolean;
  verifyCode?: Number;
  verifyExpiry?: Date;
}

const InstituteSchema = new Schema<Institute>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  institute_name: { type: String, required: true },
  address: { type: String },
  official_website: { type: String },
  owner: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  total_teachers: { type: Number },
  total_students: { type: Number },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  isVerify: { type: Boolean, default: false },
  verifyCode: { type: Number },
  verifyExpiry: { type: Date },
});

const InstituteModel =
  (models.Institute as Model<Institute>) ||
  model<Institute>("Institute", InstituteSchema);

export default InstituteModel;
