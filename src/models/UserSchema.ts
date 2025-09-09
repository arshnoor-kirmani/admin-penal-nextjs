import mongoose, { Schema, Document } from "mongoose";
export interface rules {
  all: boolean;
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
}
export interface User extends Document {
  // user_type: string;
  username: string;
  email: string;
  password: string;
  verifyCode: number;
  verifyExpiry: Date;
  // institute_info: Object;
  // recent: Array<Object>;
  // rules: Object<rules>;
  // createdAt?: Date;
  // updatedAt?: Date;
}
const UserSchema: Schema<User> = new mongoose.Schema({
  // user_type: { type: String, required: true },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: Number, required: true },
  verifyExpiry: { type: Date, required: true },
  // Optional fields for future use
  // institute_info: { type: Object, required: true },
  // recent: { type: [Object], default: [] },
  // rules: { type: Object<rules>, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
