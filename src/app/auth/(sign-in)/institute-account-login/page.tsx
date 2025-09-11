"use client";
import { useEffect } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import SignInForm from "@/components/custom/sign-in-form";

export default function Page() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
