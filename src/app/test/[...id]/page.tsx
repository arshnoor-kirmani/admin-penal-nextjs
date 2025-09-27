"use client"; // This is a client component
import { useAppSelector } from "@/hooks/custom/redux-hooks";
import bcrypt from "bcryptjs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  const identifier = id[0];
  async function encrypt() {
    const res = await bcrypt.hash(id[0], 10);
    console.log(res);
    const res2 = await bcrypt.decodeBase64(
      "$2b$10$vJum6Rm54R.aPpYdfQrETemWpGENpPDOXTtO8OK0QM8ko3s5zWeAm",
      10
    );
    console.log(res2);
  }
  encrypt();
  return (
    <div>
      My Post: {id}
      <h1>identifier:{identifier}</h1>
    </div>
  );
}
