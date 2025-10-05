import { Institute } from "@/models/InstituteSchema";
import { Student } from "@/models/StudentsSchema";
import { Teacher } from "@/models/TeacherSchema";
import "next-auth";

declare module "next-auth" {
  interface User extends Institute, Student, Teacher {}

  interface Session {
    identifier: string;
    _id?: string;
    isVerified?: boolean;
    username?: string;
    user_type: string;
    institute_id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    user_type: string;
  }
}
