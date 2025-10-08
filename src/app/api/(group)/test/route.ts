import dbConnect from "@/lib/DatabaseConnect";
import { StudentModel } from "@/models/StudentsSchema";
export async function GET() {
  await dbConnect("68c8fa3c234b48b642040fde");
  // const data = await StudentModel.aggregate([{ $match: { gender: "male" } }]);
  const data = await StudentModel.aggregate([
    { $match: { "fees.status": "unpaid" } },
  ]);

  return new Response(JSON.stringify([data.length, data]));
}
