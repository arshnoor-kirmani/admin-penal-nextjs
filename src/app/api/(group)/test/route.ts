import nodemailer from "nodemailer";
export async function GET() {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  });

  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: `"Institute management" <${process.env.SMTP_EMAIL}>`, // sender address
      to: "try.arshnoorkirmani@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  })();

  return new Response("Hello, Next.js!");
}
