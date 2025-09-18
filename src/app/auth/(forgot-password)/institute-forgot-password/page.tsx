"use client";
import ChangePasswordForm from "@/components/custom/auth/changepassword";
import ForgotPasswordForm from "@/components/custom/auth/forgotPasswordForm";
import React from "react";
export default function forgetPage() {
  
  return (
    <div>
      <ForgotPasswordForm
        forgetUserType="institutes"
      />
      
    </div>
  );
}
