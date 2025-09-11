import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import InstituteModel, { Institute } from "@/models/InstituteSchema";
import dbConnect from "@/lib/DatabaseConnect";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "institute-login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        console.log(credentials);
        if (!credentials || !credentials.email || !credentials.password) {
          console.error("Please provide email and password both.");
          throw new Error("Please provide email and password both.");
        }
        // Connect to the database
        await dbConnect({ Database_name: "institutes" });
        // Find the user by email or username
        const institute = await InstituteModel.findOne({
          email: credentials.email,
        });
        console.log("institute finded", institute);

        if (!institute) {
          console.error("No institute found with the provided email.");
          // throw new Error("No institute found with the provided email.");
          return NextResponse.json(
            {
              message: "No institute found with the provided email.",
              success: false,
            },
            { status: 201 }
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
          return null;
        }
        console.log("User authenticated successfully:", institute);
        return institute;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn Method", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },
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
    signIn: "/institute-account-login",
  },
};
