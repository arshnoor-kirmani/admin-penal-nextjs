// import InstituteVerificationOtpEmailTemplate from "@/components/emails/newUserVerification";
import axios from "axios";
export interface NewInstituteVerificationEmailParams {
  email: string;
}
const OTP_EXPIRY_MINUTES: number = 20,
  CURRENT_YEAR: number = 2025;

export async function SendNewInstituteVerificationEmail({
  email,
}: NewInstituteVerificationEmailParams) {
  console.log("Sending email to ", email);
  // ======================================
  const user = await axios.post("/api/auth/get-institute-info", {
    identifier: email,
  });
  console.log("Sedning Email", user);
  if (!user?.data?.user) {
    throw new Error("User not found");
  }
  const { institute_name, username, verifyCode: otp } = user.data.user;

  const Emailhtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${institute_name} Account Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f8f8f8; padding: 32px; margin: 0;">
  <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 32px;">
    <h2 style="color: #2B4C6F; margin-bottom: 16px;">
      ${institute_name} Account Verification
    </h2>
    <p style="font-size: 16px; color: #333;">
      Hello ${username},
    </p>
    <p style="font-size: 16px; color: #333; margin: 16px 0;">
      Thank you for registering with for <b>${institute_name}</b>. To verify your email address, please use the One Time Password (OTP) below:
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 8px; background: #e3f3ff; color: #1d3557; padding: 16px 32px; border-radius: 8px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 15px; color: #666; margin: 16px 0;">
      This OTP is valid for the next 10 minutes.<br>
      Please do not share it with anyone for your security.
    </p>
    <p style="font-size: 14px; color: #a0a0a0; margin-top: 32px;">
      If you did not request this, please ignore this email.<br>
      <b>${institute_name}</b> Team
    </p>
  </div>
</body>
                    </html>`;
  // ======================================
  const sendEmail = await axios.post("/api/send-email", {
    to: email,
    subject: "Verify your Institute Management System Account",
    text: `Welcome to ${institute_name}. Please verify your email.`,
    html: Emailhtml,
  });
  console.log(sendEmail);
  return sendEmail;
}

export async function forgetInstiutePassword({
  email,
}: NewInstituteVerificationEmailParams) {
  console.log("Sending email to ", email);
  // ======================================
  const user = await axios.post("/api/auth/get-institute-info", {
    identifier: email,
  });
  console.log("Sedning Email", user);
  if (!user?.data?.user) {
    throw new Error("User not found");
  }
  const {
    institute_name,
    username,
    forget_password_code: OTP_CODE,
    _id: userId,
  } = user.data.user;

  console.log(
    "Sending Email",
    {
      institute_name,
      username,
      forget_password_code: OTP_CODE,
      _id: userId,
    },
    user.data.user.reset_password_id
  );
  const Emailhtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset OTP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f8fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 480px;
      margin: 40px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      padding: 32px;
    }
    .header {
      text-align: center;
      color: #333;
    }
    .otp {
      font-size: 2em;
      letter-spacing: 8px;
      font-weight: bold;
      color: #2b6cb0;
      background: #f0f4f8;
      padding: 16px;
      border-radius: 6px;
      margin: 24px 0;
      text-align: center;
    }
    .content {
      color: #444;
      font-size: 1em;
      line-height: 1.6;
    }
    .footer {
      margin-top: 28px;
      font-size: 0.9em;
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="header">Password Reset Request</h2>
    <div class="content">
      <p>We received a request to reset your account password. Use the OTP below to proceed:</p>
      <div class="otp">${OTP_CODE}</div>
      <p>
        Please enter this OTP in the password reset page. <br>
        <strong>This OTP will expire in ${OTP_EXPIRY_MINUTES} minutes.</strong>
      </p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${CURRENT_YEAR} Your Company Name
    </div>
  </div>
</body>
                    </html>`;
  const sendEmail = await axios.post("/api/send-email", {
    to: email,
    subject: "Verify your Institute Management System Account",
    text: `Welcome to ${institute_name}. Please verify your email.`,
    html: Emailhtml,
  });
  return { sendEmail, userId };
}
