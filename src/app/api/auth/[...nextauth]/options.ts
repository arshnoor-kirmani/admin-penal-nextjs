import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import InstituteModel from "@/models/InstituteSchema";
import dbConnect from "@/lib/DatabaseConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials || !credentials.email || !credentials.password) {
          console.error("Please provide email and password both.");
          throw new Error("Please provide email and password both.");
        }
        // Connect to the database
        if (credentials.loginType === "institute") {
          await dbConnect({ Database_name: "institutes" });
          // Find the user by email or username
          const institute = await InstituteModel.findOne({
            email: credentials.email,
          });
          if (!institute) {
            console.error("No institute found with the provided email.");
            throw new Error("No institute found with the provided email.");
          }
          // Compare the provided password with the hashed password in the database
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            institute.password.toString()
          );
          if (!isPasswordValid) {
            console.error("Invalid password.");
            throw new Error("Invalid password.");
          }
          console.log("User authenticated successfully:", institute);
          return institute;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        // token.isVerified = user.isVerified;
        token.username = user.username;
        // Add any other user properties you want to include in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session._id = token._id;
        // session.isVerified = token.isVerified;
        session.username = token.username;
        // session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
