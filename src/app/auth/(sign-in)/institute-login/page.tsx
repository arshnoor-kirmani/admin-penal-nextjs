"use client";
import SignInForm from "@/components/custom/auth/admin/sign-in-form";

export default function Page() {
  return (
    <div>
      <SignInForm SignInType="institute-login" />
    </div>
  );
}
