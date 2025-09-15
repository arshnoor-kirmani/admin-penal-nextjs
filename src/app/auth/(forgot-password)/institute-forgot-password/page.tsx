"use client";
import ChangePasswordForm from "@/components/custom/auth/changepassword";
import ForgotPasswordForm from "@/components/custom/auth/forgotPasswordForm";
import React from "react";
export default function forgetPage() {
  const [verifySuccess, setVerifySuccess] = React.useState(false);
  React.useEffect(() => {
    console.log("UsreEffect", verifySuccess);
  }, [verifySuccess]);
  return (
    <div>
      <ForgotPasswordForm
        forgetUserType="institute"
        setVerifySuccess={setVerifySuccess}
      />
      <ChangePasswordForm />
    </div>
  );
}
