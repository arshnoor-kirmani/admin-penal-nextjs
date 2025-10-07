import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import InstituteModel from "@/models/InstituteSchema";
import dbConnect from "@/lib/DatabaseConnect";
import mongoose from "mongoose";
import { StudentModel } from "@/models/StudentsSchema";
import { TeacherModel } from "@/models/TeacherSchema";
import { User as UserType } from "next-auth";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "institute-login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<UserType | null> {
        console.log(credentials);
        if (!credentials || !credentials.email || !credentials.password) {
          console.error("Please provide email and password both.");
          throw new Error("Please provide email and password both.");
        }
        // Connect to the database
        await dbConnect("institutes");
        // Find the user by email or username
        const institute = await InstituteModel.findOne({
          email: credentials.email,
        });
        console.log("institute finded", institute);

        if (!institute) {
          console.error("No institute found with the provided email.");
          throw new Error(
            JSON.stringify({
              message: "No institute found with the provided email.",
              success: false,
            })
          );
        }
        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          institute.password.toString()
        );
        console.log(
          isValidPassword,
          credentials.password,
          institute.password == institute.password.toString()
        );
        if (!isValidPassword) {
          console.error("Invalid password.");
          throw new Error("Invalid password.");
        }
        console.log("User authenticated successfully:", institute);
        return {
          ...institute.toObject(),
        } as unknown as UserType;
      },
    }),
    // =============================Student Login====================================
    CredentialsProvider({
      id: "student-login",
      name: "Credentials",
      credentials: {
        institute_id: { label: "instiute_id", type: "text" },
        student_id: { label: "student_id", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials:
          | Record<"institute_id" | "student_id" | "password", string>
          | undefined
      ): Promise<UserType | null> {
        console.log(credentials);
        if (
          !credentials ||
          !credentials.institute_id ||
          !credentials.student_id ||
          !credentials.password
        ) {
          console.error(
            "Please provide institute ID, student ID, and password."
          );
          throw new Error(
            "Please provide institute ID, student ID, and password."
          );
        }
        // Connect to the database

        await dbConnect(String(credentials.institute_id));
        // Find the user by student_id
        const student = await StudentModel.findOne({
          student_id: credentials.student_id,
        });
        console.log("student found", student);

        if (!student) {
          console.error("No Student found with the provided Student ID.");
          throw new Error("No Student found with the provided Student ID.");
        }
        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          student.password.toString()
        );
        console.log(
          isValidPassword,
          credentials.password,
          student.password == student.password.toString()
        );
        if (!isValidPassword) {
          console.error("Invalid password.");
          throw new Error("Invalid password.");
        }
        console.log("User authenticated successfully:", student);
        return {
          ...student.toObject(),
        } as unknown as UserType;
      },
    }),
    // =============================Teacher Login====================================
    CredentialsProvider({
      id: "teacher-login",
      name: "Credentials",
      credentials: {
        institute_id: { label: "Institute ID", type: "text" },
        teacher_id: { label: "Teacher ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials:
          | Record<"teacher_id" | "institute_id" | "password", string>
          | undefined
      ): Promise<UserType | null> {
        console.log(credentials);
        if (
          !credentials ||
          !credentials.institute_id ||
          !credentials.teacher_id ||
          !credentials.password
        ) {
          console.error(
            "Please provide institute ID, Teacher ID, and password."
          );
          throw new Error(
            "Please provide institute ID, Teacher ID, and password."
          );
        }
        // Connect to the database
        if (
          mongoose.connection.db?.databaseName &&
          mongoose.connection.db?.databaseName !==
            String(credentials.institute_id)
        ) {
          mongoose.connection
            .close()
            .then(() => {
              console.log("Previous connection closed");
            })
            .catch((err) => {
              console.error("Error closing previous connection:", err);
            });
        }
        await dbConnect(String(credentials.institute_id));
        // Find the user by email or username
        const teacher = await TeacherModel.findOne({
          teacher_id: credentials.teacher_id,
        });
        console.log("institute finded", teacher);

        if (!teacher) {
          console.error("No Teacher found with the provided Teacher ID.");
          // throw new Error("No institute found with the provided email.");
          throw Error(
            JSON.stringify({
              message: "No Teacher found with the provided ID.",
              success: false,
            })
          );
        }
        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          teacher.password.toString()
        );
        console.log(
          isValidPassword,
          credentials.password,
          teacher.password == teacher.password.toString()
        );
        if (!isValidPassword) {
          console.error("Invalid password.");
          throw new Error("Invalid password.");
        }
        console.log("User authenticated successfully:", teacher);
        return {
          ...teacher.toObject(),
        } as unknown as UserType;
      },
    }),
  ],

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        console.log("User ==>", user);
        token._id = user._id?.toString();
        token.username = user.username;
        token.user_type = user.user_type || "institute";
        token.identifier = user?.email || user.student_id || user.teacher_id;
        // TODO:::
        token.institute_id =
          user.institute_id?.toString() || "68c8fa3c234b48b642040fde";
      }
      console.log("Token ==>", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure the returned session object includes the required 'expires' property
        session = {
          ...token,
          expires: session.expires,
        } as typeof session;
        // session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
