import React from "react";

interface InstituteVerificationOtpEmailProps {
  instituteName: string;
  otp: string;
  userName?: string;
}

const InstituteVerificationOtpEmailTemplate: React.FC<
  InstituteVerificationOtpEmailProps
> = ({
  instituteName = "Hope Group of Institute",
  otp = "82634",
  userName = "Arshooor",
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      background: "#f8f8f8",
      padding: "32px",
    }}
  >
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        padding: "32px",
      }}
    >
      <h2 style={{ color: "#2B4C6F", marginBottom: "16px" }}>
        {instituteName} Account Verification
      </h2>
      <p style={{ fontSize: "16px", color: "#333" }}>
        {userName ? `Hello ${userName},` : "Hello,"}
      </p>
      <p style={{ fontSize: "16px", color: "#333", margin: "16px 0" }}>
        Thank you for registering with <b>{instituteName}</b>. To verify your
        email address, please use the One Time Password (OTP) below:
      </p>
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "8px",
            background: "#e3f3ff",
            color: "#1d3557",
            padding: "16px 32px",
            borderRadius: "8px",
          }}
        >
          {otp}
        </span>
      </div>
      <p style={{ fontSize: "15px", color: "#666", margin: "16px 0" }}>
        This OTP is valid for the next 10 minutes.
        <br />
        Please do not share it with anyone for your security.
      </p>
      <p style={{ fontSize: "14px", color: "#a0a0a0", marginTop: "32px" }}>
        If you did not request this, please ignore this email.
        <br />
        <b>{instituteName}</b> Team
      </p>
    </div>
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f8f8f8",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "32px",
        }}
      >
        <h2 style={{ color: "#2B4C6F", marginBottom: "16px" }}>
          {"appName"} Email Verification
        </h2>
        <p style={{ fontSize: "16px", color: "#333" }}>Hello {userName},</p>
        <p style={{ fontSize: "16px", color: "#333", margin: "16px 0" }}>
          You are receiving this email because you requested to verify your
          email address for your {"appName"} account. Please use the One Time
          Password (OTP) below to complete your verification:
        </p>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "8px",
              background: "#e3f3ff",
              color: "#1d3557",
              padding: "16px 32px",
              borderRadius: "8px",
            }}
          >
            {otp}
          </span>
        </div>
        <p style={{ fontSize: "15px", color: "#666", margin: "16px 0" }}>
          This OTP is valid for the next 10 minutes.
          <br />
          Please do not share it with anyone for your security.
        </p>
        <p style={{ fontSize: "14px", color: "#a0a0a0", marginTop: "32px" }}>
          If you did not request this verification, please ignore this email.
          <br />
          <b>{"appName"}</b> Team
        </p>
      </div>
    </div>
  </div>
);

export default InstituteVerificationOtpEmailTemplate;
