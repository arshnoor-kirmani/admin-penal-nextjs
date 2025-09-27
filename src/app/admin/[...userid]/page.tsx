"use client";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const { userid } = await params;
  console.log(userid);
  return <div>{userid}</div>;
}
