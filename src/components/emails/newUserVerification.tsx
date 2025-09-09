import React from "react";

interface InstituteVerificationOtpEmailProps {
  instituteName: string;
  otp: string;
  userName?: string;
}

const InstituteVerificationOtpEmailTemplate: React.FC<
  InstituteVerificationOtpEmailProps
> = ({ instituteName = "Institute Management System", otp, userName }) => (
  <>
    <!DOCTYPE html>
    <html>
    <head>
  <meta charset="UTF-8">
  <title>{{instituteName}} Account Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f8f8f8; padding: 32px; margin: 0;">
  <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 32px;">
    <h2 style="color: #2B4C6F; margin-bottom: 16px;">
      {{instituteName}} Account Verification
    </h2>
    <p style="font-size: 16px; color: #333;">
      {{userName}}, 
    </p>
    <p style="font-size: 16px; color: #333; margin: 16px 0;">
      Thank you for registering with <b>{{instituteName}}</b>. To verify your email address, please use the One Time Password (OTP) below:
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 8px; background: #e3f3ff; color: #1d3557; padding: 16px 32px; border-radius: 8px;">
        {{otp}}
      </span>
    </div>
    <p style="font-size: 15px; color: #666; margin: 16px 0;">
      This OTP is valid for the next 10 minutes.<br>
      Please do not share it with anyone for your security.
    </p>
    <p style="font-size: 14px; color: #a0a0a0; margin-top: 32px;">
      If you did not request this, please ignore this email.<br>
      <b>{{instituteName}}</b> Team
    </p>
  </div>
</body>
        </html>
        </>
);

export default InstituteVerificationOtpEmailTemplate;
