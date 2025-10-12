import dbConnect from "@/lib/DatabaseConnect";
import InstituteModel from "@/models/InstituteSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { institute_code, info } = await req.json();
  console.log(info);
  try {
    await dbConnect("institutes").catch((error) => {
      console.error("Failed to connect to database:", error);
      throw new Error("Database connection failed");
    });
    const institute = await InstituteModel.findOne({
      institute_code,
    });
    if (!institute) {
      throw new Error("Institute not found");
    }
    if (!!info.username) institute.set({ username: info.username });
    if (!!info.institute_name)
      institute.set({ institute_name: info.institute_name });
    if (!!info.logo) institute.set({ logo: info.logo });
    if (!!info.profile_url) institute.set({ profile_url: info.profile_url });
    if (!!info.institute_code)
      institute.set({ institute_code: info.institute_code });

    institute.information = {
      ...institute.information,
      ...info,
    };
    console.log("Update Institute", institute);
    await institute.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    throw new Error("Internal Server Error", { cause: error });
  }
}
