import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { identifier } = await req.json();
  console.log(identifier);
  return NextResponse.json({ message: "hello" }, { status: 200 });
}
