import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Institute management" <${process.env.SMTP_EMAIL}>`,
    to: body.to,
    subject: body.subject,
    text: body.text,
    html: body.html,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully", info: res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error },
      { status: 500 }
    );
  }

  return new Response("Email sent");
}
