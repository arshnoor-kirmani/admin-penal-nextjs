"use client";
import ForgotPasswordForm from "@/components/custom/auth/forgotPasswordForm";
import React from "react";
export default function forgetPage() {
  return (
    <div>
      <ForgotPasswordForm forgetUserType="institutes" />
    </div>
  );
}
