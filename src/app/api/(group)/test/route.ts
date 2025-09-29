import dbConnect from "@/lib/DatabaseConnect";
import mongoose, { Mongoose } from "mongoose";
import nodemailer from "nodemailer";
export async function GET() {
  // Connect to the first database
  await dbConnect({ Database_name: "institutes" });
  console.log("Connected to institutes:", mongoose.connection.db?.databaseName);

  // Disconnect from the first database
  await mongoose.disconnect();
  console.log("Disconnected from institutes");

  // Connect to the second database
  await dbConnect({ Database_name: "institutes" });
  console.log(
    "Connected to anotherDatabase:",
    mongoose.connection.db?.databaseName
  );

  // Disconnect from the second database (optional)
  await mongoose.disconnect();
  console.log("Disconnected from anotherDatabase");

  return new Response("Hello, Next.js!");
}
