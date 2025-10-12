import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params }: { params: { page: string[] } }) {
  const session = await getServerSession(authOptions);
  const Params = await params;
  const FirstRoute = Params.page[0];
  if (!session) {
    return <div>{FirstRoute}</div>;
  }
  return <div className="p-4">Welcome, {session.identifier}</div>;
}

export default page;
